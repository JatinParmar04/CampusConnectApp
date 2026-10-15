import React from 'react';
import { MentorItem } from '../../types/mentor.types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Star, Calendar, MessageSquare, Briefcase } from 'lucide-react';

export interface MentorCardProps {
  mentor: MentorItem;
  onBook: (mentor: MentorItem) => void;
}

export const MentorCard: React.FC<MentorCardProps> = ({ mentor, onBook }) => {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '18px',
        position: 'relative',
      }}
    >
      <div>
        {/* Top Header: Avatar + Meta */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
          <img
            src={mentor.avatar}
            alt={mentor.name}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              objectFit: 'cover',
              border: '2px solid rgba(99, 102, 241, 0.4)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>{mentor.name}</h3>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#FCD34D',
                }}
              >
                <Star size={14} fill="#FCD34D" color="#FCD34D" />
                <span>{mentor.rating.toFixed(2)}</span>
                <span style={{ color: '#64748B', fontWeight: 400 }}>({mentor.reviewCount})</span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#A5B4FC', fontWeight: 600, marginTop: '2px' }}>
              {mentor.title}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                color: '#94A3B8',
                marginTop: '4px',
              }}
            >
              <Briefcase size={13} /> {mentor.companyOrDept}
            </div>
          </div>
        </div>

        {/* Domain Badge */}
        <div style={{ marginBottom: '12px' }}>
          <Badge variant="cyan">{mentor.domain}</Badge>
        </div>

        {/* Bio */}
        <p
          style={{
            fontSize: '0.85rem',
            color: '#94A3B8',
            lineHeight: 1.5,
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {mentor.bio}
        </p>

        {/* Skill Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {mentor.skills.map((skill, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.72rem',
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#CBD5E1',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Area: Availability & Booking CTA */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={13} color="#38BDF8" /> {mentor.availableDays.join(', ')}
          </div>
          <div style={{ color: '#10B981', fontWeight: 600, marginTop: '2px' }}>
            {mentor.hourlyRate}
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onBook(mentor)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <MessageSquare size={14} /> Book Session
        </Button>
      </div>
    </div>
  );
};
