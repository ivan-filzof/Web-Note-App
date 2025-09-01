// Export all services
export { apiService, default as ApiService } from './api';
export { AuthService } from './authService';
export { NotesService } from './notesService';

// Export types
export type {
  User,
  Note,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  CreateNoteData,
  UpdateNoteData,
} from './api';
