import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MentorItem, MentorDomain, BookedSession } from '../types/mentor.types';
import { MentorCard } from '../components/mentors/MentorCard';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { Search, Compass, CheckCircle2, Clock, X, RotateCcw, Video } from 'lucide-react';

export interface MentorsPageProps {
  mentors: MentorItem[];
  onBookSession: (session: BookedSession) => void;
  bookedSessions: BookedSession[];
}

export const MentorsPage: React.FC<MentorsPageProps> = ({
  mentors,
  onBookSession,
  bookedSessions,
}) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<MentorDomain>('All');

  // Booking Modal State
  const [bookingMentor, setBookingMentor] = useState<MentorItem | null>(null);
  const [selectedDate, setSelectedDate] = useState('2026-10-28');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('05:00 PM - 05:45 PM');
  const [bookingTopic, setBookingTopic] = useState('Resume & Portfolio Review');
  const [bookingNotes, setBookingNotes] = useState('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [confirmedSession, setConfirmedSession] = useState<BookedSession | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const domains: MentorDomain[] = [
    'All',
    'Software Engineering',
    'AI & Data Science',
    'UI/UX Design',
    'Product Management',
    'Research & Academia',
  ];

  // Compound filter: search query AND domain
  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        m.name.toLowerCase().includes(query) ||
        m.title.toLowerCase().includes(query) ||
        m.companyOrDept.toLowerCase().includes(query) ||
        m.skills.some((s) => s.toLowerCase().includes(query));

      const matchesDomain =
        selectedDomain === 'All' || m.domain === selectedDomain;

      return matchesSearch && matchesDomain;
    });
  }, [mentors, searchQuery, selectedDomain]);

  const hasActiveFilters = searchQuery.trim().length > 0 || selectedDomain !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDomain('All');
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/auth', {
        state: {
          from: '/mentors',
          message: 'Please sign in or create an account to book 1-on-1 mentorship sessions.',
        },
      });
      return;
    }
    if (!bookingMentor) return;

    // Check duplicate session
    const isDuplicate = bookedSessions.some(
      (s) =>
        s.mentorId === bookingMentor.id &&
        s.date === selectedDate &&
        s.timeSlot === selectedTimeSlot
    );

    if (isDuplicate) {
      setBookingError('You already have a confirmed session with this mentor for this time slot.');
      return;
    }

    setIsSubmittingBooking(true);
    setBookingError(null);

    setTimeout(() => {
      const newSession: BookedSession = {
        id: `sess-${Date.now()}`,
        mentorId: bookingMentor.id,
        mentorName: bookingMentor.name,
        mentorAvatar: bookingMentor.avatar,
        mentorRole: `${bookingMentor.title} • ${bookingMentor.companyOrDept}`,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        topic: bookingTopic,
        notes: bookingNotes.trim() || undefined,
        meetingLink: `https://meet.google.com/ccc-ment-${Date.now().toString().slice(-4)}`,
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
      };

      onBookSession(newSession);
      setIsSubmittingBooking(false);
      setConfirmedSession(newSession);
    }, 600);
  };

  const handleCloseModal = () => {
    setConfirmedSession(null);
    setBookingMentor(null);
    setBookingError(null);
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#38BDF8',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '8px',
            }}
          >
            <Compass size={16} /> Alumni & Faculty Guidance
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '10px' }}>
            Connect with <span className="gradient-text">Campus Mentors</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1rem', maxWidth: '640px' }}>
            Book free 1-on-1 office hours with alumni engineers, product leads, and research fellows
            to elevate your technical capstones and career ambitions.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div
          className="glass-panel"
          style={{
            padding: '16px 20px',
            borderRadius: '16px',
            marginBottom: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Search Input with Clear button */}
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder="Search mentors by name, company, or skills (e.g. System Design, PyTorch, Figma)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '44px',
                paddingRight: searchQuery ? '40px' : '14px',
                height: '46px',
                background: 'rgba(9, 13, 22, 0.7)',
                fontSize: '0.95rem',
              }}
            />
            <Search
              size={20}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748B',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Domain Filter Pills & Reset */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '2px',
              }}
            >
              {domains.map((dom) => {
                const isSelected = selectedDomain === dom;
                return (
                  <button
                    key={dom}
                    onClick={() => setSelectedDomain(dom)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      color: isSelected ? '#FFFFFF' : '#94A3B8',
                      background: isSelected
                        ? 'linear-gradient(135deg, #06B6D4, #3B82F6)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected
                        ? '1px solid rgba(6, 182, 212, 0.5)'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    {dom}
                  </button>
                );
              })}
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#F87171',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={13} /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Counter */}
        <div style={{ marginBottom: '24px', fontSize: '0.9rem', color: '#94A3B8' }}>
          Showing <strong style={{ color: '#FFFFFF' }}>{filteredMentors.length}</strong> available mentors
          {selectedDomain !== 'All' ? ` in ${selectedDomain}` : ''}
          {searchQuery ? ` matching "${searchQuery}"` : ''}
        </div>

        {/* Mentors Grid */}
        {filteredMentors.length > 0 ? (
          <div className="cards-grid">
            {filteredMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onBook={(m) => {
                  if (!isAuthenticated) {
                    navigate('/auth', {
                      state: {
                        from: '/mentors',
                        message: 'Please sign in or create an account to book 1-on-1 mentorship sessions.',
                      },
                    });
                    return;
                  }
                  setBookingMentor(m);
                  setConfirmedSession(null);
                  setBookingError(null);
                }}
              />
            ))}
          </div>
        ) : (
          <div
            className="glass-panel"
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              borderRadius: '20px',
            }}
          >
            <Compass size={48} color="#64748B" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
              No Mentors Found Matching Your Criteria
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 20px' }}>
              Try searching by a broader keyword or select "All" domains to see all active mentors.
            </p>
            <Button variant="primary" onClick={handleResetFilters}>
              <RotateCcw size={14} /> Clear Filters & View All
            </Button>
          </div>
        )}

        {/* Booking Modal */}
        {bookingMentor && (
          <Modal
            isOpen={Boolean(bookingMentor)}
            onClose={handleCloseModal}
            title={confirmedSession ? 'Mentorship Scheduled!' : `Book 1-on-1 with ${bookingMentor.name}`}
            maxWidth={confirmedSession ? '480px' : '560px'}
          >
            {confirmedSession ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }} className="animate-fade-in">
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '2px solid rgba(16, 185, 129, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#34D399',
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
                  Office Hour Confirmed!
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '20px' }}>
                  This session has been added to your Student Dashboard under "My Mentorship Sessions".
                </p>

                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    padding: '16px',
                    borderRadius: '12px',
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    color: '#CBD5E1',
                    marginBottom: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div>Mentor: <strong style={{ color: '#FFFFFF' }}>{confirmedSession.mentorName}</strong></div>
                  <div>Topic: <strong style={{ color: '#38BDF8' }}>{confirmedSession.topic}</strong></div>
                  <div>Schedule: <strong>{confirmedSession.date} at {confirmedSession.timeSlot}</strong></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34D399', marginTop: '4px' }}>
                    <Video size={14} /> Meeting Link: <a href={confirmedSession.meetingLink} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>{confirmedSession.meetingLink}</a>
                  </div>
                </div>

                <Button variant="primary" style={{ width: '100%' }} onClick={handleCloseModal}>
                  View on Dashboard / Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {bookingError && (
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#FCA5A5',
                      fontSize: '0.85rem',
                    }}
                  >
                    {bookingError}
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)' }}>
                  <img
                    src={bookingMentor.avatar}
                    alt={bookingMentor.name}
                    style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{bookingMentor.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{bookingMentor.title} • {bookingMentor.companyOrDept}</div>
                  </div>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Discussion Focus / Topic *</label>
                  <select
                    value={bookingTopic}
                    onChange={(e) => setBookingTopic(e.target.value)}
                    className="form-select"
                  >
                    <option value="Resume & Portfolio Review">Resume & Portfolio Review</option>
                    <option value="System Design & Technical Architecture">System Design & Technical Architecture</option>
                    <option value="Mock Coding Interview Prep">Mock Coding Interview Prep</option>
                    <option value="Graduate School & Research Advice">Graduate School & Research Advice</option>
                    <option value="Startup & Product Strategy">Startup & Product Strategy</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Select Date *</label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Time Slot *</label>
                    <select
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="form-select"
                    >
                      <option value="04:00 PM - 04:45 PM">04:00 PM - 04:45 PM</option>
                      <option value="05:00 PM - 05:45 PM">05:00 PM - 05:45 PM</option>
                      <option value="06:30 PM - 07:15 PM">06:30 PM - 07:15 PM</option>
                      <option value="08:00 PM - 08:45 PM">08:00 PM - 08:45 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Brief Notes / Context (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Provide a GitHub repository link, capstone question, or specific goals for the session..."
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#38BDF8' }}>
                  <Clock size={14} /> 45-minute virtual session over Google Meet
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <Button type="button" variant="secondary" onClick={handleCloseModal} style={{ flex: 1 }}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="glow"
                    isLoading={isSubmittingBooking}
                    disabled={isSubmittingBooking}
                    style={{ flex: 2 }}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </form>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};
