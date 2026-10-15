import React, { useState, useEffect } from 'react';
import { EventItem, RegistrationPayload, TeamMember } from '../../types/event.types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  User,
  CheckCircle2,
  QrCode,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  AlertCircle,
  ShieldCheck,
  Lock,
} from 'lucide-react';

export interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
  onComplete: (registration: RegistrationPayload) => void;
  isAlreadyRegistered?: boolean;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  event,
  onComplete,
  isAlreadyRegistered = false,
}) => {
  const { user } = useAuth();

  const [registrationType, setRegistrationType] = useState<'individual' | 'team'>('individual');
  const [participantName, setParticipantName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [studentId, setStudentId] = useState('STU-2024-8842');
  const [department, setDepartment] = useState(user?.department ?? 'Computer Science & Engineering');
  const [year, setYear] = useState(user?.year ?? '3rd Year');
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [specialRequests, setSpecialRequests] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Team fields
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: '', studentId: '', email: '' },
  ]);

  // Validation errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Update user info whenever auth context changes
  useEffect(() => {
    if (user) {
      if (!participantName) setParticipantName(user.name);
      if (!email) setEmail(user.email);
      if (user.department) setDepartment(user.department);
      if (user.year) setYear(user.year);
    }
  }, [user]);

  if (!event) return null;

  const handleAddMember = () => {
    const maxTeammates = event.maxTeamSize ? event.maxTeamSize - 1 : 3;
    if (teamMembers.length < maxTeammates) {
      setTeamMembers((prev) => [
        ...prev,
        { id: String(Date.now()), name: '', studentId: '', email: '' },
      ]);
    }
  };

  const handleRemoveMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleMemberChange = (id: string, field: keyof TeamMember, value: string) => {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!participantName.trim()) {
      errors.participantName = 'Full name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'University email is required.';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email address (e.g., student@university.edu).';
    }

    if (!studentId.trim()) {
      errors.studentId = 'Student ID number is required.';
    }

    if (!phone.trim()) {
      errors.phone = 'Contact phone number is required.';
    }

    if (registrationType === 'team') {
      if (!teamName.trim()) {
        errors.teamName = 'Team name is required for team participation.';
      }

      teamMembers.forEach((member, idx) => {
        if (!member.name.trim()) {
          errors[`member_${member.id}_name`] = `Teammate #${idx + 2} name is required.`;
        }
        if (!member.studentId.trim()) {
          errors[`member_${member.id}_id`] = `Teammate #${idx + 2} student ID is required.`;
        }
      });
    }

    if (!agreedToTerms) {
      errors.agreedToTerms = 'You must agree to the event guidelines and participation terms to proceed.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAlreadyRegistered) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedTicketId = `CC-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2026`;
      setTicketId(generatedTicketId);

      const payload: RegistrationPayload = {
        eventId: event.id,
        eventTitle: event.title,
        registrationType,
        participantName: participantName.trim(),
        email: email.trim().toLowerCase(),
        studentId: studentId.trim(),
        department: department.trim(),
        year,
        phone: phone.trim(),
        specialRequests: specialRequests.trim() || undefined,
        teamName: registrationType === 'team' ? teamName.trim() : undefined,
        teamMembers: registrationType === 'team' ? teamMembers : undefined,
        agreedToTerms: true,
        registeredAt: new Date().toISOString(),
      };

      onComplete(payload);
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 700);
  };

  const handleResetAndClose = () => {
    setIsConfirmed(false);
    setFormErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={isConfirmed ? 'Registration Confirmed!' : `Register: ${event.title}`}
      maxWidth={isConfirmed ? '480px' : '620px'}
    >
      {isConfirmed ? (
        /* Confirmed Ticket Screen */
        <div style={{ textAlign: 'center', padding: '10px 0' }} className="animate-fade-in">
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

          <h4 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '6px', color: '#FFFFFF' }}>
            Registration Successful!
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '24px' }}>
            Your pass has been generated and synced with your student dashboard.
          </p>

          {/* Ticket Card Pass */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))',
              border: '1px dashed rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'left',
              marginBottom: '24px',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#A5B4FC', fontWeight: 700, textTransform: 'uppercase' }}>
                  {registrationType === 'team' ? `Team Pass: ${teamName}` : 'Individual Pass'}
                </span>
                <h5 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>
                  {event.title}
                </h5>
              </div>
              <div
                style={{
                  background: '#FFFFFF',
                  padding: '6px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <QrCode size={40} color="#0F172A" />
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={14} color="#38BDF8" /> {event.date} • {event.time}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} color="#38BDF8" /> {event.venue}
              </div>
              <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8' }}>
                <span>Attendee: <strong style={{ color: '#FFFFFF' }}>{participantName}</strong></span>
                <span>Ticket: <strong style={{ color: '#38BDF8' }}>{ticketId}</strong></span>
              </div>
            </div>
          </div>

          <Button variant="primary" style={{ width: '100%' }} onClick={handleResetAndClose}>
            Back to Events
          </Button>
        </div>
      ) : (
        /* Registration Form */
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Duplicate Registration Warning Banner */}
          {isAlreadyRegistered && (
            <div
              className="animate-fade-in"
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#FCA5A5',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Lock size={18} color="#EF4444" style={{ flexShrink: 0 }} />
              <div>
                <strong>Already Registered:</strong> You already have an active pass for this event.
                Duplicate registrations are disabled to preserve fair capacity.
              </div>
            </div>
          )}

          {/* Validation Error Banner */}
          {Object.keys(formErrors).length > 0 && (
            <div
              className="animate-fade-in"
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#FCA5A5',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertCircle size={16} color="#EF4444" />
              <span>Please resolve the errors highlighted below before submitting.</span>
            </div>
          )}

          {/* Individual vs Team Selector */}
          {event.isTeamEvent && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '4px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <button
                type="button"
                disabled={isAlreadyRegistered}
                onClick={() => setRegistrationType('individual')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: isAlreadyRegistered ? 'not-allowed' : 'pointer',
                  color: registrationType === 'individual' ? '#FFFFFF' : '#94A3B8',
                  background:
                    registrationType === 'individual'
                      ? 'linear-gradient(135deg, #4F46E5, #6366F1)'
                      : 'transparent',
                }}
              >
                <User size={16} /> Individual Pass
              </button>
              <button
                type="button"
                disabled={isAlreadyRegistered}
                onClick={() => setRegistrationType('team')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: isAlreadyRegistered ? 'not-allowed' : 'pointer',
                  color: registrationType === 'team' ? '#FFFFFF' : '#94A3B8',
                  background:
                    registrationType === 'team'
                      ? 'linear-gradient(135deg, #4F46E5, #6366F1)'
                      : 'transparent',
                }}
              >
                <Users size={16} /> Team Registration ({event.minTeamSize}-{event.maxTeamSize})
              </button>
            </div>
          )}

          {/* Primary Participant Information */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                disabled={isAlreadyRegistered}
                value={participantName}
                onChange={(e) => {
                  setParticipantName(e.target.value);
                  if (formErrors.participantName) {
                    setFormErrors((prev) => {
                      const updated = { ...prev };
                      delete updated.participantName;
                      return updated;
                    });
                  }
                }}
                className="form-input"
                placeholder="Alex Mercer"
                style={{
                  borderColor: formErrors.participantName ? '#EF4444' : undefined,
                }}
              />
              {formErrors.participantName && (
                <span style={{ fontSize: '0.75rem', color: '#EF4444' }}>
                  {formErrors.participantName}
                </span>
              )}
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Student ID Number *</label>
              <input
                type="text"
                disabled={isAlreadyRegistered}
                value={studentId}
                onChange={(e) => {
                  setStudentId(e.target.value);
                  if (formErrors.studentId) {
                    setFormErrors((prev) => {
                      const updated = { ...prev };
                      delete updated.studentId;
                      return updated;
                    });
                  }
                }}
                className="form-input"
                placeholder="STU-2024-XXXX"
                style={{
                  borderColor: formErrors.studentId ? '#EF4444' : undefined,
                }}
              />
              {formErrors.studentId && (
                <span style={{ fontSize: '0.75rem', color: '#EF4444' }}>
                  {formErrors.studentId}
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">University Email *</label>
              <input
                type="email"
                disabled={isAlreadyRegistered}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formErrors.email) {
                    setFormErrors((prev) => {
                      const updated = { ...prev };
                      delete updated.email;
                      return updated;
                    });
                  }
                }}
                className="form-input"
                placeholder="student@university.edu"
                style={{
                  borderColor: formErrors.email ? '#EF4444' : undefined,
                }}
              />
              {formErrors.email && (
                <span style={{ fontSize: '0.75rem', color: '#EF4444' }}>
                  {formErrors.email}
                </span>
              )}
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                disabled={isAlreadyRegistered}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (formErrors.phone) {
                    setFormErrors((prev) => {
                      const updated = { ...prev };
                      delete updated.phone;
                      return updated;
                    });
                  }
                }}
                className="form-input"
                placeholder="+1 (555) 000-0000"
                style={{
                  borderColor: formErrors.phone ? '#EF4444' : undefined,
                }}
              />
              {formErrors.phone && (
                <span style={{ fontSize: '0.75rem', color: '#EF4444' }}>
                  {formErrors.phone}
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Department / School</label>
              <input
                type="text"
                disabled={isAlreadyRegistered}
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Year of Study</label>
              <select
                disabled={isAlreadyRegistered}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="form-select"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>
          </div>

          {/* Team Fields when 'team' is selected */}
          {registrationType === 'team' && (
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Team Name *</label>
                <input
                  type="text"
                  disabled={isAlreadyRegistered}
                  value={teamName}
                  onChange={(e) => {
                    setTeamName(e.target.value);
                    if (formErrors.teamName) {
                      setFormErrors((prev) => {
                        const updated = { ...prev };
                        delete updated.teamName;
                        return updated;
                      });
                    }
                  }}
                  className="form-input"
                  placeholder="e.g. ByteBuilders"
                  style={{
                    borderColor: formErrors.teamName ? '#EF4444' : undefined,
                  }}
                />
                {formErrors.teamName && (
                  <span style={{ fontSize: '0.75rem', color: '#EF4444' }}>
                    {formErrors.teamName}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0' }}>
                  Team Members ({teamMembers.length + 1} / {event.maxTeamSize ?? 4})
                </span>
                {!isAlreadyRegistered && (
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="btn btn-outline"
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  >
                    <Plus size={14} /> Add Teammate
                  </button>
                )}
              </div>

              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr auto',
                    gap: '8px',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <div>
                    <input
                      type="text"
                      disabled={isAlreadyRegistered}
                      placeholder={`Teammate ${index + 2} Name`}
                      value={member.name}
                      onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                      className="form-input"
                      style={{
                        fontSize: '0.85rem',
                        padding: '8px 10px',
                        borderColor: formErrors[`member_${member.id}_name`] ? '#EF4444' : undefined,
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      disabled={isAlreadyRegistered}
                      placeholder="Student ID"
                      value={member.studentId}
                      onChange={(e) => handleMemberChange(member.id, 'studentId', e.target.value)}
                      className="form-input"
                      style={{
                        fontSize: '0.85rem',
                        padding: '8px 10px',
                        borderColor: formErrors[`member_${member.id}_id`] ? '#EF4444' : undefined,
                      }}
                    />
                  </div>
                  {teamMembers.length > 1 && !isAlreadyRegistered && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.id)}
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: 'none',
                        color: '#EF4444',
                        padding: '8px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Special Requests */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Special Accommodations / Dietary Notes (Optional)</label>
            <input
              type="text"
              disabled={isAlreadyRegistered}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="form-input"
              placeholder="e.g. Vegetarian meal, wheelchair access"
            />
          </div>

          {/* Mandatory Terms & Guidelines Agreement */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '10px',
              background: formErrors.agreedToTerms
                ? 'rgba(239, 68, 68, 0.08)'
                : 'rgba(255, 255, 255, 0.03)',
              border: formErrors.agreedToTerms
                ? '1px solid rgba(239, 68, 68, 0.4)'
                : '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <input
                type="checkbox"
                id="termsCheckbox"
                disabled={isAlreadyRegistered}
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  if (formErrors.agreedToTerms) {
                    setFormErrors((prev) => {
                      const updated = { ...prev };
                      delete updated.agreedToTerms;
                      return updated;
                    });
                  }
                }}
                style={{ marginTop: '3px', accentColor: '#6366F1', width: '16px', height: '16px' }}
              />
              <label
                htmlFor="termsCheckbox"
                style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.5, cursor: 'pointer' }}
              >
                <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'middle', color: '#38BDF8', marginRight: '4px' }} />
                I agree to the <strong>Campus Event Code of Conduct</strong> and acknowledge that attendance is subject to venue safety rules and honor code standards. *
              </label>
            </div>
            {formErrors.agreedToTerms && (
              <div style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '4px', paddingLeft: '26px' }}>
                {formErrors.agreedToTerms}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              style={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={isAlreadyRegistered ? 'outline' : 'glow'}
              isLoading={isSubmitting}
              disabled={isAlreadyRegistered || isSubmitting}
              style={{ flex: 2 }}
            >
              {isAlreadyRegistered
                ? 'Already Registered'
                : 'Complete & Confirm Registration'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
