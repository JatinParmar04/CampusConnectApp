import React from 'react';
import { EventItem } from '../../types/event.types';
import { Badge, BadgeVariant } from '../common/Badge';
import { AvatarStack } from '../common/AvatarStack';
import { Button } from '../common/Button';
import { Calendar, MapPin, Users, Globe, Info } from 'lucide-react';

export interface EventCardProps {
  event: EventItem;
  onRegister: (event: EventItem) => void;
  onSelectEvent?: (event: EventItem) => void;
  isRegistered?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onRegister,
  onSelectEvent,
  isRegistered = false,
}) => {
  const getCategoryBadgeVariant = (cat: string): BadgeVariant => {
    switch (cat) {
      case 'Hackathon':
        return 'purple';
      case 'Tech':
      case 'Workshop':
        return 'indigo';
      case 'Cultural':
        return 'rose';
      case 'Sports':
        return 'emerald';
      case 'Seminar':
        return 'cyan';
      default:
        return 'indigo';
    }
  };

  const percentageFilled = Math.min(
    100,
    Math.round((event.registeredCount / event.capacity) * 100)
  );

  const isFull = event.registeredCount >= event.capacity;

  return (
    <div
      className="glass-panel"
      onClick={() => onSelectEvent?.(event)}
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        position: 'relative',
        cursor: onSelectEvent ? 'pointer' : 'default',
        transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={(e) => {
        if (onSelectEvent) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (onSelectEvent) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {/* Banner Image Container */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img
          src={event.bannerImage}
          alt={event.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(to bottom, rgba(9, 13, 22, 0.2) 0%, rgba(9, 13, 22, 0.85) 100%)',
          }}
        />

        {/* Top Badges */}
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
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <Badge variant={getCategoryBadgeVariant(event.category)}>
              {event.category}
            </Badge>
            {event.status === 'CLOSED' || isFull ? (
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  background: 'rgba(239, 68, 68, 0.25)',
                  border: '1px solid rgba(239, 68, 68, 0.45)',
                  backdropFilter: 'blur(8px)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  color: '#FCA5A5',
                }}
              >
                Registration Closed
              </span>
            ) : event.status === 'FILLING_FAST' || percentageFilled > 85 ? (
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  background: 'rgba(245, 158, 11, 0.25)',
                  border: '1px solid rgba(245, 158, 11, 0.45)',
                  backdropFilter: 'blur(8px)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  color: '#FCD34D',
                }}
              >
                ⚡ Filling Fast
              </span>
            ) : null}
          </div>

          {event.isTeamEvent && (
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(8px)',
                padding: '4px 8px',
                borderRadius: '6px',
                color: '#E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Users size={12} /> Team {event.minTeamSize}-{event.maxTeamSize}
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
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
          {/* Date & Location */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.8rem',
              color: '#38BDF8',
              marginBottom: '8px',
              fontWeight: 600,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} /> {event.date}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {event.isOnline ? <Globe size={14} /> : <MapPin size={14} />}
              {event.isOnline ? 'Online / Hybrid' : event.venue.split(',')[0]}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              lineHeight: 1.35,
              marginBottom: '10px',
              color: '#FFFFFF',
            }}
          >
            {event.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: '0.88rem',
              color: '#94A3B8',
              lineHeight: 1.5,
              marginBottom: '16px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {event.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {event.tags.map((tag, idx) => (
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

        {/* Footer Area: Capacity & Action Button */}
        <div>
          {/* Capacity Progress Bar */}
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#94A3B8',
                marginBottom: '4px',
                fontWeight: 500,
              }}
            >
              <span>Capacity ({event.registeredCount}/{event.capacity})</span>
              <span style={{ color: isFull ? '#F43F5E' : '#6EE7B7', fontWeight: 600 }}>
                {isFull ? 'Sold Out' : `${percentageFilled}% Filled`}
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '9999px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${percentageFilled}%`,
                  height: '100%',
                  background:
                    percentageFilled > 90
                      ? 'linear-gradient(90deg, #F59E0B, #EF4444)'
                      : 'linear-gradient(90deg, #6366F1, #06B6D4)',
                  borderRadius: '9999px',
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AvatarStack avatars={event.attendeeAvatars} totalCount={event.registeredCount} />
              {onSelectEvent && (
                <span
                  title="View full details"
                  style={{
                    fontSize: '0.72rem',
                    color: '#64748B',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px',
                    marginLeft: '4px',
                  }}
                >
                  <Info size={13} />
                </span>
              )}
            </div>

            {isRegistered ? (
              <Button
                variant="outline"
                size="sm"
                disabled
                style={{ borderColor: '#10B981', color: '#10B981' }}
                onClick={(e) => e.stopPropagation()}
              >
                ✓ Registered
              </Button>
            ) : event.status === 'CLOSED' || isFull ? (
              <Button
                variant="outline"
                size="sm"
                disabled
                style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#F87171', opacity: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                Registration Closed
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRegister(event);
                }}
              >
                Register Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
