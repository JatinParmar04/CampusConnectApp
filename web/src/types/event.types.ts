export type EventCategory =
  | 'All'
  | 'Tech'
  | 'Hackathon'
  | 'Workshop'
  | 'Cultural'
  | 'Sports'
  | 'Seminar';

export type EventRegistrationStatus = 'OPEN' | 'FILLING_FAST' | 'CLOSED';

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDetails?: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  isOnline: boolean;
  bannerImage: string;
  organizer: {
    name: string;
    logo?: string;
    club: string;
  };
  capacity: number;
  registeredCount: number;
  tags: string[];
  status?: EventRegistrationStatus;
  isFeatured?: boolean;
  isTeamEvent?: boolean;
  minTeamSize?: number;
  maxTeamSize?: number;
  attendeeAvatars: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  studentId: string;
  email: string;
}

export interface RegistrationPayload {
  eventId: string;
  eventTitle: string;
  registrationType: 'individual' | 'team';
  participantName: string;
  email: string;
  studentId: string;
  department: string;
  year: string;
  phone: string;
  teamName?: string;
  teamMembers?: TeamMember[];
  specialRequests?: string;
  agreedToTerms: boolean;
  registeredAt: string;
}

export interface TicketData {
  ticketId: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  participantName: string;
  registrationType: 'individual' | 'team';
  teamName?: string;
  qrCodeUrl: string;
  issuedAt: string;
}
