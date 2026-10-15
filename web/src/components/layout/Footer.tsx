import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Globe, Share2, MessageCircle, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(9, 13, 22, 0.95)',
        paddingTop: '60px',
        paddingBottom: '40px',
        marginTop: '60px',
      }}
    >
      <div className="container">
        <div className="bento-grid" style={{ marginBottom: '40px' }}>
          {/* Brand Column */}
          <div className="bento-col-4">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                }}
              >
                🎓
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                }}
              >
                Campus<span className="gradient-text">Connect</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '20px', lineHeight: 1.6 }}>
              The all-in-one engagement ecosystem empowering students to discover campus life,
              lead breakthrough student groups, and advance through 1-on-1 industry mentorship.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Campus Portal"
                className="btn btn-ghost"
                style={{ padding: '8px', borderRadius: '50%' }}
              >
                <Globe size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Community Feed"
                className="btn btn-ghost"
                style={{ padding: '8px', borderRadius: '50%' }}
              >
                <Share2 size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Discussion"
                className="btn btn-ghost"
                style={{ padding: '8px', borderRadius: '50%' }}
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="bento-col-4" style={{ paddingLeft: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FFFFFF', marginBottom: '16px' }}>
              Explore Campus
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <Link
                to="/events"
                style={{ textAlign: 'left', color: '#94A3B8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                Upcoming Events & Hackathons
              </Link>
              <Link
                to="/mentors"
                style={{ textAlign: 'left', color: '#94A3B8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                Alumni & Faculty Mentor Directory
              </Link>
              <Link
                to="/clubs"
                style={{ textAlign: 'left', color: '#94A3B8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                Student Clubs & Societies
              </Link>
              <Link
                to="/dashboard"
                style={{ textAlign: 'left', color: '#94A3B8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                My Student Dashboard
              </Link>
            </div>
          </div>

          {/* Academic & University Resources */}
          <div className="bento-col-4">
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FFFFFF', marginBottom: '16px' }}>
              Campus Guidelines
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#94A3B8' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Student Code of Conduct <ExternalLink size={14} />
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Club Registration Handbook <ExternalLink size={14} />
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Event Safety & Space Booking <ExternalLink size={14} />
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Academic Calendar 2026-27 <ExternalLink size={14} />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.85rem',
            color: '#64748B',
          }}
        >
          <div>
            © 2026 CampusConnect Platform. Crafted with{' '}
            <Heart size={14} style={{ display: 'inline', color: '#F43F5E', verticalAlign: 'middle' }} /> for the
            Collegiate Community.
          </div>
          <div>Strict TypeScript & MongoDB Production Architecture</div>
        </div>
      </div>
    </footer>
  );
};
