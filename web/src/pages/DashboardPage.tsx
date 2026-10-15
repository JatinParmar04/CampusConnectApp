import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RegistrationPayload } from '../types/event.types';
import { BookedSession } from '../types/mentor.types';
import { GroupItem } from '../types/group.types';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import {
  Calendar,
  Users,
  Award,
  Compass,
  QrCode,
  ArrowRight,
  Sparkles,
  Video,
  Clock,
  Trash2,
} from 'lucide-react';

export interface DashboardPageProps {
  registeredEvents: RegistrationPayload[];
  bookedSessions: BookedSession[];
  joinedGroups: GroupItem[];
  onCancelRegistration: (eventId: string) => void;
  onCancelSession: (sessionId: string) => void;
  onLeaveGroup: (groupId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  registeredEvents,
  bookedSessions,
  joinedGroups,
  onCancelRegistration,
  onCancelSession,
  onLeaveGroup,
}) => {
  const { user } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<RegistrationPayload | null>(null);

  const studentName = user?.name ?? 'Alex Mercer';
  const studentEmail = user?.email ?? 'alex.mercer@university.edu';
  const studentDept = user?.department ?? 'Computer Science & Engineering';
  const studentYear = user?.year ?? '3rd Year';
  const studentAvatar =
    user?.avatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';

  // Calculate dynamic activity points
  const calculatedPoints =
    registeredEvents.length * 200 +
    joinedGroups.length * 150 +
    bookedSessions.length * 100 +
    250;

  const currentLevel = Math.max(1, Math.floor(calculatedPoints / 300));

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container">
        {/* Welcome Banner */}
        <div
          className="glass-panel"
          style={{
            padding: '36px',
            borderRadius: '24px',
            marginBottom: '36px',
            position: 'relative',
            overflow: 'hidden',
            background:
              'linear-gradient(135deg, rgba(30, 41, 59, 0.75) 0%, rgba(15, 23, 42, 0.85) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img
                src={studentAvatar}
                alt={studentName}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '20px',
                  objectFit: 'cover',
                  border: '3px solid rgba(99, 102, 241, 0.5)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                }}
              />
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    background: 'rgba(99, 102, 241, 0.2)',
                    color: '#A5B4FC',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  <Sparkles size={12} /> Student Dashboard
                </div>
                <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '4px' }}>
                  Welcome back, <span className="gradient-text">{studentName}</span>
                </h1>
                <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
                  {studentDept} • {studentYear} • {studentEmail}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to="/events" style={{ textDecoration: 'none' }}>
                <Button variant="glow">
                  <Calendar size={16} /> Discover Events
                </Button>
              </Link>
              <Link to="/mentors" style={{ textDecoration: 'none' }}>
                <Button variant="outline">
                  <Compass size={16} /> Find Mentors
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bento Summary Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '48px',
          }}
        >
          {/* Card 1: Registered Events */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>
                Active Registrations
              </span>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(99, 102, 241, 0.15)',
                  color: '#A5B4FC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Calendar size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF' }}>
              {registeredEvents.length}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#34D399', marginTop: '4px' }}>
              ✓ All passes verified & stored
            </div>
          </div>

          {/* Card 2: Joined Clubs */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>
                Joined Student Clubs
              </span>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(6, 182, 212, 0.15)',
                  color: '#67E8F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Users size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#38BDF8' }}>
              {joinedGroups.length}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
              Active memberships
            </div>
          </div>

          {/* Card 3: Mentorship Sessions */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>
                Mentorship Sessions
              </span>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#6EE7B7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Compass size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#10B981' }}>
              {bookedSessions.length}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#34D399', marginTop: '4px' }}>
              Scheduled 1-on-1 calls
            </div>
          </div>

          {/* Card 4: Campus XP */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>
                Collegiate Level
              </span>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: '#FCD34D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Award size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FCD34D' }}>
              Level {currentLevel}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
              {calculatedPoints} Total Engagement XP
            </div>
          </div>
        </div>

        {/* Section 1: Registered Events & Passes */}
        <div style={{ marginBottom: '56px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF' }}>
                My Registered Events & Passes ({registeredEvents.length})
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8' }}>
                Digital passes and QR check-in codes for your upcoming campus sessions.
              </p>
            </div>
            <Link to="/events" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="sm">
                Explore More Events <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          {registeredEvents.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {registeredEvents.map((reg) => (
                <div
                  key={reg.eventId}
                  className="glass-panel"
                  style={{
                    padding: '22px 24px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'rgba(99, 102, 241, 0.2)',
                        color: '#A5B4FC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Calendar size={24} />
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: '#38BDF8',
                        }}
                      >
                        {reg.registrationType === 'team'
                          ? `Team Pass: ${reg.teamName ?? 'Group'}`
                          : 'Individual Pass'}
                      </span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>
                        {reg.eventTitle}
                      </h3>
                      <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '4px' }}>
                        Attendee: <strong style={{ color: '#E2E8F0' }}>{reg.participantName}</strong> • ID: {reg.studentId} • Registered on {new Date(reg.registeredAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Button
                      variant="glow"
                      size="sm"
                      onClick={() => setSelectedTicket(reg)}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <QrCode size={16} /> View Ticket Pass
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCancelRegistration(reg.eventId)}
                      style={{ color: '#EF4444' }}
                    >
                      Cancel RSVP
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="glass-panel"
              style={{
                padding: '48px 20px',
                textAlign: 'center',
                borderRadius: '18px',
              }}
            >
              <Calendar size={44} color="#64748B" style={{ margin: '0 auto 14px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                No Active Event Registrations
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', maxWidth: '440px', margin: '0 auto 20px' }}>
                You haven't registered for any events yet. Check out the latest hackathons and workshops.
              </p>
              <Link to="/events" style={{ textDecoration: 'none' }}>
                <Button variant="primary">
                  Browse Campus Events
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Section 2: Scheduled Mentorship Sessions */}
        <div style={{ marginBottom: '56px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF' }}>
                My Mentorship Sessions ({bookedSessions.length})
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8' }}>
                Upcoming 1-on-1 office hours with alumni and domain specialists.
              </p>
            </div>
            <Link to="/mentors" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="sm">
                Book Another Mentor <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          {bookedSessions.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
              {bookedSessions.map((session) => (
                <div
                  key={session.id}
                  className="glass-panel"
                  style={{
                    padding: '22px',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                      <img
                        src={session.mentorAvatar}
                        alt={session.mentorName}
                        style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }}
                      />
                      <div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>
                          {session.mentorName}
                        </h4>
                        <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                          {session.mentorRole}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        padding: '12px',
                        borderRadius: '10px',
                        marginBottom: '16px',
                        fontSize: '0.85rem',
                      }}
                    >
                      <div style={{ fontWeight: 600, color: '#38BDF8', marginBottom: '4px' }}>
                        Topic: {session.topic}
                      </div>
                      <div style={{ color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={13} color="#A5B4FC" /> {session.date} • {session.timeSlot}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                    <a
                      href={session.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                      style={{ padding: '6px 14px', fontSize: '0.82rem', gap: '6px' }}
                    >
                      <Video size={14} /> Join Video Call
                    </a>
                    <button
                      onClick={() => onCancelSession(session.id)}
                      className="btn btn-ghost"
                      style={{ color: '#EF4444', padding: '6px 10px', fontSize: '0.8rem' }}
                    >
                      Cancel Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="glass-panel"
              style={{
                padding: '48px 20px',
                textAlign: 'center',
                borderRadius: '18px',
              }}
            >
              <Compass size={44} color="#64748B" style={{ margin: '0 auto 14px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                No Mentorship Sessions Booked
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', maxWidth: '440px', margin: '0 auto 20px' }}>
                Get code reviews, resume critique, and interview prep directly from alumni.
              </p>
              <Link to="/mentors" style={{ textDecoration: 'none' }}>
                <Button variant="primary">
                  Explore Mentor Directory
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Section 3: Joined Student Communities */}
        <div style={{ marginBottom: '40px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF' }}>
                My Student Communities ({joinedGroups.length})
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8' }}>
                Societies and organizations you are actively participating in.
              </p>
            </div>
            <Link to="/clubs" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="sm">
                Discover More Clubs <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          {joinedGroups.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
              {joinedGroups.map((group) => (
                <div
                  key={group.id}
                  className="glass-panel"
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#A5B4FC', fontWeight: 700, textTransform: 'uppercase' }}>
                        {group.category}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#6EE7B7' }}>
                        ✓ Active Member
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
                      {group.name}
                    </h4>

                    <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '14px', lineHeight: 1.5 }}>
                      {group.description}
                    </p>

                    <div style={{ fontSize: '0.78rem', color: '#38BDF8', marginBottom: '14px' }}>
                      Meetings: {group.meetingSchedule}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                      {group.memberCount} members
                    </span>
                    <button
                      onClick={() => onLeaveGroup(group.id)}
                      className="btn btn-ghost"
                      style={{ color: '#EF4444', fontSize: '0.78rem', padding: '4px 8px' }}
                    >
                      <Trash2 size={13} /> Leave Club
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="glass-panel"
              style={{
                padding: '48px 20px',
                textAlign: 'center',
                borderRadius: '18px',
              }}
            >
              <Users size={44} color="#64748B" style={{ margin: '0 auto 14px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                No Clubs Joined Yet
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', maxWidth: '440px', margin: '0 auto 20px' }}>
                Join robotics labs, design guilds, debate societies, and athletic clubs.
              </p>
              <Link to="/clubs" style={{ textDecoration: 'none' }}>
                <Button variant="primary">
                  Explore Campus Clubs
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Ticket Pass Viewer Modal */}
      {selectedTicket && (
        <Modal
          isOpen={Boolean(selectedTicket)}
          onClose={() => setSelectedTicket(null)}
          title="Digital Event Ticket Pass"
          maxWidth="460px"
        >
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #1E293B, #0F172A)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px dashed rgba(255, 255, 255, 0.25)',
                marginBottom: '20px',
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.75rem', color: '#A5B4FC', fontWeight: 700, textTransform: 'uppercase' }}>
                  Official CampusConnect QR Pass
                </span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', marginTop: '4px' }}>
                  {selectedTicket.eventTitle}
                </h4>
              </div>

              <div
                style={{
                  background: '#FFFFFF',
                  width: '160px',
                  height: '160px',
                  margin: '0 auto 20px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                }}
              >
                <QrCode size={120} color="#0F172A" />
              </div>

              <div style={{ fontSize: '0.85rem', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div>Attendee: <strong style={{ color: '#FFFFFF' }}>{selectedTicket.participantName}</strong></div>
                <div>ID: <strong>{selectedTicket.studentId}</strong></div>
                <div>Type: <strong style={{ color: '#38BDF8' }}>{selectedTicket.registrationType.toUpperCase()}</strong></div>
                {selectedTicket.teamName && (
                  <div>Team: <strong style={{ color: '#38BDF8' }}>{selectedTicket.teamName}</strong></div>
                )}
              </div>
            </div>

            <Button
              variant="primary"
              style={{ width: '100%' }}
              onClick={() => alert('Ticket pass downloaded to local device!')}
            >
              Download Ticket PDF / Save to Wallet
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
