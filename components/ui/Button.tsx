import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`bg-[#FF5722] hover:bg-[#F4511E] text-white font-bold py-3 px-8 uppercase tracking-wider transition-colors duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
