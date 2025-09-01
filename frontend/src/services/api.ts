import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: number;
  title: string;
  body: string | null;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface CreateNoteData {
  title: string;
  body?: string;
}

export interface UpdateNoteData {
  title: string;
  body?: string;
}

// API Service Class
class ApiService {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://127.0.0.1:8000/api',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          this.clearToken();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    // Initialize token from localStorage
    this.token = localStorage.getItem('auth_token');
  }

  // Token management
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Auth methods
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>('/register', data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>('/login', credentials);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async logout(): Promise<{ message: string }> {
    try {
      const response = await this.api.post<{ message: string }>('/logout');
      this.clearToken();
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getUser(): Promise<User> {
    try {
      const response = await this.api.get<User>('/user');
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Notes methods
  async getNotes(): Promise<Note[]> {
    try {
      const response = await this.api.get<Note[]>('/notes');
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getNote(id: number): Promise<Note> {
    try {
      const response = await this.api.get<Note>(`/notes/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async createNote(data: CreateNoteData): Promise<Note> {
    try {
      const response = await this.api.post<Note>('/notes', data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async updateNote(id: number, data: UpdateNoteData): Promise<Note> {
    try {
      const response = await this.api.put<Note>(`/notes/${id}`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async deleteNote(id: number): Promise<void> {
    try {
      await this.api.delete(`/notes/${id}`);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Error handling
  private handleError(error: any): void {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      // Network error (server not reachable)
      if (axiosError.code === 'ERR_NETWORK') {
        throw new Error('Unable to connect to server. Please check if the backend is running on http://127.0.0.1:8000');
      }
      
      // Server error response
      if (axiosError.response?.data && typeof axiosError.response.data === 'object') {
        const errorData = axiosError.response.data as any;
        if (errorData.message) {
          throw new Error(errorData.message);
        }
      }
      
      // HTTP status error
      if (axiosError.response?.status) {
        switch (axiosError.response.status) {
          case 401:
            throw new Error('Unauthorized - Invalid credentials');
          case 422:
            throw new Error('Validation error - Please check your input');
          case 500:
            throw new Error('Server error - Please try again later');
          default:
            throw new Error(`HTTP ${axiosError.response.status}: ${axiosError.message}`);
        }
      }
      
      throw new Error(axiosError.message || 'An error occurred');
    }
    throw error;
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
