import Note from '../models/note.model.js'
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';
import User from '../models/user.model.js';
import Message from '../models/message.model.js';





// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "models/gemini-1.5-flash-latest", 
});

// Gemini token limits (approximate)
const GEMINI_MAX_TOKENS = 30000;
const AVERAGE_TOKENS_PER_CHAR = 0.25;


/**
 * Utility function to truncate messages to fit within token limits
 */
const truncateMessagesForGemini = (messages) => {
  const maxChars = Math.floor(GEMINI_MAX_TOKENS / AVERAGE_TOKENS_PER_CHAR);
  let totalChars = 0;
  const truncatedMessages = [];
  
  // Start from the most recent messages and work backwards
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    const messageLength = (message.text || '').length;
    
    if (totalChars + messageLength <= maxChars) {
      truncatedMessages.unshift(message);
      totalChars += messageLength;
    } else {
      // If we can fit part of this message, truncate it
      const remainingChars = maxChars - totalChars;
      if (remainingChars > 100) {
        const truncatedContent = (message.text || '').substring(0, remainingChars - 3) + '...';
        truncatedMessages.unshift({
          ...message,
          text: truncatedContent
        });
      }
      break;
    }
  }
  
  return truncatedMessages;
};

/**
 * Generate AI notes from messages using Gemini
 */
