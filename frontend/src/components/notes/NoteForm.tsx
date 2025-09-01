import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateNote, useUpdateNote } from '@/hooks/useNotes';
import { Note } from '@/services';
import { X } from 'lucide-react';

const noteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().optional(),
});

type NoteFormData = z.infer<typeof noteSchema>;

interface NoteFormProps {
  note?: Note | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const NoteForm = ({ note, onClose, onSuccess }: NoteFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!note;
  
  const createNoteMutation = useCreateNote();
  const updateNoteMutation = useUpdateNote();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: note?.title || '',
      body: note?.body || '',
    },
  });

  useEffect(() => {
    if (note) {
      reset({
        title: note.title,
        body: note.body || '',
      });
    }
  }, [note, reset]);

  const onSubmit = async (data: NoteFormData) => {
    setIsLoading(true);
    try {
      if (isEditing && note) {
        await updateNoteMutation.mutateAsync({ id: note.id, data });
      } else {
        await createNoteMutation.mutateAsync(data);
      }
      onSuccess?.();
      onClose();
    } catch (error) {
      // Error is already handled by the mutation
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{isEditing ? 'Edit Note' : 'Create New Note'}</CardTitle>
              <CardDescription>
                {isEditing ? 'Update your note details' : 'Add a new note to your collection'}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter note title"
                {...register('title')}
                disabled={isLoading}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Content</Label>
              <Textarea
                id="body"
                placeholder="Enter note content (optional)"
                rows={8}
                {...register('body')}
                disabled={isLoading}
              />
              {errors.body && (
                <p className="text-sm text-red-500">{errors.body.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? isEditing
                    ? 'Updating...'
                    : 'Creating...'
                  : isEditing
                  ? 'Update Note'
                  : 'Create Note'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};


