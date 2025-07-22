import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data || [] }); // Ensure it's always an array
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
      set({ users: [] }); // Set empty array on error
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data || [] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  searchUser: async (searchTerm) => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get(`/search/user?searchTerm=${searchTerm}`);
      
      // Handle different possible response structures
      let users = [];
      if (res.data?.users) {
        // If backend returns { users: [...] }
        users = Array.isArray(res.data.users) ? res.data.users : [];
      } else if (Array.isArray(res.data)) {
        // If backend returns users array directly
        users = res.data;
      } else {
        console.warn('Unexpected response structure:', res.data);
        users = [];
      }
      
      set({ users });
    } catch (error) {
      toast.error(error.response?.data?.message || "Search failed");
      set({ users: [] }); // Set empty array on error
    } finally {
      set({ isUsersLoading: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));