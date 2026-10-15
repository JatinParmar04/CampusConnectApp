import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Eye, EyeOff, Lock, Mail, User as UserIcon, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../types/auth.types';

export interface AuthPageProps {
  onSuccess: (redirectTarget?: string) => void;
  initialMode?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onSuccess,
  initialMode = 'login',
}) => {
  const { login, register, error, isLoading, clearError } = useAuth();
  const location = useLocation();
  const locationState = location.state as { from?: string; message?: string } | undefined;
  const redirectMessage = locationState?.message;
  const redirectFrom = locationState?.from;

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [year, setYear] = useState('3rd Year');
  const [role, setRole] = useState<UserRole>('student');
  const [rememberMe, setRememberMe] = useState(true);

  // Client validation feedback
  const [clientError, setClientError] = useState<string | null>(null);

  // Password strength calculation
  const getPasswordStrength = (pass: string): { score: number; label: string; color: string } => {
    if (!pass) return { score: 0, label: 'None', color: '#64748B' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score: 1, label: 'Weak', color: '#EF4444' };
    if (score <= 4) return { score: 2, label: 'Good', color: '#F59E0B' };
    return { score: 3, label: 'Strong', color: '#10B981' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClientError(null);
    clearError();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setClientError('Please enter your university email address.');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setClientError('Please enter a valid email format (e.g., student@university.edu).');
      return;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setClientError('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setClientError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setClientError('Passwords do not match.');
        return;
      }

      const success = await register({
        name,
        email,
        password,
        department,
        year,
        role,
      });

      if (success) {
        onSuccess(redirectFrom);
      }
    } else {
      const success = await login({
        email,
        password,
        rememberMe,
      });

      if (success) {
        onSuccess(redirectFrom);
      }
    }
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '1040px' }}>
        <div
          className="glass-panel"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          }}
        >
          {/* Left Collegiate Showcase Panel */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
              padding: '48px 40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="auth-showcase-panel"
          >
            {/* Background Glow */}
            <div
              style={{
                position: 'absolute',
                top: '-30%',
                right: '-30%',
                width: '350px',
                height: '350px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
              }}
            />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                  }}
                >
                  🎓
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  CampusConnect
                </span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#E0E7FF',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '16px',
                }}
              >
                <Sparkles size={14} /> Production MongoDB Auth
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '16px' }}>
                Empowering the next generation of collegiate leaders.
              </h2>
              <p style={{ color: '#C7D2FE', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Secure, end-to-end tokenized authentication directly connected to MongoDB.
              </p>
            </div>

            {/* Testimonials & Features */}
            <div style={{ marginTop: '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#E0E7FF', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={16} color="#34D399" /> Instant RSVP pass generation
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#E0E7FF', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={16} color="#34D399" /> Verified alumni mentorship matching
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#E0E7FF', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={16} color="#34D399" /> Student group management tools
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <p style={{ fontSize: '0.85rem', color: '#F8FAFC', fontStyle: 'italic', marginBottom: '8px' }}>
                  "CampusConnect made discovering hackathons and finding my robotics club completely effortless."
                </p>
                <div style={{ fontSize: '0.78rem', color: '#C7D2FE', fontWeight: 600 }}>
                  — Aarav S., Senior Computer Science Student
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div style={{ padding: '48px 40px', background: '#0F1524' }}>
            {/* Mode Switch Tabs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '4px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '28px',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setClientError(null);
                  clearError();
                }}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: mode === 'login' ? '#FFFFFF' : '#94A3B8',
                  background:
                    mode === 'login'
                      ? 'linear-gradient(135deg, #4F46E5, #6366F1)'
                      : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setClientError(null);
                  clearError();
                }}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: mode === 'register' ? '#FFFFFF' : '#94A3B8',
                  background:
                    mode === 'register'
                      ? 'linear-gradient(135deg, #4F46E5, #6366F1)'
                      : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                Create Account
              </button>
            </div>

            {/* Action Required Notice for Protected Features */}
            {redirectMessage && (
              <div
                className="animate-fade-in"
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  color: '#FDE68A',
                  fontSize: '0.86rem',
                  lineHeight: 1.5,
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <Lock size={18} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#FCD34D', marginBottom: '2px' }}>
                    Authentication Required
                  </div>
                  <div>{redirectMessage}</div>
                </div>
              </div>
            )}

            {/* Error Banners */}
            {(clientError || error) && (
              <div
                className="animate-fade-in"
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#FCA5A5',
                  fontSize: '0.85rem',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Shield size={16} color="#EF4444" />
                <span>{clientError || error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {mode === 'register' && (
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Full Name *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '40px' }}
                    />
                    <UserIcon
                      size={18}
                      style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }}
                    />
                  </div>
                </div>
              )}

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">University Email *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '40px' }}
                  />
                  <Mail
                    size={18}
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }}
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '10px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Year</label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="form-select"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Postgrad">Postgrad</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="form-select"
                    >
                      <option value="student">Student</option>
                      <option value="mentor">Mentor</option>
                      <option value="organizer">Organizer</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="form-group" style={{ margin: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="form-label">Password *</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      style={{ fontSize: '0.75rem', color: '#818CF8', background: 'none', border: 'none', cursor: 'pointer' }}
                      onClick={() => alert('Demo password reset instruction sent to your collegiate email.')}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '40px', paddingRight: '40px' }}
                  />
                  <Lock
                    size={18}
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#64748B',
                      cursor: 'pointer',
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Password Strength Meter (Shown during registration) */}
                {mode === 'register' && password && (
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: strength.color, fontWeight: 600, marginBottom: '4px' }}>
                      <span>Password Strength</span>
                      <span>{strength.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '4px', height: '4px' }}>
                      <div style={{ flex: 1, borderRadius: '2px', background: strength.score >= 1 ? strength.color : 'rgba(255,255,255,0.1)' }} />
                      <div style={{ flex: 1, borderRadius: '2px', background: strength.score >= 2 ? strength.color : 'rgba(255,255,255,0.1)' }} />
                      <div style={{ flex: 1, borderRadius: '2px', background: strength.score >= 3 ? strength.color : 'rgba(255,255,255,0.1)' }} />
                    </div>
                  </div>
                )}
              </div>

              {mode === 'register' && (
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Confirm Password *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '40px' }}
                    />
                    <Lock
                      size={18}
                      style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }}
                    />
                  </div>
                </div>
              )}

              {mode === 'login' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#94A3B8' }}>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: '#6366F1' }}
                  />
                  <label htmlFor="rememberMe" style={{ cursor: 'pointer' }}>Remember this device for 30 days</label>
                </div>
              )}

              <Button
                type="submit"
                variant="glow"
                size="lg"
                isLoading={isLoading}
                style={{ width: '100%', marginTop: '8px' }}
              >
                {mode === 'login' ? 'Sign In to CampusConnect' : 'Create My Account'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 868px) {
          .glass-panel {
            grid-template-columns: 1fr !important;
          }
          .auth-showcase-panel {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
