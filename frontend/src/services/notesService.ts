import { apiService, Note, CreateNoteData, UpdateNoteData } from './api';

export class NotesService {
  // Get all notes for the authenticated user
  static async getNotes(): Promise<Note[]> {
    try {
      return await apiService.getNotes();
    } catch (error) {
      throw error;
    }
  }

  // Get a specific note by ID
  static async getNote(id: number): Promise<Note> {
    try {
      return await apiService.getNote(id);
    } catch (error) {
      throw error;
    }
  }

  // Create a new note
  static async createNote(data: CreateNoteData): Promise<Note> {
    try {
      return await apiService.createNote(data);
    } catch (error) {
      throw error;
    }
  }

  // Update an existing note
  static async updateNote(id: number, data: UpdateNoteData): Promise<Note> {
    try {
      return await apiService.updateNote(id, data);
    } catch (error) {
      throw error;
    }
  }

  // Delete a note
  static async deleteNote(id: number): Promise<void> {
    try {
      await apiService.deleteNote(id);
    } catch (error) {
      throw error;
    }
  }
}

export default NotesService;
