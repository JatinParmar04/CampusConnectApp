import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  User,
  AuthState,
  AuthContextType,
  LoginFormValues,
  RegisterFormValues,
} from '../types/auth.types';
import apiClient from '../services/api';

const TOKEN_KEY = 'campusconnect_token';
const USER_KEY = 'campusconnect_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedUserJson = localStorage.getItem(USER_KEY);
    let parsedUser: User | null = null;

    if (savedUserJson) {
      try {
        parsedUser = JSON.parse(savedUserJson) as User;
      } catch {
        parsedUser = null;
      }
    }

    return {
      user: parsedUser,
      token: savedToken,
      isAuthenticated: Boolean(savedToken && parsedUser),
      isLoading: false,
      error: null,
    };
  });

  // Verify token on mount if exists
  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return;

      try {
        const response = await apiClient.get<{ success: boolean; data: User }>('/auth/me');
        if (response.data.success && response.data.data) {
          const freshUser = response.data.data;
          localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
          setState((prev) => ({
            ...prev,
            user: freshUser,
            isAuthenticated: true,
          }));
        }
      } catch (err: unknown) {
        console.warn('Session verification note: using local session cache or API offline', err);
      }
    };

    void verifySession();
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const login = async (credentials: LoginFormValues): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: { user: User; token: string };
      }>('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });

      const { user, token } = response.data.data;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (err: unknown) {
      // In case MongoDB backend is offline, provide smooth graceful mock login fallback for development demo
      const message = err instanceof Error ? err.message : 'Invalid credentials';
      
      // If server is unavailable, fallback demo login
      if (message.includes('Network Error') || message.includes('connect')) {
        console.warn('Backend unavailable, hydrating demo student session');
        const demoUser: User = {
          id: 'demo-std-001',
          name: credentials.email.split('@')[0] ?? 'Demo Student',
          email: credentials.email,
          role: 'student',
          department: 'Computer Science & Engineering',
          year: '3rd Year',
          avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(credentials.email)}&backgroundColor=e5e7eb,c7d2fe`,
          bio: 'Campus innovator passionate about engineering, AI, and design systems.',
          interests: ['Web Development', 'Robotics', 'Design Systems'],
          createdAt: new Date().toISOString(),
        };
        const demoToken = 'mock_jwt_token_demo_session_2026';
        localStorage.setItem(TOKEN_KEY, demoToken);
        localStorage.setItem(USER_KEY, JSON.stringify(demoUser));

        setState({
          user: demoUser,
          token: demoToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: message,
      }));
      return false;
    }
  };

  const register = async (payload: RegisterFormValues): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: { user: User; token: string };
      }>('/auth/register', payload);

      const { user, token } = response.data.data;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';

      // Fallback demo registration if backend server offline
      if (message.includes('Network Error') || message.includes('connect')) {
        console.warn('Backend unavailable, hydrating demo registration');
        const demoUser: User = {
          id: `demo-reg-${Date.now()}`,
          name: payload.name,
          email: payload.email,
          role: payload.role || 'student',
          department: payload.department || 'Computer Science & Engineering',
          year: payload.year || '3rd Year',
          avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(payload.name)}&backgroundColor=e5e7eb,c7d2fe`,
          bio: 'Student passionate about exploring campus opportunities.',
          interests: ['Campus Connect', 'Tech'],
          createdAt: new Date().toISOString(),
        };
        const demoToken = `mock_jwt_${Date.now()}`;
        localStorage.setItem(TOKEN_KEY, demoToken);
        localStorage.setItem(USER_KEY, JSON.stringify(demoUser));

        setState({
          user: demoUser,
          token: demoToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: message,
      }));
      return false;
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const updateUserContext = useCallback((updatedFields: Partial<User>) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const updatedUser: User = { ...prev.user, ...updatedFields };
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      return { ...prev, user: updatedUser };
    });
  }, []);

  const value: AuthContextType = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    register,
    logout,
    clearError,
    updateUserContext,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
