import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUserDocument, IUserModel, UserRole } from '../types/user.types';

const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false,
    },
    role: {
      type: String,
      enum: ['student', 'mentor', 'organizer', 'admin'] as UserRole[],
      default: 'student',
    },
    department: {
      type: String,
      trim: true,
      default: 'Computer Science & Engineering',
    },
    year: {
      type: String,
      trim: true,
      default: '3rd Year',
    },
    avatar: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      maxlength: [300, 'Bio cannot exceed 300 characters'],
      default: 'Student passionate about technology, design, and campus activities.',
    },
    interests: {
      type: [String],
      default: ['Web Development', 'Artificial Intelligence', 'Campus Events'],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving if modified (Mongoose 9 async hook)
userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  if (!this.avatar) {
    const cleanName = encodeURIComponent(this.name.trim());
    this.avatar = `https://api.dicebear.com/7.x/notionists/svg?seed=${cleanName}&backgroundColor=e5e7eb,c7d2fe,bbf7d0`;
  }
});

// Compare entered password with hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  if (!this.password) {
    return false;
  }
  return bcrypt.compare(enteredPassword, this.password);
};

// Static helper to find by normalized email
userSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email: email.toLowerCase().trim() });
};

export const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);
