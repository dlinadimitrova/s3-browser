import React from 'react';
import type { IconType } from 'react-icons';
import './EmptyState.css';

interface EmptyStateProps {
  title: string;
  message: string;
  icon: IconType;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, icon: Icon }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
    </div>
  );
};

export default EmptyState; 