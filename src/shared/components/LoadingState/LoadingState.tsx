import React from 'react';
import type { IconType } from 'react-icons';
import { FiClock } from 'react-icons/fi';
import './LoadingState.css';

interface LoadingStateProps {
  message?: string;
  icon?: IconType;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...',
  icon: Icon = FiClock
}) => {
  return (
    <div className="loading-state">
      <div className="loading-content">
        <div className="loading-icon">
          <Icon />
        </div>
        <div className="loading-spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingState; 