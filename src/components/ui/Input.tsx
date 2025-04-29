import React from 'react';

interface InputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  leftIcon,
  rightIcon,
  onRightIconClick,
  className = '',
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      {leftIcon && (
        <div className="absolute left-3 text-gray-400">{leftIcon}</div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full py-2 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
          leftIcon ? 'pl-10 pr-3' : 'px-4'
        } ${rightIcon ? 'pr-10' : ''}`}
      />
      {rightIcon && (
        <div 
          className={`absolute right-3 text-gray-400 ${onRightIconClick ? 'cursor-pointer' : ''}`}
          onClick={onRightIconClick}
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default Input;