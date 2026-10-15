import { UserRole } from './user.types';

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  department?: string;
  year?: string;
  role?: UserRole;
  interests?: string[];
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthUserPayload {
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

export interface AuthSuccessResponse {
  user: AuthUserPayload;
  token: string;
}

export interface JwtCustomPayload {
  id: string;
  role: UserRole;
  email: string;
}
