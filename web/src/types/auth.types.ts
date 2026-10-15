export type UserRole = 'student' | 'mentor' | 'organizer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  year?: string;
  avatar: string;
  bio?: string;
  interests: string[];
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  department: string;
  year: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginFormValues) => Promise<boolean>;
  register: (payload: RegisterFormValues) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  updateUserContext: (updatedUser: Partial<User>) => void;
}
