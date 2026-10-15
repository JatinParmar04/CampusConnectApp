import { EventItem } from '../types/event.types';

export const mockEvents: EventItem[] = [
  {
    id: 'evt-001',
    title: 'HackCampus 2026: 36h Collegiate Hackathon',
    slug: 'hackcampus-2026',
    description:
      'Join 400+ visionary student builders to architect innovative AI and Web solutions with $10,000 in prizes, mentor office hours, and sponsor expos.',
    fullDetails:
      'HackCampus is our university flagship hackathon bringing together cross-disciplinary students from engineering, design, and business. Food, drinks, swag, and hardware lab access provided throughout the 36 hours.',
    category: 'Hackathon',
    date: 'Oct 24 - 26, 2026',
    time: '09:00 AM - 09:00 PM',
    venue: 'Innovation Hub, Grand Auditorium',
    isOnline: false,
    bannerImage:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      name: 'Campus Dev Club',
      club: 'Department of Computing',
    },
    capacity: 400,
    registeredCount: 342,
    tags: ['AI/ML', 'Web3', 'Hardware', 'Prizes'],
    isFeatured: true,
    isTeamEvent: true,
    minTeamSize: 2,
    maxTeamSize: 4,
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    ],
  },
  {
    id: 'evt-002',
    title: 'Deep Learning & LLM Systems Masterclass',
    slug: 'deep-learning-llm-masterclass',
    description:
      'Hands-on workshop breaking down Transformer architectures, fine-tuning open-weights models, and deploying low-latency inference pipelines.',
    category: 'Workshop',
    date: 'Oct 28, 2026',
    time: '04:00 PM - 07:00 PM',
    venue: 'Turing Lecture Hall 3',
    isOnline: true,
    bannerImage:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      name: 'AI Research Society',
      club: 'Faculty of Informatics',
    },
    capacity: 150,
    registeredCount: 138,
    tags: ['PyTorch', 'Transformers', 'GPU Cluster'],
    isFeatured: true,
    isTeamEvent: false,
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
    ],
  },
  {
    id: 'evt-003',
    title: 'Rhythm & Beats: Annual Collegiate Music Gala',
    slug: 'rhythm-beats-music-gala',
    description:
      'Experience electrifying live performances from over 12 student bands, indie songwriters, and electronic producers under the open campus sky.',
    category: 'Cultural',
    date: 'Nov 02, 2026',
    time: '06:30 PM - 11:00 PM',
    venue: 'Open Air Amphitheatre',
    isOnline: false,
    bannerImage:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      name: 'University Cultural Council',
      club: 'Arts Guild',
    },
    capacity: 800,
    registeredCount: 620,
    tags: ['Live Music', 'Food Trucks', 'Nightfest'],
    isFeatured: true,
    isTeamEvent: false,
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    ],
  },
  {
    id: 'evt-004',
    title: 'Inter-Department Futsal Championship 2026',
    slug: 'inter-dept-futsal-championship',
    description:
      '16 departments battle on the turf in a fast-paced 5v5 knockout tournament for the collegiate trophy and athletic honors.',
    category: 'Sports',
    date: 'Nov 06 - 08, 2026',
    time: '03:00 PM - 08:00 PM',
    venue: 'Campus Sports Complex, Turf 2',
    isOnline: false,
    bannerImage:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      name: 'Athletics Board',
      club: 'Sports Union',
    },
    capacity: 160,
    registeredCount: 140,
    tags: ['Knockout', 'Medals', 'High Energy'],
    isFeatured: false,
    isTeamEvent: true,
    minTeamSize: 5,
    maxTeamSize: 8,
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
    ],
  },
  {
    id: 'evt-005',
    title: 'Founder Stories: Navigating Seed Rounds from Dorm Rooms',
    slug: 'founder-stories-seed-rounds',
    description:
      'Fireside chat with 3 university alumni founders who raised Series A funding within 24 months of graduation. Q&A and networking mixer included.',
    category: 'Seminar',
    date: 'Nov 12, 2026',
    time: '05:00 PM - 07:30 PM',
    venue: 'Executive Seminar Hall A',
    isOnline: true,
    bannerImage:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      name: 'E-Cell & Venture Studio',
      club: 'Business Incubator',
    },
    capacity: 120,
    registeredCount: 115,
    tags: ['Venture Capital', 'Startups', 'Networking'],
    isFeatured: false,
    isTeamEvent: false,
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    ],
  },
  {
    id: 'evt-006',
    title: 'Design Systems & Figma Component Mastery',
    slug: 'design-systems-figma-mastery',
    description:
      'Interactive workshop building tokenized UI components, accessible color schemes, and seamless design-to-code handoffs.',
    category: 'Workshop',
    date: 'Nov 16, 2026',
    time: '02:00 PM - 05:00 PM',
    venue: 'Media & Design Studio 4',
    isOnline: true,
    bannerImage:
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      name: 'Design Collective',
      club: 'School of Design',
    },
    capacity: 90,
    registeredCount: 82,
    tags: ['Figma', 'UI/UX', 'Design Tokens'],
    status: 'OPEN',
    isFeatured: false,
    isTeamEvent: false,
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    ],
  },
  {
    id: 'evt-007',
    title: 'Annual Campus Founders & VC Summit',
    slug: 'annual-campus-founders-vc-summit',
    description:
      'Premier invite-only pitch showcase connecting student ventures with leading angel networks and institutional VCs.',
    fullDetails:
      'All 200 general admission tickets have been claimed. Registration is officially closed. Registered attendees should bring their verified QR badge for check-in.',
    category: 'Seminar',
    date: 'Nov 20, 2026',
    time: '10:00 AM - 04:00 PM',
    venue: 'Dean Hall Auditorium & Executive Suites',
    isOnline: false,
    bannerImage:
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      name: 'Venture Capital Initiative',
      club: 'School of Management',
    },
    capacity: 200,
    registeredCount: 200,
    tags: ['Venture Capital', 'Pitching', 'Closed'],
    status: 'CLOSED',
    isFeatured: false,
    isTeamEvent: false,
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    ],
  },
];
