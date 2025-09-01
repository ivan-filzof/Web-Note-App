export interface Note {
  id: string;
  title: string;
  content: string;
  category?: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface CreateNoteData {
  title: string;
  content: string;
  category?: string;
  tags?: string[];
}

export interface UpdateNoteData extends Partial<CreateNoteData> {
  isFavorite?: boolean;
}