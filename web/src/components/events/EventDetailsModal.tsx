import React from 'react';
import { EventItem } from '../../types/event.types';
import { Modal } from '../common/Modal';
import { Badge, BadgeVariant } from '../common/Badge';
import { Button } from '../common/Button';
import { AvatarStack } from '../common/AvatarStack';
import {
  Calendar,
  MapPin,
  Users,
  Globe,
  Clock,
  Sparkles,
  CheckCircle2,
  Building,
} from 'lucide-react';

export interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
  onRegister: (event: EventItem) => void;
  isRegistered: boolean;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  onClose,
  event,
  onRegister,
  isRegistered,
}) => {
  if (!event) return null;

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

  const spotsRemaining = Math.max(0, event.capacity - event.registeredCount);
  const isFull = spotsRemaining === 0;
  const isClosed = event.status === 'CLOSED' || isFull;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={event.title}
      maxWidth="680px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Banner with Badges */}
        <div
          style={{
            position: 'relative',
            height: '220px',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <img
            src={event.bannerImage}
            alt={event.title}
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
                'linear-gradient(to bottom, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              right: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Badge variant={getCategoryBadgeVariant(event.category)}>
              {event.category}
            </Badge>

            {event.isTeamEvent && (
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(8px)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  color: '#38BDF8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Users size={14} /> Teams of {event.minTeamSize}-{event.maxTeamSize}
              </span>
            )}
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building size={14} color="#A5B4FC" /> Organized by{' '}
              <strong style={{ color: '#FFFFFF' }}>{event.organizer.name}</strong> •{' '}
              {event.organizer.club}
            </div>
          </div>
        </div>

        {/* Schedule & Location Bento Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '14px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(99, 102, 241, 0.15)',
                color: '#A5B4FC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Calendar size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 600 }}>
                Date & Time
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>
                {event.date}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Clock size={12} /> {event.time}
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '14px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(6, 182, 212, 0.15)',
                color: '#67E8F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {event.isOnline ? <Globe size={18} /> : <MapPin size={18} />}
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 600 }}>
                Location / Format
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>
                {event.isOnline ? 'Online / Virtual Link' : event.venue}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#34D399', marginTop: '2px' }}>
                {event.isOnline ? 'Access provided upon RSVP' : 'Campus Main Campus'}
              </div>
            </div>
          </div>
        </div>

        {/* Full Description & Overview */}
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
            About This Event
          </h4>
          <p style={{ fontSize: '0.92rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '14px' }}>
            {event.fullDetails ?? event.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {event.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.75rem',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  background: 'rgba(99, 102, 241, 0.12)',
                  color: '#A5B4FC',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Capacity Breakdown */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AvatarStack avatars={event.attendeeAvatars} totalCount={event.registeredCount} />
              <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                <strong style={{ color: '#FFFFFF' }}>{event.registeredCount}</strong> students registered
              </span>
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: isFull ? '#EF4444' : '#34D399' }}>
              {isFull ? 'Sold Out' : `${spotsRemaining} spots left`}
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: '8px',
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

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
          <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>
            Close Details
          </Button>

          {isRegistered ? (
            <Button
              variant="outline"
              disabled
              style={{ flex: 2, borderColor: '#10B981', color: '#10B981' }}
            >
              <CheckCircle2 size={16} /> You're Registered for this Event
            </Button>
          ) : isClosed ? (
            <Button
              variant="outline"
              disabled
              style={{ flex: 2, borderColor: 'rgba(239, 68, 68, 0.4)', color: '#F87171' }}
            >
              Registration Closed
            </Button>
          ) : (
            <Button
              variant="glow"
              onClick={() => {
                onClose();
                onRegister(event);
              }}
              style={{ flex: 2 }}
            >
              <Sparkles size={16} /> Proceed to Registration
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
