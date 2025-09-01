import React from 'react';
import { Note } from '@/types/note';
import { NoteCard } from './NoteCard';
import { FileText, Search } from 'lucide-react';

interface NotesGridProps {
  notes: Note[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onNoteClick: (note: Note) => void;
  onToggleFavorite: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
}

export const NotesGrid: React.FC<NotesGridProps> = ({
  notes,
  searchTerm,
  onSearchChange,
  onNoteClick,
  onToggleFavorite,
  onDeleteNote
}) => {
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <FileText className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes yet</h3>
        <p className="text-gray-600 max-w-md">
          Start capturing your thoughts and ideas. Click "New Note" to create your first note.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search notes..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      </div>

      {/* Results Info */}
      {searchTerm && (
        <div className="text-sm text-gray-600">
          {filteredNotes.length === 0 ? (
            <span>No notes found for "{searchTerm}"</span>
          ) : (
            <span>
              {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''} found
              {searchTerm && ` for "${searchTerm}"`}
            </span>
          )}
        </div>
      )}

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => onNoteClick(note)}
              onToggleFavorite={() => onToggleFavorite(note.id)}
              onDelete={() => onDeleteNote(note.id)}
            />
          ))}
        </div>
      ) : searchTerm ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600 max-w-md">
            Try adjusting your search terms or browse all notes.
          </p>
        </div>
      ) : null}
    </div>
  );
};