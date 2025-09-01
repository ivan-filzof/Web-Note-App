import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, CreateNoteData, UpdateNoteData } from '@/services';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export const useNotes = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['notes', user?.id],
    queryFn: () => apiService.getNotes(),
    enabled: !!apiService.getToken() && !!user?.id,
  });
};

export const useNote = (id: number) => {
  return useQuery({
    queryKey: ['notes', id],
    queryFn: () => apiService.getNote(id),
    enabled: !!id && !!apiService.getToken(),
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (data: CreateNoteData) => apiService.createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', user?.id] });
      toast.success('Note created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create note');
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateNoteData }) =>
      apiService.updateNote(id, data),
    onSuccess: (updatedNote) => {
      queryClient.invalidateQueries({ queryKey: ['notes', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['notes', updatedNote.id] });
      toast.success('Note updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update note');
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (id: number) => apiService.deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', user?.id] });
      toast.success('Note deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete note');
    },
  });
};