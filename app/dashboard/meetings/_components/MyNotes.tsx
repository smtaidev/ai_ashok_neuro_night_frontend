import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import EmptyImage from "@/public/image/empty.svg"

// Define the type for a single note.
interface Note {
  id: string;
  content: string;
}

const MyNotes: React.FC = () => {
  // Load notes from localStorage or start with an empty array
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('myNotes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Content of the new note input area
  const [newNoteContent, setNewNoteContent] = useState<string>('');

  // Track if user is adding a new note (show textarea or just button)
  const [isAdding, setIsAdding] = useState(false);

  // Currently editing note id and content
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteContent, setEditingNoteContent] = useState<string>('');

  // Save notes to localStorage on changes
  useEffect(() => {
    localStorage.setItem('myNotes', JSON.stringify(notes));
  }, [notes]);

  // Add a new note
  const handleAddNote = () => {
    if (newNoteContent.trim() !== '') {
      const newNote: Note = {
        id: Date.now().toString(),
        content: newNoteContent,
      };
      setNotes([newNote, ...notes]);
      setNewNoteContent('');
      setIsAdding(false); // Hide textarea after adding
    }
  };

  // Save edited note
  const handleSaveEdit = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, content: editingNoteContent } : note
      )
    );
    setEditingNoteId(null);
    setEditingNoteContent('');
  };

  // Delete a note
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Start editing a note
  const handleEditNote = (note: Note) => {
    setEditingNoteId(note.id);
    setEditingNoteContent(note.content);
  };

  return (
    <div className="">
      <div className="bg-white rounded-lg flex flex-col justify-between h-full border">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">My Notes</h2>
        </div>

        {/* Conditional rendering for notes */}
        <div className="p-6 space-y-4">
          {notes.length === 0 ? (
            <div className='flex flex-col items-center justify-center '>
                <Image src={EmptyImage} width={80} height={80} alt='Empty Image'/>
            <p className="text-gray-500 text-center py-8">
              You don&#39;t have any notes yet. Click &quot;Add New Note&quot; to get started!
            </p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="p-4 border rounded-lg">
                {editingNoteId === note.id ? (
                  <textarea
                    value={editingNoteContent}
                    onChange={(e) => setEditingNoteContent(e.target.value)}
                    className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 transition-colors duration-200"
                  />
                ) : (
                  <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                )}

                <div className="flex justify-end gap-2 mt-4">
                  {editingNoteId === note.id ? (
                    <button
                      onClick={() => handleSaveEdit(note.id)}
                      className="px-4 py-2 text-sm cursor-pointer text-blue-900 font-bold bg-white outline-blue-900 outline rounded-lg hover:bg-blue-900 hover:outline-none hover:text-white"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditNote(note)}
                        className="p-2 cursor-pointer bg-sky-100 rounded-lg hover:bg-sky-200 transition-colors duration-200 text-gray-700 flex items-center justify-center"
                        aria-label="Edit note"
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="px-4 cursor-pointer py-2 text-sm font-medium text-black bg-white outline-black outline rounded-lg hover:bg-black hover:outline-none hover:text-white"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add new note section */}
        <div className="p-6 border-t  border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add a New Note</h3>

          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-950 cursor-pointer transition-colors duration-200 shadow-md"
            >
              Add New Note
            </button>
          ) : (
            <>
              <textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Type your new note here..."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 resize-none"
              />
              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={handleAddNote}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-950 cursor-pointer transition-colors duration-200 shadow-md"
                >
                  Save Note
                </button>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setNewNoteContent('');
                  }}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyNotes;
