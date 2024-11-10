import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { api } from '@/lib/axios';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/user');
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    const { access_token, user } = response.data;
    localStorage.setItem('token', access_token);
    setUser(user);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const response = await api.post('/register', { name, email, password });
    const { access_token, user } = response.data;
    localStorage.setItem('token', access_token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}