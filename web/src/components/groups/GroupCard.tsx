import React from 'react';
import { GroupItem } from '../../types/group.types';
import { Badge, BadgeVariant } from '../common/Badge';
import { Button } from '../common/Button';
import { Users, Clock, Check, Plus } from 'lucide-react';

export interface GroupCardProps {
  group: GroupItem;
  onToggleJoin: (groupId: string) => void;
  isJoined: boolean;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  onToggleJoin,
  isJoined,
}) => {
  const getCategoryBadgeVariant = (cat: string): BadgeVariant => {
    switch (cat) {
      case 'Tech & Coding':
        return 'indigo';
      case 'Design & Creative':
        return 'purple';
      case 'Sports & Fitness':
        return 'emerald';
      case 'Cultural & Arts':
        return 'rose';
      case 'Social Impact':
        return 'cyan';
      default:
        return 'indigo';
    }
  };

  return (
    <div
      className="glass-panel"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '18px',
      }}
    >
      {/* Banner */}
      <div style={{ position: 'relative', height: '140px' }}>
        <img
          src={group.bannerImage}
          alt={group.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(to bottom, rgba(9, 13, 22, 0.15) 0%, rgba(9, 13, 22, 0.9) 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Badge variant={getCategoryBadgeVariant(group.category)}>
            {group.category}
          </Badge>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
              padding: '4px 8px',
              borderRadius: '6px',
              color: '#38BDF8',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Users size={12} /> {group.memberCount + (isJoined ? 1 : 0)} Members
          </span>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
            {group.name}
          </h3>

          <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: '12px' }}>
            Led by <strong style={{ color: '#E2E8F0' }}>{group.leadName}</strong> • {group.leadRole}
          </div>

          <p
            style={{
              fontSize: '0.85rem',
              color: '#94A3B8',
              lineHeight: 1.5,
              marginBottom: '16px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {group.description}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              color: '#38BDF8',
              marginBottom: '16px',
            }}
          >
            <Clock size={13} /> {group.meetingSchedule}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {group.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.72rem',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#CBD5E1',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Toggle */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: '#6EE7B7' }}>
            ⚡ {group.upcomingEventCount} Upcoming activities
          </span>

          <Button
            variant={isJoined ? 'outline' : 'primary'}
            size="sm"
            onClick={() => onToggleJoin(group.id)}
            style={{
              borderColor: isJoined ? '#10B981' : undefined,
              color: isJoined ? '#10B981' : undefined,
            }}
          >
            {isJoined ? (
              <>
                <Check size={14} /> Joined Club
              </>
            ) : (
              <>
                <Plus size={14} /> Join Club
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
