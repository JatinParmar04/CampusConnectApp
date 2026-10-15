import React from 'react';

export interface AvatarStackProps {
  avatars: string[];
  maxVisible?: number;
  totalCount?: number;
}

export const AvatarStack: React.FC<AvatarStackProps> = ({
  avatars,
  maxVisible = 3,
  totalCount,
}) => {
  const visibleAvatars = avatars.slice(0, maxVisible);
  const remainingCount = totalCount ? totalCount - visibleAvatars.length : avatars.length - visibleAvatars.length;

  return (
    <div className="avatar-stack">
      {visibleAvatars.map((url, idx) => (
        <img
          key={idx}
          src={url}
          alt={`Attendee ${idx + 1}`}
          className="avatar-stack-item"
          loading="lazy"
        />
      ))}
      {remainingCount > 0 && (
        <span className="avatar-stack-counter">+{remainingCount}</span>
      )}
    </div>
  );
};
