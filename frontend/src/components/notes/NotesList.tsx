import { useState } from 'react';
import { useNotes, useDeleteNote } from '@/hooks/useNotes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface NotesListProps {
  onEditNote: (note: any) => void;
  onCreateNote: () => void;
}

export const NotesList = ({ onEditNote, onCreateNote }: NotesListProps) => {
  const { data: notes, isLoading, error } = useNotes();
  const deleteNoteMutation = useDeleteNote();

  const handleDeleteNote = async (id: number) => {
    try {
      await deleteNoteMutation.mutateAsync(id);
    } catch (error) {
      // Error is already handled by the mutation
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Failed to load notes: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Notes</h2>
        <Button onClick={onCreateNote} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Note
        </Button>
      </div>

      {notes && notes.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No notes yet. Create your first note!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes?.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditNote(note)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNote(note.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      disabled={deleteNoteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {note.body && (
                  <p className="text-muted-foreground line-clamp-3 mb-3">
                    {note.body}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="text-xs">
                    {format(new Date(note.created_at), 'MMM dd, yyyy')}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};


