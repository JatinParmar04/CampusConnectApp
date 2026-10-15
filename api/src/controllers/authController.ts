import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { IUserDocument } from '../types/user.types';
import {
  RegisterDto,
  LoginDto,
  AuthSuccessResponse,
  AuthUserPayload,
  JwtCustomPayload,
} from '../types/auth.types';
import { ApiResponse } from '../types/api.types';
import { AuthenticatedRequest } from '../middleware/auth';

/**
 * Generate signed JWT token
 */
function generateToken(payload: JwtCustomPayload): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not configured on server');
  }
  const expiresIn = process.env.JWT_EXPIRES_IN ?? '7d';
  return jwt.sign(payload, secret, { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] });
}

/**
 * Format user document into clean, sanitized payload
 */
function sanitizeUser(user: IUserDocument): AuthUserPayload {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department,
    year: user.year,
    avatar: user.avatar,
    bio: user.bio,
    interests: user.interests,
    createdAt: user.createdAt.toISOString(),
  };
}

/**
 * @route   POST /api/auth/register
 * @desc    Register a new student/user
 * @access  Public
 */
export async function register(
  req: Request<Record<string, never>, ApiResponse<AuthSuccessResponse>, RegisterDto>,
  res: Response<ApiResponse<AuthSuccessResponse>>,
  next: NextFunction
): Promise<void> {
  try {
    const { name, email, password, department, year, role, interests } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide full name, email address, and password.',
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'An account with this email address already exists. Please log in.',
      });
      return;
    }

    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      department: department ?? 'Computer Science & Engineering',
      year: year ?? '3rd Year',
      role: role ?? 'student',
      interests: interests && interests.length > 0 ? interests : ['Campus Activities', 'Tech'],
    });

    const token = generateToken({
      id: newUser._id.toString(),
      role: newUser.role,
      email: newUser.email,
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to CampusConnect.',
      data: {
        user: sanitizeUser(newUser),
        token,
      },
    });
  } catch (error: unknown) {
    next(error);
  }
}

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & retrieve token
 * @access  Public
 */
export async function login(
  req: Request<Record<string, never>, ApiResponse<AuthSuccessResponse>, LoginDto>,
  res: Response<ApiResponse<AuthSuccessResponse>>,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
      return;
    }

    // Fetch user and explicitly include password field
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials. No user found with this email.',
      });
      return;
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password combination.',
      });
      return;
    }

    const token = generateToken({
      id: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      data: {
        user: sanitizeUser(user),
        token,
      },
    });
  } catch (error: unknown) {
    next(error);
  }
}

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated user profile
 * @access  Private (Bearer Token required)
 */
export async function getMe(
  req: AuthenticatedRequest,
  res: Response<ApiResponse<AuthUserPayload>>,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authorized to access this resource.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: sanitizeUser(req.user),
    });
  } catch (error: unknown) {
    next(error);
  }
}

/**
 * @route   PUT /api/auth/profile
 * @desc    Update current user profile
 * @access  Private
 */
export async function updateProfile(
  req: AuthenticatedRequest,
  res: Response<ApiResponse<AuthUserPayload>>,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authorized.',
      });
      return;
    }

    const { name, department, year, bio, interests } = req.body as {
      name?: string;
      department?: string;
      year?: string;
      bio?: string;
      interests?: string[];
    };

    if (name) req.user.name = name.trim();
    if (department) req.user.department = department.trim();
    if (year) req.user.year = year.trim();
    if (bio !== undefined) req.user.bio = bio.trim();
    if (interests && Array.isArray(interests)) req.user.interests = interests;

    const updatedUser = await req.user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      data: sanitizeUser(updatedUser),
    });
  } catch (error: unknown) {
    next(error);
  }
}
