import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Calendar,
  Users,
  Compass,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: 'landing', path: '/', label: 'Home', icon: <Sparkles size={16} /> },
    { id: 'events', path: '/events', label: 'Events', icon: <Calendar size={16} /> },
    { id: 'mentors', path: '/mentors', label: 'Mentors', icon: <Compass size={16} /> },
    { id: 'clubs', path: '/clubs', label: 'Clubs & Groups', icon: <Users size={16} /> },
    ...(isAuthenticated
      ? [{ id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> }]
      : []),
  ];

  const isItemActive = (path: string): boolean => {
    if (path === '/') return location.pathname === '/';
    if (path === '/clubs') {
      return (
        location.pathname.startsWith('/clubs') ||
        location.pathname.startsWith('/club') ||
        location.pathname.startsWith('/groups')
      );
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="glass-navbar">
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
        }}
      >
        {/* Brand Logo Link */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
              fontSize: '1.25rem',
            }}
          >
            🎓
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
              }}
            >
              Campus<span className="gradient-text">Connect</span>
            </span>
            <div
              style={{
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#94A3B8',
                lineHeight: 1,
              }}
            >
              Student Hub
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links (Real Links) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '4px',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const active = isItemActive(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                  color: active ? '#FFFFFF' : '#94A3B8',
                  background: active
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(124, 58, 237, 0.3))'
                    : 'transparent',
                  border: active
                    ? '1px solid rgba(99, 102, 241, 0.4)'
                    : '1px solid transparent',
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop User Auth Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-auth">
          {isAuthenticated && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link
                to="/dashboard"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  textDecoration: 'none',
                }}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    background: '#334155',
                  }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF' }}>
                    {user.name.split(' ')[0]}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{user.department.split('&')[0]}</div>
                </div>
              </Link>
              <button
                onClick={logout}
                title="Sign Out"
                className="btn btn-ghost"
                style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="btn btn-primary"
              style={{
                borderRadius: '9999px',
                padding: '8px 18px',
                fontSize: '0.88rem',
                textDecoration: 'none',
              }}
            >
              <LogIn size={16} />
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="mobile-toggle"
          style={{
            display: 'none',
            background: 'rgba(255, 255, 255, 0.06)',
            border: 'none',
            color: '#FFFFFF',
            padding: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="glass-panel"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(9, 13, 22, 0.98)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {navItems.map((item) => {
            const active = isItemActive(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  textDecoration: 'none',
                  color: active ? '#FFFFFF' : '#94A3B8',
                  background: active
                    ? 'rgba(99, 102, 241, 0.2)'
                    : 'rgba(255, 255, 255, 0.03)',
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}

          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            {isAuthenticated && user ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-outline"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}
              >
                <LogIn size={18} /> Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 868px) {
          .desktop-nav, .desktop-auth {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};
