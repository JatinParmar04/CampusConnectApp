import { Document, Model, Types } from 'mongoose';

export type UserRole = 'student' | 'mentor' | 'organizer' | 'admin';

export interface IUser {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  department: string;
  year?: string;
  avatar: string;
  bio?: string;
  interests: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends Omit<IUser, 'password'>, Document<Types.ObjectId> {
  password?: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByEmail(email: string): Promise<IUserDocument | null>;
}
