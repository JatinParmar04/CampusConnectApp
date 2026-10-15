import React from 'react';
import { Link } from 'react-router-dom';
import { EventItem } from '../types/event.types';
import { EventCard } from '../components/events/EventCard';
import { Button } from '../components/common/Button';
import {
  Calendar,
  Compass,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export interface LandingPageProps {
  events: EventItem[];
  onRegisterEvent: (event: EventItem) => void;
  registeredEventIds: string[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  events,
  onRegisterEvent,
  registeredEventIds,
}) => {
  const featuredEvents = events.filter((e) => e.isFeatured).slice(0, 3);

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container">
        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 64px' }}>
          {/* Collegiate Hub Badge */}
          <div style={{ display: 'inline-flex', marginBottom: '20px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '9999px',
                background: 'rgba(99, 102, 241, 0.12)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: '#A5B4FC',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              <Sparkles size={16} /> Campus Engagement Platform 2026
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-0.03em',
            }}
          >
            Connect, Discover & <span className="gradient-text">Excel Across Campus</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#94A3B8',
              lineHeight: 1.6,
              marginBottom: '32px',
            }}
          >
            Discover upcoming hackathons, book 1-on-1 alumni mentorship, build student
            communities, and manage all your campus passes in one unified space.
          </p>

          {/* Primary Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '48px',
            }}
          >
            <Link to="/events" style={{ textDecoration: 'none' }}>
              <Button
                variant="glow"
                size="lg"
                style={{ padding: '14px 28px', fontSize: '1.05rem' }}
              >
                <Calendar size={18} /> Explore Campus Events
              </Button>
            </Link>
            <Link to="/mentors" style={{ textDecoration: 'none' }}>
              <Button
                variant="secondary"
                size="lg"
                style={{ padding: '14px 28px', fontSize: '1.05rem' }}
              >
                <Compass size={18} /> Find a Mentor <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

          {/* Live University Metric Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px',
              textAlign: 'center',
            }}
          >
            <div
              className="glass-panel"
              style={{ padding: '16px', borderRadius: '14px' }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF' }} className="gradient-text">
                120+
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '4px' }}>
                Annual Events
              </div>
            </div>

            <div
              className="glass-panel"
              style={{ padding: '16px', borderRadius: '14px' }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38BDF8' }}>
                50+
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '4px' }}>
                Active Student Clubs
              </div>
            </div>

            <div
              className="glass-panel"
              style={{ padding: '16px', borderRadius: '14px' }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34D399' }}>
                4.8k
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '4px' }}>
                Registered Students
              </div>
            </div>

            <div
              className="glass-panel"
              style={{ padding: '16px', borderRadius: '14px' }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FCD34D' }}>
                98%
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '4px' }}>
                Student Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid Feature Section */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
              Everything You Need for <span className="gradient-text">Campus Life</span>
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              Designed to connect collegiate talent with high-impact opportunities, groups, and guidance.
            </p>
          </div>

          <div className="bento-grid">
            {/* Bento Card 1: Event Discovery */}
            <div
              className="glass-panel bento-col-8"
              style={{
                padding: '32px',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))',
              }}
            >
              <div style={{ maxWidth: '420px', position: 'relative', zIndex: 2 }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(99, 102, 241, 0.2)',
                    color: '#A5B4FC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <Calendar size={22} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '10px' }}>
                  Intelligent Event Discovery & Fast Passes
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  Filter through hackathons, cultural festivals, academic seminars, and sports tournaments.
                  Register individually or with your team in seconds with instant QR passes.
                </p>
                <Link to="/events" style={{ textDecoration: 'none' }}>
                  <Button variant="outline" size="sm">
                    Browse All Events <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>

              <div
                style={{
                  position: 'absolute',
                  right: '-20px',
                  bottom: '-20px',
                  opacity: 0.15,
                  pointerEvents: 'none',
                }}
              >
                <Calendar size={220} />
              </div>
            </div>

            {/* Bento Card 2: Mentorship */}
            <div
              className="glass-panel bento-col-4"
              style={{
                padding: '32px',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(6, 182, 212, 0.2)',
                  color: '#67E8F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Compass size={22} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px' }}>
                1-on-1 Alumni Mentorship
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Get code reviews, resume guidance, and interview prep directly from alumni working at top tech firms.
              </p>
              <Link to="/mentors" style={{ textDecoration: 'none' }}>
                <Button variant="outline" size="sm">
                  View Mentors <ArrowRight size={14} />
                </Button>
              </Link>
            </div>

            {/* Bento Card 3: Student Groups */}
            <div
              className="glass-panel bento-col-4"
              style={{
                padding: '32px',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#6EE7B7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Users size={22} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px' }}>
                Student Clubs &amp; Hubs
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Find your tribe across robotics, design, debate, sports, and entrepreneurship cells.
              </p>
              <Link to="/clubs" style={{ textDecoration: 'none' }}>
                <Button variant="outline" size="sm">
                  Explore Clubs <ArrowRight size={14} />
                </Button>
              </Link>
            </div>

            {/* Bento Card 4: Personalized Dashboard */}
            <div
              className="glass-panel bento-col-8"
              style={{
                padding: '32px',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(20, 26, 45, 0.8), rgba(30, 41, 59, 0.6))',
              }}
            >
              <div style={{ maxWidth: '440px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(245, 158, 11, 0.2)',
                    color: '#FCD34D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <Award size={22} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '10px' }}>
                  Your Personalized Collegiate Dashboard
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  Track your booked sessions, upcoming event calendar, membership statuses, and digital badges with instant MongoDB syncing.
                </p>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <Button variant="outline" size="sm">
                    Open Dashboard <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Campus Highlights Section */}
        <div style={{ marginBottom: '80px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '32px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#38BDF8',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                <TrendingUp size={16} /> Campus Highlights
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
                Trending <span className="gradient-text">Activities This Week</span>
              </h2>
            </div>
            <Link to="/events" style={{ textDecoration: 'none' }}>
              <Button variant="secondary">
                View All {events.length} Events <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="cards-grid">
            {featuredEvents.map((evt) => (
              <EventCard
                key={evt.id}
                event={evt}
                onRegister={onRegisterEvent}
                isRegistered={registeredEventIds.includes(evt.id)}
              />
            ))}
          </div>
        </div>

        {/* Final Conversion Call To Action */}
        <div
          className="glass-panel"
          style={{
            padding: '50px 32px',
            borderRadius: '24px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.25) 0%, rgba(124, 58, 237, 0.25) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
          }}
        >
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: '#FFFFFF',
                color: '#4F46E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              <ShieldCheck size={28} />
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '14px', color: '#FFFFFF' }}>
              Ready to Shape Your University Journey?
            </h2>
            <p style={{ color: '#E2E8F0', fontSize: '1rem', lineHeight: 1.6, marginBottom: '32px' }}>
              Join thousands of students who discover events, connect with mentors, and lead campus clubs every semester.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/events" style={{ textDecoration: 'none' }}>
                <Button
                  variant="glow"
                  size="lg"
                  style={{ background: '#FFFFFF', color: '#1E1B4B', fontWeight: 700 }}
                >
                  Get Started Now
                </Button>
              </Link>
              <Link to="/clubs" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outline"
                  size="lg"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.4)', color: '#FFFFFF' }}
                >
                  Explore Student Clubs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
