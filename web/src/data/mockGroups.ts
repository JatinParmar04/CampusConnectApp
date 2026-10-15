import { GroupItem } from '../types/group.types';

export const mockGroups: GroupItem[] = [
  {
    id: 'grp-001',
    name: 'ACM Student Chapter',
    category: 'Tech & Coding',
    description:
      'The premier computer science society on campus organizing weekly algorithmic practice, hackathons, and guest lectures from industry pioneers.',
    badge: 'Official Chapter',
    bannerImage:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    leadName: 'Rohan Mehta',
    leadRole: 'President, 4th Year CSE',
    memberCount: 520,
    meetingSchedule: 'Wednesdays @ 5:30 PM, Lab 4',
    tags: ['Competitive Programming', 'Open Source', 'Hackathons'],
    isJoined: true,
    upcomingEventCount: 3,
  },
  {
    id: 'grp-002',
    name: 'Creative Guild & Design Collective',
    category: 'Design & Creative',
    description:
      'A sanctuary for visual artists, UI/UX enthusiasts, 3D animators, and photographers. We collaborate on campus branding and creative zines.',
    badge: 'Design Community',
    bannerImage:
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
    leadName: 'Ananya Deshmukh',
    leadRole: 'Creative Lead, 3rd Year Design',
    memberCount: 380,
    meetingSchedule: 'Fridays @ 4:00 PM, Design Studio 2',
    tags: ['UI/UX', 'Figma', 'Typography', 'Illustration'],
    isJoined: false,
    upcomingEventCount: 2,
  },
  {
    id: 'grp-003',
    name: 'Autonomous Robotics & Drones Lab',
    category: 'Tech & Coding',
    description:
      'Designing, welding, and coding autonomous ground rovers and aerial quadcopters for national collegiate engineering competitions.',
    badge: 'Hardware Lab',
    bannerImage:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    leadName: 'Vikram Patel',
    leadRole: 'Captain, Mechatronics Dept',
    memberCount: 215,
    meetingSchedule: 'Saturdays @ 11:00 AM, MakerSpace',
    tags: ['ROS 2', 'Embedded Systems', 'PCB Design', 'Drones'],
    isJoined: false,
    upcomingEventCount: 1,
  },
  {
    id: 'grp-004',
    name: 'University Debate & Literary Society',
    category: 'Cultural & Arts',
    description:
      'Fostering parliamentary debate, critical discourse on geopolitics, creative writing anthologies, and public speaking workshops.',
    badge: 'Founded 2012',
    bannerImage:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    leadName: 'Zara Khan',
    leadRole: 'Chief Debater, 3rd Year Law',
    memberCount: 290,
    meetingSchedule: 'Tuesdays @ 6:00 PM, Senate Hall',
    tags: ['Parliamentary Debate', 'Public Speaking', 'MUN'],
    isJoined: true,
    upcomingEventCount: 2,
  },
  {
    id: 'grp-005',
    name: 'Campus Marathon & Trekking Club',
    category: 'Sports & Fitness',
    description:
      'Weekend trail runs, morning sprint sessions, and seasonal high-altitude mountain trekking expeditions across the state.',
    badge: 'Active Outdoors',
    bannerImage:
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80',
    leadName: 'Karan Singh',
    leadRole: 'Expedition Lead, Physical Ed',
    memberCount: 410,
    meetingSchedule: 'Sundays @ 6:00 AM, Campus Main Oval',
    tags: ['Running', 'Trail Running', 'Endurance', 'Hiking'],
    isJoined: false,
    upcomingEventCount: 3,
  },
  {
    id: 'grp-006',
    name: 'GreenCampus Sustainability League',
    category: 'Social Impact',
    description:
      'Student-driven initiatives for solar energy expansion, zero-waste campus dining, native tree plantations, and e-waste recycling drives.',
    badge: 'Eco Initiative',
    bannerImage:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    leadName: 'Mira Sen',
    leadRole: 'Sustainability Chair, Env Science',
    memberCount: 340,
    meetingSchedule: 'Thursdays @ 5:00 PM, Eco Garden',
    tags: ['Sustainability', 'Zero Waste', 'Social Action'],
    isJoined: false,
    upcomingEventCount: 1,
  },
];
