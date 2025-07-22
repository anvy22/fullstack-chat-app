import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useNoteStore = create((set, get) => ({
  notes: [],
  selectedNote: null,
  isNotesLoading: false,

  getNotes: async () => {
  set({ isNotesLoading: true });
  try {
    const res = await axiosInstance.get('/notes/getNotes');
    console.log("Gotten data:", res.data);

    const notes = Array.isArray(res.data?.data) ? res.data.data : [];
    set({ notes });
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to fetch notes');
    set({ notes: [] });
  } finally {
    set({ isNotesLoading: false });
  }
},

  getNote: async (id) => {
    try {
      const res = await axiosInstance.get(`/getNote/${id}`);
      set({ selectedNote: res.data });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch note');
    }
  },

createNote: async (note) => {
  try {
    const res = await axiosInstance.post('/notes/createNote', note);
    const newNote = res.data.data; 
    set({ notes: [...get().notes, newNote] });
    toast.success(res.data.message || 'Note created successfully');
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to create note');
  }
},

updateNote: async (id, noteData) => {
  try {
    const res = await axiosInstance.put(`/notes/updateNote/${id}`, noteData);
    const updatedNote = res.data.data; // extract updated note
    set({
      notes: get().notes.map((note) =>
        note._id === id ? updatedNote : note
      ),
    });
    toast.success(res.data.message || 'Note updated successfully');
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to update note');
  }
},

  deleteNote: async (id) => {
    try {
      await axiosInstance.delete(`/notes/delete/${id}`);
      set({ notes: get().notes.filter((note) => note._id !== id) });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete note');
    }
  },

  setSelectedNote: (note) => set({ selectedNote: note }),
}));
