import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md';
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  color = '#25D366', 
  variant = 'solid', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
  };
  
  const style = variant === 'solid' 
    ? { backgroundColor: color, color: '#ffffff' }
    : { borderColor: color, color, backgroundColor: 'transparent' };

  const baseClasses = `inline-block rounded-md font-medium ${sizeClasses[size]} ${
    variant === 'outline' ? 'border' : ''
  }`;

  return (
    <span className={baseClasses} style={style}>
      {children}
    </span>
  );
};

export default Badge;