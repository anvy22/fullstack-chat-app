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
  unreadCounts: {}, // stores unread counts per userId
  isSubscribed: false, // Track subscription status

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data || [] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
      set({ users: [] });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data || [] });

      // Reset unread count when messages are fetched
      const unreadCounts = { ...get().unreadCounts };
      delete unreadCounts[userId];
      set({ unreadCounts });
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
      let users = [];

      if (res.data?.users) {
        users = Array.isArray(res.data.users) ? res.data.users : [];
      } else if (Array.isArray(res.data)) {
        users = res.data;
      } else {
        console.warn('Unexpected response structure:', res.data);
        users = [];
      }

      set({ users });
    } catch (error) {
      toast.error(error.response?.data?.message || "Search failed");
      set({ users: [] });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  subscribeToMessages: () => {
    const { isSubscribed } = get();
    
    // Prevent multiple subscriptions
    if (isSubscribed) return;
    
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const { selectedUser, messages, unreadCounts, users } = get();

      // If user is currently chatting, append message directly
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        set({ messages: [...messages, newMessage] });
      } else {
        // Increment unread count for users not currently selected
        const current = unreadCounts[newMessage.senderId] || 0;
        set({
          unreadCounts: {
            ...unreadCounts,
            [newMessage.senderId]: current + 1,
          },
        });

        // Move user with new message to top of the list
        const updatedUsers = [...users];
        const userIndex = updatedUsers.findIndex(user => user._id === newMessage.senderId);
        
        if (userIndex > 0) { // Only move if user exists and is not already first
          const userToMove = updatedUsers.splice(userIndex, 1)[0];
          updatedUsers.unshift(userToMove);
          set({ users: updatedUsers });
        }
      }
    });

    set({ isSubscribed: true });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
    set({ isSubscribed: false });
  },

  setSelectedUser: (selectedUser) => {
    const unreadCounts = { ...get().unreadCounts };

    if (selectedUser?._id) {
      delete unreadCounts[selectedUser._id];
    }

    set({ selectedUser, unreadCounts });
  },
}));