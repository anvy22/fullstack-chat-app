import { useEffect, useState } from "react";
import { Search, Plus, Edit, Trash2, Tag, Folder, X } from "lucide-react";
import { useNoteStore } from "../store/useNoteStore";
import ReactMarkdown from "react-markdown";
// If using toast for error messages
import { toast } from "react-hot-toast";

const NotePage = () => {
  const {
    notes,
    selectedNote,
    isNotesLoading,
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    setSelectedNote,
  } = useNoteStore();

  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });
  const [filters, setFilters] = useState({ search: "", category: "", tag: "" });

  // Modal-related state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState("");

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const categories = [
    ...new Set(notes.map((note) => note.category).filter(Boolean)),
  ];
  const allTags = [...new Set(notes.flatMap((note) => note.tags || []))];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      note.content.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory =
      !filters.category || note.category === filters.category;
    const matchesTag =
      !filters.tag || (note.tags && note.tags.includes(filters.tag));
    return matchesSearch && matchesCategory && matchesTag;
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteData = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    try {
      if (isEditing && selectedNote) {
        await updateNote(selectedNote._id, noteData);
        setSelectedNote({ ...selectedNote, ...noteData });
      } else {
        await createNote(noteData);
      }
      setForm({ title: "", content: "", category: "", tags: "" });
      setIsEditing(false);
      setShowForm(false);
    } catch (err) {}
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setIsEditing(true);
    setShowForm(true);
    setForm({
      title: note.title,
      content: note.content,
      category: note.category || "",
      tags: note.tags?.join(", ") || "",
    });
  };

  const promptDelete = (note) => {
    setNoteToDelete(note);
    setDeleteConfirmName("");
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteConfirmName === noteToDelete?.title) {
      deleteNote(noteToDelete._id);
      if (selectedNote?._id === noteToDelete._id) setSelectedNote(null);
      closeModal();
    } else {
      toast.error("Note title doesn't match!");
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setNoteToDelete(null);
    setDeleteConfirmName("");
  };

  const handleNewNote = () => {
    setForm({ title: "", content: "", category: "", tags: "" });
    setIsEditing(false);
    setShowForm(true);
    setSelectedNote(null);
  };

  const cancelForm = () => {
    setForm({ title: "", content: "", category: "", tags: "" });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-base-100 pt-16 overflow-hidden">
      {/* Sidebar */}
      <div className="md:w-80 w-full md:h-auto h-[50vh] overflow-y-auto bg-base-200 border-b md:border-b-0 md:border-r border-base-300 flex-shrink-0">
        <div className="p-4 border-b border-base-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Notes</h2>
            <button onClick={handleNewNote} className="btn btn-primary btn-sm">
              <Plus size={16} /> <span className="hidden sm:inline">New</span>
            </button>
          </div>

          <div className="relative mb-3">
            <Search
              size={16}
              className="absolute left-3 top-3 text-base-content/50"
            />
            <input
              type="text"
              placeholder="Search notes..."
              className="input input-bordered w-full pl-10 input-sm"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <select
              className="select select-bordered select-sm flex-1"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered select-sm flex-1 w-fit"
              value={filters.tag}
              onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
            >
              <option value="">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  #{tag}
                </option>
              ))}
            </select>
          </div>

          {(filters.category || filters.tag) && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {filters.category && (
                <div className="badge badge-info gap-1">
                  <Folder size={12} />
                  {filters.category}
                  <button
                    onClick={() => setFilters({ ...filters, category: "" })}
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
              {filters.tag && (
                <div className="badge badge-secondary gap-1">
                  <Tag size={12} />
                  {filters.tag}
                  <button onClick={() => setFilters({ ...filters, tag: "" })}>
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {isNotesLoading ? (
            <div className="p-4 text-center">
              <div className="loading loading-spinner loading-md" />
              <p className="mt-2 text-base-content/60">Loading notes...</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="p-4 text-center text-base-content/60">
              {filters.search || filters.category || filters.tag
                ? "No notes match your filters"
                : "No notes yet. Create your first note!"}
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note._id}
                className={`p-3 border-b border-base-300 cursor-pointer hover:bg-base-300/50 transition-colors  ${
                  selectedNote?._id === note._id
                    ? "bg-primary/10 border-l-4 border-l-primary"
                    : ""
                }`}
                onClick={() => setSelectedNote(note)}
              >
                <h3 className="font-semibold text-sm mb-1 break-words">
                  {note.title}
                </h3>
                <p className="text-xs text-base-content/70 mb-2 line-clamp-2">
                  {note.content.substring(0, 80)}...
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="badge badge-outline badge-xs">
                    {note.category || "Uncategorized"}
                  </span>
                  <span className="text-base-content/50">
                    {note.createdAt
                      ? new Date(note.createdAt).toLocaleDateString()
                      : "No date"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-base-100">
        {showForm ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">
                {isEditing ? "Edit Note" : "Create New Note"}
              </h3>
              <button onClick={cancelForm} className="btn btn-ghost btn-sm">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 max-w-2xl">
              <input
                type="text"
                name="title"
                className="input input-bordered w-full"
                placeholder="Note title..."
                value={form.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="content"
                className="textarea textarea-bordered w-full h-64"
                placeholder="Write your note here..."
                value={form.content}
                onChange={handleChange}
                required
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="category"
                  className="input input-bordered flex-1"
                  placeholder="Category"
                  value={form.category}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="tags"
                  className="input input-bordered flex-1"
                  placeholder="Tags (comma separated)"
                  value={form.tags}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2">
                <button onClick={handleSubmit} className="btn btn-primary">
                  {isEditing ? "Update Note" : "Create Note"}
                </button>
                <button onClick={cancelForm} className="btn btn-ghost">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : selectedNote ? (
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="max-w-3xl">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    {selectedNote.title}
                  </h1>
                  <div className="flex items-center gap-3 text-sm text-base-content/70">
                    <span className="badge badge-info">
                      {selectedNote.category || "Uncategorized"}
                    </span>
                    <span>•</span>
                    <span>
                      {selectedNote.createdAt
                        ? new Date(selectedNote.createdAt).toLocaleDateString()
                        : "No date"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(selectedNote)}
                    className="btn btn-outline btn-info btn-sm"
                  >
                    <Edit size={16} />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => promptDelete(selectedNote)}
                    className="btn btn-outline btn-error btn-sm"
                  >
                    <Trash2 size={16} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>

              <div className="prose max-w-none mb-6">
                <div className="bg-base-200 p-6 rounded-lg">
                  <ReactMarkdown>{selectedNote.content}</ReactMarkdown>
                </div>
              </div>

              {selectedNote.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedNote.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="badge badge-outline cursor-pointer hover:badge-secondary"
                      onClick={() => setFilters({ ...filters, tag })}
                    >
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center text-gray-500">
              <h3 className="text-xl font-semibold mb-2">
                Select a note to view
              </h3>
              <p>Choose a note from the sidebar or create a new one</p>
            </div>
          </div>
        )}

        {/* Modal for delete confirmation */}
        {showDeleteModal && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirm Deletion</h3>
              <p className="py-2 text-sm">
                Type{" "}
                <span className="font-semibold text-red-500">
                  {noteToDelete?.title}
                </span>{" "}
                to confirm deletion.
              </p>

              <input
                type="text"
                value={deleteConfirmName}
                onChange={(e) => setDeleteConfirmName(e.target.value)}
                placeholder="Type note title"
                className="input input-bordered w-full mb-4"
              />

              <div className="modal-action">
                <form method="dialog" className="flex gap-2">
                  <button type="button" className="btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-error text-white"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default NotePage;
