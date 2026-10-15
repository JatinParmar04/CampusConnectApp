import React, { useState, useMemo } from 'react';
import { GroupItem, GroupCategory } from '../types/group.types';
import { GroupCard } from '../components/groups/GroupCard';
import { Button } from '../components/common/Button';
import { Search, Users, PlusCircle, X, RotateCcw } from 'lucide-react';

export interface GroupsPageProps {
  groups: GroupItem[];
  joinedGroupIds: string[];
  onToggleJoinGroup: (groupId: string) => void;
}

export const GroupsPage: React.FC<GroupsPageProps> = ({
  groups,
  joinedGroupIds,
  onToggleJoinGroup,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GroupCategory>('All');

  const categories: GroupCategory[] = [
    'All',
    'Tech & Coding',
    'Design & Creative',
    'Sports & Fitness',
    'Cultural & Arts',
    'Social Impact',
  ];

  // Compound filter: text search AND category simultaneously
  const filteredGroups = useMemo(() => {
    return groups.filter((g) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        g.name.toLowerCase().includes(query) ||
        g.description.toLowerCase().includes(query) ||
        g.leadName.toLowerCase().includes(query) ||
        g.tags.some((t) => t.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === 'All' || g.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [groups, searchQuery, selectedCategory]);

  const hasActiveFilters = searchQuery.trim().length > 0 || selectedCategory !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
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
              color: '#34D399',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '8px',
            }}
          >
            <Users size={16} /> Campus Communities
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '10px' }}>
            Discover Student <span className="gradient-text">Clubs & Societies</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1rem', maxWidth: '640px' }}>
            Join accredited student organizations, collaborate on semester projects, and participate
            in community meetups across tech, creative design, athletics, and social impact.
          </p>
        </div>

        {/* Filter & Search */}
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
          {/* Search with Clear */}
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder="Search clubs by name, keywords, or focus (e.g. Robotics, Figma, Marathon)..."
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

          {/* Categories & Reset */}
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
                        ? 'linear-gradient(135deg, #10B981, #059669)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected
                        ? '1px solid rgba(16, 185, 129, 0.5)'
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
                }}
              >
                <RotateCcw size={13} /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Counter & Status */}
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
            Showing <strong style={{ color: '#FFFFFF' }}>{filteredGroups.length}</strong> student groups
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </span>
          <span style={{ color: '#6EE7B7', fontWeight: 600 }}>
            Joined: {joinedGroupIds.length} active communities
          </span>
        </div>

        {/* Groups Grid */}
        {filteredGroups.length > 0 ? (
          <div className="cards-grid" style={{ marginBottom: '60px' }}>
            {filteredGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onToggleJoin={onToggleJoinGroup}
                isJoined={joinedGroupIds.includes(group.id)}
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
              marginBottom: '60px',
            }}
          >
            <Users size={48} color="#64748B" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
              No Student Groups Found Matching Your Criteria
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 20px' }}>
              Try searching with another keyword or explore all categories.
            </p>
            <Button variant="primary" onClick={handleResetFilters}>
              <RotateCcw size={14} /> Clear Filters & View All
            </Button>
          </div>
        )}

        {/* Start a New Club Banner */}
        <div
          className="glass-panel"
          style={{
            padding: '36px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15))',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6EE7B7', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>
              <PlusCircle size={16} /> Campus Leadership
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
              Want to Charter a New Student Society?
            </h3>
            <p style={{ color: '#CBD5E1', fontSize: '0.9rem', maxWidth: '600px' }}>
              Gather 5 founding classmates, submit your club charter, and receive university funding,
              faculty mentorship, and reserved campus hall access.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => alert('Student Society Charter form submitted to Student Affairs!')}
            style={{ background: '#10B981', color: '#0F172A', fontWeight: 700 }}
          >
            Apply for Club Charter
          </Button>
        </div>
      </div>
    </div>
  );
};
