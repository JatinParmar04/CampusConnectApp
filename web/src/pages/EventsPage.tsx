import React, { useState, useMemo } from 'react';
import { EventItem, EventCategory } from '../types/event.types';
import { EventCard } from '../components/events/EventCard';
import { Search, Calendar, Filter, X, RotateCcw } from 'lucide-react';
import { Button } from '../components/common/Button';

export interface EventsPageProps {
  events: EventItem[];
  onRegisterEvent: (event: EventItem) => void;
  onSelectEvent?: (event: EventItem) => void;
  registeredEventIds: string[];
}

export const EventsPage: React.FC<EventsPageProps> = ({
  events,
  onRegisterEvent,
  onSelectEvent,
  registeredEventIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');

  const categories: EventCategory[] = [
    'All',
    'Hackathon',
    'Workshop',
    'Tech',
    'Cultural',
    'Sports',
    'Seminar',
  ];

  // Compound filter: search query AND selected category simultaneously
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        evt.title.toLowerCase().includes(query) ||
        evt.description.toLowerCase().includes(query) ||
        (evt.fullDetails && evt.fullDetails.toLowerCase().includes(query)) ||
        evt.venue.toLowerCase().includes(query) ||
        evt.organizer.name.toLowerCase().includes(query) ||
        evt.tags.some((t) => t.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === 'All' || evt.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  const hasActiveFilters = searchQuery.trim().length > 0 || selectedCategory !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container">
        {/* Header Title & Subtext */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#A5B4FC',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '8px',
            }}
          >
            <Calendar size={16} /> Campus Discoverability
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '10px' }}>
            Explore Upcoming <span className="gradient-text">Campus Events</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1rem', maxWidth: '640px' }}>
            Filter by domain, click any card to view the full agenda and format, or register
            directly for hackathons, cultural galas, and tournaments.
          </p>
        </div>

        {/* Compound Filter & Search Bar */}
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
          {/* Search Input with Clear Button */}
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder="Search by event title, keyword, venue, or tag (e.g. AI, Music, Futsal)..."
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

          {/* Category Filter Pills & Reset Button */}
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
              <span
                style={{
                  fontSize: '0.82rem',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginRight: '4px',
                  flexShrink: 0,
                }}
              >
                <Filter size={14} /> Filter:
              </span>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
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
                        ? 'linear-gradient(135deg, #4F46E5, #6366F1)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected
                        ? '1px solid rgba(99, 102, 241, 0.5)'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    {cat}
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
                  transition: 'background 0.2s',
                }}
              >
                <RotateCcw size={13} /> Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Counter Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            fontSize: '0.9rem',
            color: '#94A3B8',
          }}
        >
          <span>
            Showing <strong style={{ color: '#FFFFFF' }}>{filteredEvents.length}</strong> events
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </span>
          <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
            Tip: Click any event card to view full details & schedule
          </span>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="cards-grid">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={onRegisterEvent}
                onSelectEvent={onSelectEvent}
                isRegistered={registeredEventIds.includes(event.id)}
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
            <Calendar size={48} color="#64748B" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
              No Events Found Matching Your Filter
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 20px' }}>
              We couldn't find any activities matching {searchQuery ? `"${searchQuery}"` : ''} in the{' '}
              {selectedCategory} category.
            </p>
            <Button variant="primary" onClick={handleResetFilters}>
              <RotateCcw size={14} /> Clear Filters & View All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
