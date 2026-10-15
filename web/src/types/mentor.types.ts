export type MentorDomain =
  | 'All'
  | 'Software Engineering'
  | 'AI & Data Science'
  | 'UI/UX Design'
  | 'Product Management'
  | 'Research & Academia';

export interface MentorItem {
  id: string;
  name: string;
  title: string;
  companyOrDept: string;
  domain: MentorDomain;
  avatar: string;
  bio: string;
  skills: string[];
  rating: number;
  reviewCount: number;
  completedSessions: number;
  availableDays: string[];
  hourlyRate: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface BookingPayload {
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  mentorRole: string;
  date: string;
  timeSlot: string;
  topic: string;
  notes?: string;
}

export interface BookedSession {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  mentorRole: string;
  date: string;
  timeSlot: string;
  topic: string;
  notes?: string;
  meetingLink: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  bookedAt: string;
}
