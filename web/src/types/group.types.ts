export type GroupCategory =
  | 'All'
  | 'Tech & Coding'
  | 'Design & Creative'
  | 'Sports & Fitness'
  | 'Cultural & Arts'
  | 'Social Impact';

export interface GroupItem {
  id: string;
  name: string;
  category: GroupCategory;
  description: string;
  badge: string;
  bannerImage: string;
  leadName: string;
  leadRole: string;
  memberCount: number;
  meetingSchedule: string;
  tags: string[];
  isJoined?: boolean;
  upcomingEventCount: number;
}
