import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { EventsPage } from './pages/EventsPage';
import { DashboardPage } from './pages/DashboardPage';
import { MentorsPage } from './pages/MentorsPage';
import { GroupsPage } from './pages/GroupsPage';
import { RegistrationModal } from './components/events/RegistrationModal';
import { EventDetailsModal } from './components/events/EventDetailsModal';
import { EventItem, RegistrationPayload } from './types/event.types';
import { BookedSession } from './types/mentor.types';
import { GroupItem } from './types/group.types';
import { mockEvents } from './data/mockEvents';
import { mockMentors } from './data/mockMentors';
import { mockGroups } from './data/mockGroups';
import { CheckCircle2 } from 'lucide-react';

const REGISTRATIONS_STORAGE_KEY = 'campusconnect_registrations';
const JOINED_GROUPS_STORAGE_KEY = 'campusconnect_joined_groups';
const BOOKED_SESSIONS_STORAGE_KEY = 'campusconnect_mentor_sessions';

export const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const [events, setEvents] = useState<EventItem[]>(mockEvents);
  const [groups, setGroups] = useState<GroupItem[]>(mockGroups);

  // Modal States
  const [registrationModalEvent, setRegistrationModalEvent] = useState<EventItem | null>(null);
  const [detailsModalEvent, setDetailsModalEvent] = useState<EventItem | null>(null);

  // Load registered events from localStorage or provide initial demo registration
  const [registeredEvents, setRegisteredEvents] = useState<RegistrationPayload[]>(() => {
    const saved = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
    if (saved !== null) {
      try {
        return JSON.parse(saved) as RegistrationPayload[];
      } catch {
        return [];
      }
    }
    return [
      {
        eventId: 'evt-001',
        eventTitle: 'HackCampus 2026: 36h Collegiate Hackathon',
        registrationType: 'team',
        participantName: 'Alex Mercer',
        email: 'alex.mercer@university.edu',
        studentId: 'STU-2024-8842',
        department: 'Computer Science & Engineering',
        year: '3rd Year',
        phone: '+1 (555) 019-2834',
        teamName: 'ByteBuilders',
        agreedToTerms: true,
        registeredAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
    ];
  });

  // Load joined groups from localStorage
  const [joinedGroupIds, setJoinedGroupIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(JOINED_GROUPS_STORAGE_KEY);
    if (saved !== null) {
      try {
        return JSON.parse(saved) as string[];
      } catch {
        return [];
      }
    }
    return ['grp-001', 'grp-004'];
  });

  // Load booked mentorship sessions from localStorage
  const [bookedSessions, setBookedSessions] = useState<BookedSession[]>(() => {
    const saved = localStorage.getItem(BOOKED_SESSIONS_STORAGE_KEY);
    if (saved !== null) {
      try {
        return JSON.parse(saved) as BookedSession[];
      } catch {
        return [];
      }
    }
    return [
      {
        id: 'sess-init-001',
        mentorId: 'mnt-001',
        mentorName: 'Aarav Sharma',
        mentorAvatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        mentorRole: 'Senior Distributed Systems Engineer • Ex-Google Cloud',
        date: '2026-10-28',
        timeSlot: '05:00 PM - 05:45 PM',
        topic: 'System Design & Technical Architecture',
        meetingLink: 'https://meet.google.com/ccc-ment-4892',
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
      },
    ];
  });

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Strip any old #hash from address bar and redirect cleanly to dedicated page routes
  useEffect(() => {
    if (window.location.hash) {
      const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      // Cleanly clear hash from the browser address bar
      window.history.replaceState(null, '', window.location.pathname);
      if (rawHash === 'events') navigate('/events', { replace: true });
      else if (rawHash === 'groups' || rawHash === 'clubs' || rawHash === 'club') navigate('/clubs', { replace: true });
      else if (rawHash === 'mentors') navigate('/mentors', { replace: true });
      else if (rawHash === 'dashboard') navigate('/dashboard', { replace: true });
      else if (rawHash === 'auth' || rawHash === 'login') navigate('/auth', { replace: true });
    }
  }, [navigate]);

  // Sync registrations to localStorage
  useEffect(() => {
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(registeredEvents));
  }, [registeredEvents]);

  // Sync joined groups to localStorage
  useEffect(() => {
    localStorage.setItem(JOINED_GROUPS_STORAGE_KEY, JSON.stringify(joinedGroupIds));
  }, [joinedGroupIds]);

  // Sync booked mentorship sessions to localStorage
  useEffect(() => {
    localStorage.setItem(BOOKED_SESSIONS_STORAGE_KEY, JSON.stringify(bookedSessions));
  }, [bookedSessions]);

  const registeredEventIds = registeredEvents.map((r) => r.eventId);

  // Initiate Event Registration with Auth Check
  const handleInitiateRegistration = (evt: EventItem) => {
    if (!isAuthenticated) {
      showToast('Please sign in or create an account to register for events.');
      navigate('/auth', {
        state: {
          from: location.pathname,
          message: 'Please sign in or create an account to register for campus events and hackathons.',
        },
      });
      return;
    }
    setRegistrationModalEvent(evt);
  };

  // Handle Event Registration Completion
  const handleRegistrationComplete = (registration: RegistrationPayload) => {
    setRegisteredEvents((prev) => [registration, ...prev]);

    // Increment registered count on the event
    setEvents((prev) =>
      prev.map((e) =>
        e.id === registration.eventId
          ? { ...e, registeredCount: Math.min(e.capacity, e.registeredCount + 1) }
          : e
      )
    );

    showToast(`Successfully registered for ${registration.eventTitle}!`);
  };

  // Handle RSVP Cancelation
  const handleCancelRegistration = (eventId: string) => {
    const target = registeredEvents.find((r) => r.eventId === eventId);
    setRegisteredEvents((prev) => prev.filter((r) => r.eventId !== eventId));
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) }
          : e
      )
    );
    showToast(`Registration cancelled for ${target?.eventTitle ?? 'event'}.`);
  };

  // Handle Mentorship Booking
  const handleBookSession = (session: BookedSession) => {
    setBookedSessions((prev) => [session, ...prev]);
    showToast(`Mentorship session scheduled with ${session.mentorName}!`);
  };

  // Handle Cancel Mentorship Session
  const handleCancelSession = (sessionId: string) => {
    setBookedSessions((prev) => prev.filter((s) => s.id !== sessionId));
    showToast('Mentorship call cancelled.');
  };

  // Toggle Join Group & sync dynamic count
  const handleToggleJoinGroup = (groupId: string) => {
    if (!isAuthenticated) {
      showToast('Please sign in to join student groups.');
      navigate('/auth', {
        state: {
          from: '/clubs',
          message: 'Please sign in or create an account to join student clubs and societies.',
        },
      });
      return;
    }

    const isAlreadyJoined = joinedGroupIds.includes(groupId);

    if (isAlreadyJoined) {
      setJoinedGroupIds((prev) => prev.filter((id) => id !== groupId));
      setGroups((prev) =>
        prev.map((g) =>
          g.id === groupId
            ? { ...g, memberCount: Math.max(0, g.memberCount - 1), isJoined: false }
            : g
        )
      );
      showToast('Left student group.');
    } else {
      setJoinedGroupIds((prev) => [...prev, groupId]);
      setGroups((prev) =>
        prev.map((g) =>
          g.id === groupId
            ? { ...g, memberCount: g.memberCount + 1, isJoined: true }
            : g
        )
      );
      showToast('Joined student group! Welcome aboard.');
    }
  };

  // Groups that the student has joined
  const joinedGroupsList = groups.filter((g) => joinedGroupIds.includes(g.id));

  // Centralized Navigator supporting both slugs and full paths
  const handleNavigate = (dest: string) => {
    switch (dest) {
      case 'landing':
      case '/':
        navigate('/');
        break;
      case 'events':
      case '/events':
        navigate('/events');
        break;
      case 'groups':
      case 'clubs':
      case 'club':
      case '/groups':
      case '/clubs':
      case '/club':
        navigate('/clubs');
        break;
      case 'mentors':
      case '/mentors':
        navigate('/mentors');
        break;
      case 'dashboard':
      case '/dashboard':
        navigate('/dashboard');
        break;
      case 'auth':
      case 'login':
      case '/auth':
      case '/login':
        navigate('/auth');
        break;
      default:
        navigate(dest);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Glass Navbar */}
      <Navbar />

      {/* Main View Area */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                events={events}
                onRegisterEvent={handleInitiateRegistration}
                registeredEventIds={registeredEventIds}
              />
            }
          />
          <Route
            path="/events"
            element={
              <EventsPage
                events={events}
                onRegisterEvent={handleInitiateRegistration}
                onSelectEvent={(evt) => setDetailsModalEvent(evt)}
                registeredEventIds={registeredEventIds}
              />
            }
          />
          <Route
            path="/clubs"
            element={
              <GroupsPage
                groups={groups}
                joinedGroupIds={joinedGroupIds}
                onToggleJoinGroup={handleToggleJoinGroup}
              />
            }
          />
          {/* Path Aliases requested by user */}
          <Route path="/club" element={<Navigate to="/clubs" replace />} />
          <Route path="/groups" element={<Navigate to="/clubs" replace />} />

          <Route
            path="/mentors"
            element={
              <MentorsPage
                mentors={mockMentors}
                onBookSession={handleBookSession}
                bookedSessions={bookedSessions}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage
                  registeredEvents={registeredEvents}
                  bookedSessions={bookedSessions}
                  joinedGroups={joinedGroupsList}
                  onCancelRegistration={handleCancelRegistration}
                  onCancelSession={handleCancelSession}
                  onLeaveGroup={handleToggleJoinGroup}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth"
            element={
              <AuthPage
                onSuccess={(targetDest) => {
                  handleNavigate(targetDest || '/dashboard');
                  showToast('Authenticated successfully! Welcome back.');
                }}
              />
            }
          />
          <Route path="/login" element={<Navigate to="/auth" replace />} />
          <Route path="/register" element={<Navigate to="/auth" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Event Details Modal */}
      <EventDetailsModal
        isOpen={Boolean(detailsModalEvent)}
        onClose={() => setDetailsModalEvent(null)}
        event={detailsModalEvent}
        onRegister={(evt) => {
          setDetailsModalEvent(null);
          handleInitiateRegistration(evt);
        }}
        isRegistered={
          detailsModalEvent
            ? registeredEventIds.includes(detailsModalEvent.id)
            : false
        }
      />

      {/* Event Registration Modal with Terms & Duplicate Prevention */}
      <RegistrationModal
        isOpen={Boolean(registrationModalEvent)}
        onClose={() => setRegistrationModalEvent(null)}
        event={registrationModalEvent}
        onComplete={handleRegistrationComplete}
        isAlreadyRegistered={
          registrationModalEvent
            ? registeredEventIds.includes(registrationModalEvent.id)
            : false
        }
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          className="animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(12px)',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 9999,
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          <CheckCircle2 size={18} color="#34D399" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Collegiate Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
