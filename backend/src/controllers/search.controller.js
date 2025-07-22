import User from "../models/user.model.js";

export const searchUser = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    
    if (!searchTerm) {
      return res.status(400).json({ message: "Please enter a search term" });
    }

    // Create a case-insensitive search query for fullName and email
    const users = await User.find({
      $or: [
        { fullName: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } }
      ]
    }).select("-password"); // Exclude password from results

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      success: true,
      count: users.length,
      users: users
    });

  } catch (error) {
    console.error("Error in searchUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};