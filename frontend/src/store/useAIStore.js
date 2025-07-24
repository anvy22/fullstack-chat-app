import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAIStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isGeneratingNote: false,
  onlineUsers: [],
  socket: null,
  generatedNote: null,

  generateNoteFromChat: async (userId, limit = 100) => {
    set({ isGeneratingNote: true });
    toast.loading("Generating notes from chat...", { id: "generating-note" });
    
    try {
      const res = await axiosInstance.post(`/notes/generate-from-chat/${userId}`, {
        limit
      });

      set({ generatedNote: res.data.data });
      
      toast.success(res.data.message || "Note generated successfully from chat!", { id: "generating-note" });
      
      return res.data;
    } catch (error) {
      console.log("Error in generateNoteFromChat:", error);
      
      const errorMessage = error.response?.data?.message || "Failed to generate note from chat";
      toast.error(errorMessage, { id: "generating-note" });
      
      throw error;
    } finally {
      set({ isGeneratingNote: false });
    }
  },

  clearGeneratedNote: () => {
    set({ generatedNote: null });
  },
}));