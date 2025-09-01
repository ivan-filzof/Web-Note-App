import { useState, useEffect } from 'react';
import { User, AuthState } from '@/types/note';

const STORAGE_KEY = 'notes_auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAuthState({
          ...parsed,
          isAuthenticated: !!parsed.token,
        });
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const user: User = {
            id: Date.now().toString(),
            email,
            name: email.split('@')[0],
            createdAt: new Date().toISOString(),
          };
          const token = `token_${Date.now()}`;
          
          const newAuthState = { user, token, isAuthenticated: true };
          setAuthState(newAuthState);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newAuthState));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const register = (name: string, email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (name && email && password.length >= 6) {
          const user: User = {
            id: Date.now().toString(),
            email,
            name,
            createdAt: new Date().toISOString(),
          };
          const token = `token_${Date.now()}`;
          
          const newAuthState = { user, token, isAuthenticated: true };
          setAuthState(newAuthState);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newAuthState));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setAuthState({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    ...authState,
    login,
    register,
    logout,
  };
};