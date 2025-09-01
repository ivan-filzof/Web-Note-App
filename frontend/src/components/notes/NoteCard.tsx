import React from 'react';
import { Note } from '@/types/note';
import { Calendar, Heart, Tag, MoreVertical } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  onToggleFavorite: () => void;
  onDelete: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ 
  note, 
  onClick, 
  onToggleFavorite, 
  onDelete 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const getPreview = (content: string) => {
    return content.length > 120 ? content.substring(0, 120) + '...' : content;
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 flex-1 mr-2">
          {note.title}
        </h3>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`p-1.5 rounded-lg hover:bg-gray-100 transition-colors ${
              note.isFavorite ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${note.isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {note.content && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {getPreview(note.content)}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(note.updatedAt)}</span>
          </div>
          {note.category && (
            <div className="flex items-center space-x-1">
              <Tag className="w-3 h-3" />
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                {note.category}
              </span>
            </div>
          )}
        </div>
        
        {note.tags.length > 0 && (
          <div className="flex items-center space-x-1">
            {note.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                {tag}
              </span>
            ))}
            {note.tags.length > 2 && (
              <span className="text-gray-400">+{note.tags.length - 2}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};