const generateNotesFromMessages = async (messages, currentUser, otherUser) => {
  try {
    if (!messages || messages.length === 0) {
      throw new Error('No messages found to generate notes from');
    }

    // Truncate messages to fit within token limits
    const truncatedMessages = truncateMessagesForGemini(messages);
    
    // Format messages for AI processing
    const chatContext = truncatedMessages
      .map(msg => {
        const senderName = msg.senderId._id.toString() === currentUser._id.toString() 
          ? currentUser.fullName 
          : otherUser.fullName;
        return `${senderName}: ${msg.text || '[Image]'}`;
      })
      .join('\n');

    const prompt = `
Please analyze the following conversation between ${currentUser.fullName} and ${otherUser.fullName} and create comprehensive, well-structured notes. 
Extract key points, important information, decisions made, action items, and any other relevant details.
Format the response as a JSON object with the following structure:
{
  "title": "Descriptive title for the notes",
  "content": "Detailed notes content in markdown format",
  "category": "suggested category (e.g., meeting, project, discussion, etc.)",
  "tags": ["array", "of", "relevant", "tags"]
}

Conversation:
${chatContext}

Please ensure the notes are:
1. Comprehensive yet concise
2. Well-organized with clear sections
3. Include key decisions and action items
4. Highlight important information
5. Use proper markdown formatting for readability
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse JSON response
    let aiResponse;
    try {
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      aiResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      aiResponse = {
        title: `Conversation Notes - ${otherUser.fullName}`,
        content: text,
        category: 'conversation',
        tags: ['ai-generated', 'conversation']
      };
    }

    return aiResponse;
  } catch (error) {
    console.error('Error generating notes with Gemini:', error);
    throw new Error('Failed to generate AI notes');
  }
};




export const setNotes = async(req,res) =>{
    try {
    const { title, content, category, tags, isShared, sharedWith } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const noteData = {
      title,
      content,
      user: req.user.id,
      category: category || 'general',
      tags: tags || [],
      isShared: isShared || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (sharedWith && Array.isArray(sharedWith)) {
      noteData.sharedWith = sharedWith;
    }

    const note = new Note(noteData);
    await note.save();

    await note.populate([
      { path: 'user', select: 'fullName email' },
      { path: 'sharedWith', select: 'fullName email' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating note'
    });

  }
}


export const getNote = async (req, res) => {

  try {
    const note = await Note.findById(req.params.id)
      .populate([
        { path: 'user', select: 'fullName email' },
        { path: 'sharedWith', select: 'fullName email' }
      ]);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check if user has access to this note
    const hasAccess = note.user._id.toString() === req.user.id || 
                     note.sharedWith.some(user => user._id.toString() === req.user.id);

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    console.error('Error getting note:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while getting note'
    });
   }
};






export const getNotes = async (req, res) => {
  try {
    const {
      category,
      tags,
      search,
      limit = 20,
      page = 1,
      sortBy = 'updatedAt',
      sortOrder = 'desc',
    } = req.query;

    const userId = new mongoose.Types.ObjectId(req.user.id);

    // Base query: either owner or shared with user
    let baseOrQuery = [
      { user: userId },
      { sharedWith: userId }
    ];

    const query = { $or: baseOrQuery };

    // Add category filter
    if (category) query.category = category;

    // Add tags filter
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }

    // Add search filter
    if (search) {
      query.$and = [
        { $or: baseOrQuery }, // Re-apply $or inside $and
        {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } }
          ]
        }
      ];
      delete query.$or; // Remove top-level $or if using $and
    }

    // Sorting
    const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch notes
    const notes = await Note.find(query)
      .populate([
        { path: 'user', select: 'fullName email' },
        { path: 'sharedWith', select: 'fullName email' }
      ])
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Count total
    const total = await Note.countDocuments(query);

    // Return response
    res.json({
      success: true,
      data: notes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error listing notes:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while listing notes'
    });
  }
};


export const updateNote = async (req, res) => {
     try {
    const { title, content, category, tags, isShared, sharedWith } = req.body;

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only update your own notes.'
      });
    }

    // Update fields
    const updateData = {
      updatedAt: new Date()
    };

    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (category !== undefined) updateData.category = category;
    if (tags !== undefined) updateData.tags = tags;
    if (isShared !== undefined) updateData.isShared = isShared;
    if (sharedWith !== undefined) updateData.sharedWith = sharedWith;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate([
      { path: 'user', select: 'fullName email' },
      { path: 'sharedWith', select: 'fullName email' }
    ]);

    res.json({
      success: true,
      message: 'Note updated successfully',
      data: updatedNote
    });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating note'
    });
  }
}


export const deleteNote = async (req, res) => {
      
try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only delete your own notes.'
      });
    }


    await Note.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting note'
    });
  }

}

export const generateNoteFromChat = async (req, res) => {
        
 try {
    const { userId } = req.params;
    const { limit = 100 } = req.body;

    // Verify the other user exists
    const otherUser = await User.findById(userId).select('fullName email');
    if (!otherUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const currentUser = await User.findById(req.user.id).select('fullName email');

    // Get messages between current user and target user where current user is either sender or receiver
    const messageQuery = {
      $or: [
        { senderId: req.user.id, receiverId: userId },
        { senderId: userId, receiverId: req.user.id }
      ]
    };

    // Fetch messages
    const messages = await Message.find(messageQuery)
      .populate('senderId', 'fullName email')
      .populate('receiverId', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .lean();

    if (messages.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No messages found in chat with this user'
      });
    }

    // Generate AI notes using Gemini
    const aiResponse = await generateNotesFromMessages(messages, currentUser, otherUser);

    // Create the note
    const noteData = {
      title: aiResponse.title,
      content: aiResponse.content,
      user: req.user.id,
      category: aiResponse.category || 'chat-notes',
      tags: [...(aiResponse.tags || []), 'ai-generated', 'chat-notes'],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const note = new Note(noteData);
    await note.save();

    // Populate references
    await note.populate([
      { path: 'user', select: 'fullName email' }
    ]);

    res.status(201).json({
      success: true,
      message: `AI notes generated successfully from chat with ${otherUser.fullName}`,
      data: note,
      metadata: {
        messagesProcessed: messages.length,
        chatWith: {
          id: otherUser._id,
          name: otherUser.fullName,
          email: otherUser.email
        }
      }
    });

  } catch (error) {
    console.error('Error generating notes from chat:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while generating notes from chat',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }

}