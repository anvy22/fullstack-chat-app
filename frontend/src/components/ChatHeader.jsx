import { X, Sparkles } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useAIStore } from "../store/useAIStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { generateNoteFromChat, isGeneratingNote } = useAIStore();
  
  const handleSubmit = async (userId) => {
    try {
      await generateNoteFromChat(userId);
    } catch (error) {
      console.error("Failed to generate note:", error);
    }
  };

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-7 pr-3">
          <button 
            onClick={() => handleSubmit(selectedUser._id)}
            disabled={isGeneratingNote}
            className={`p-1 rounded hover:bg-base-200 transition-colors ${
              isGeneratingNote ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            title="Generate AI notes from chat"
          >
            <Sparkles 
              className={`w-5 h-5 ${isGeneratingNote ? 'animate-pulse text-primary' : 'text-base-content/70 hover:text-primary'}`} 
            />
          </button>
          
          <button 
            onClick={() => setSelectedUser(null)}
            className="p-1 rounded hover:bg-base-200 transition-colors"
            title="Close chat"
          >
            <X className="w-5 h-5 text-base-content/70 hover:text-error" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;