// components/ui/Button.tsx
import React from "react";

type ButtonProps = {
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  isLoading = false,
  disabled = false,
  children,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`bg-[#1D2A6D] text-white text-base px-6 py-2 rounded-lg hover:bg-[#22398A] disabled:opacity-50 ${className}`}
    >
      {isLoading ? "Saving..." : children}
    </button>
  );
};

export default Button;
