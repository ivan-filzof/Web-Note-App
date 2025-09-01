# Services Documentation

This folder contains all the API services for connecting the frontend with the Laravel backend.

## Structure

```
services/
├── api.ts          # Main API service with axios configuration
├── authService.ts  # Authentication service
├── notesService.ts # Notes CRUD operations
└── index.ts        # Export all services and types
```

## Usage

### Importing Services

```typescript
import { AuthService, NotesService, apiService } from '@/services';
import type { User, Note, LoginCredentials } from '@/services';
```

### Authentication

```typescript
// Login
const response = await AuthService.login({ email, password });
const { user, token } = response;

// Register
const response = await AuthService.register({ name, email, password });

// Logout
await AuthService.logout();

// Check authentication status
const isAuth = AuthService.isAuthenticated();

// Get current user
const user = await AuthService.getCurrentUser();
```

### Notes Operations

```typescript
// Get all notes
const notes = await NotesService.getNotes();

// Get single note
const note = await NotesService.getNote(id);

// Create note
const newNote = await NotesService.createNote({ title, body });

// Update note
const updatedNote = await NotesService.updateNote(id, { title, body });

// Delete note
await NotesService.deleteNote(id);
```

## Features

- **Axios-based**: Uses axios for HTTP requests with better error handling
- **Token Management**: Automatic token storage and retrieval from localStorage
- **Interceptors**: Request/response interceptors for authentication and error handling
- **TypeScript**: Full TypeScript support with proper type definitions
- **Error Handling**: Centralized error handling with meaningful error messages
- **CORS Ready**: Configured to work with Laravel Sanctum CORS settings

## Configuration

The API base URL is configured in `api.ts`:
```typescript
baseURL: 'http://localhost:8000/api'
```

Make sure your Laravel backend is running on port 8000 and has CORS properly configured.

## Error Handling

All services throw errors that can be caught and handled in your components:

```typescript
try {
  await AuthService.login(credentials);
} catch (error) {
  console.error('Login failed:', error.message);
}
```
