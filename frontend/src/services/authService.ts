import { apiService, LoginCredentials, RegisterData, AuthResponse, User } from './api';

export class AuthService {
  // Login user
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.login(credentials);
      apiService.setToken(response.token);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Register user
  static async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiService.register(data);
      apiService.setToken(response.token);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      await apiService.logout();
    } catch (error) {
      // Even if logout fails on server, clear local token
      apiService.clearToken();
      throw error;
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<User | null> {
    try {
      const token = apiService.getToken();
      if (!token) {
        return null;
      }
      return await apiService.getUser();
    } catch (error) {
      apiService.clearToken();
      return null;
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!apiService.getToken();
  }

  // Get stored token
  static getToken(): string | null {
    return apiService.getToken();
  }

  // Clear stored token
  static clearToken(): void {
    apiService.clearToken();
  }
}

export default AuthService;
