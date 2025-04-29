import React from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  isOnline?: boolean;
  onClick?: () => void;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  isOnline,
  onClick,
  className = '',
}) => {
  const initials = alt
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div className="relative">
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center overflow-hidden bg-gray-200 ${className}`}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span className="font-medium">{initials}</span>
        )}
      </div>
      {isOnline !== undefined && (
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`}
        />
      )}
    </div>
  );
};

export default Avatar;