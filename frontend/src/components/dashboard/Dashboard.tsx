import React, { useState, useEffect } from 'react';
import { Note, CreateNoteData, UpdateNoteData } from '@/types/note';
import { useAuth } from '@/hooks/useAuth';
import { useNotes } from '@/hooks/useNotes';
import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';
import { NotesGrid } from '../notes/NotesGrid';
import { NoteEditor } from '../notes/NoteEditor';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { notes, loading, createNote, updateNote, deleteNote } = useNotes(user?.id || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  // Create sample notes for demo
  useEffect(() => {
    if (user && notes.length === 0) {
      const sampleNotes = [
        {
          title: 'Shopping list',
          content: 'Milk, eggs, bread, and butter',
          category: 'Personal',
          tags: ['shopping', 'groceries'],
        },
        {
          title: 'Workout schedule',
          content: 'Monday, Wednesday, Friday: gym',
          category: 'Health',
          tags: ['fitness', 'routine'],
        },
        {
          title: 'Recipe ideas',
          content: 'Pasta, tacos, and blueberry muffins',
          category: 'Personal',
          tags: ['cooking', 'recipes'],
        },
        {
          title: 'Meeting notes',
          content: 'Discuss project timeline and milestones',
          category: 'Work',
          tags: ['meeting', 'project'],
        },
      ];

      sampleNotes.forEach(noteData => {
        setTimeout(() => createNote(noteData), Math.random() * 1000);
      });
    }
  }, [user, notes.length, createNote]);

  const handleNewNote = () => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleSaveNote = async (data: CreateNoteData | UpdateNoteData) => {
    try {
      if (editingNote) {
        await updateNote(editingNote.id, data);
      } else {
        await createNote(data as CreateNoteData);
      }
      setShowEditor(false);
      setEditingNote(null);
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  const handleToggleFavorite = async (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      await updateNote(noteId, { isFavorite: !note.isFavorite });
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(noteId);
    }
  };

  const favoriteCount = notes.filter(note => note.isFavorite).length;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={logout} />
      
      <div className="flex">
        <Sidebar 
          onNewNote={handleNewNote}
          noteCount={notes.length}
          favoriteCount={favoriteCount}
        />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Notes</h2>
              <p className="text-gray-600">
                Organize your thoughts and never lose track of important ideas.
              </p>
            </div>

            <NotesGrid
              notes={notes}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onNoteClick={handleEditNote}
              onToggleFavorite={handleToggleFavorite}
              onDeleteNote={handleDeleteNote}
            />
          </div>
        </main>
      </div>

      {showEditor && (
        <NoteEditor
          note={editingNote || undefined}
          onSave={handleSaveNote}
          onClose={() => {
            setShowEditor(false);
            setEditingNote(null);
          }}
          loading={loading}
        />
      )}
    </div>
  );
};