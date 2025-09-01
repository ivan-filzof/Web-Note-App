import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { NotesList } from './notes/NotesList';
import { NoteForm } from './notes/NoteForm';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { Note } from '@/services';

const AppLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleCreateNote = () => {
    setEditingNote(null);
    setShowNoteForm(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowNoteForm(true);
  };

  const handleCloseNoteForm = () => {
    setShowNoteForm(false);
    setEditingNote(null);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Journal App</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{user?.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NotesList
          onEditNote={handleEditNote}
          onCreateNote={handleCreateNote}
        />
      </main>

      {/* Note Form Modal */}
      {showNoteForm && (
        <NoteForm
          note={editingNote}
          onClose={handleCloseNoteForm}
        />
      )}
    </div>
  );
};

export default AppLayout;