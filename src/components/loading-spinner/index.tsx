import React from 'react';

interface ILoadingSpinnerProps {
  size?: number;
  color?: string;
}

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({size = 40, color = 'gray'}) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="border-4 rounded-full animate-spin"
        style={{height: size, width: size, borderColor: `${color} transparent transparent`}}
      />
    </div>
  );
};

export default LoadingSpinner;
