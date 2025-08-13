import React from 'react';
import type { IconType } from 'react-icons';
import './ErrorState.css';

interface ErrorStateProps {
  title: string;
  message: string;
  icon: IconType;
  error?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  title, 
  message,
  error,
  icon: Icon
}) => {
  return (
    <div className="error-state">
      <div className="error-state-icon">
        <Icon />
      </div>
      <h3 className="error-state-title">{title}</h3>
      <p className="error-state-message">{message}</p>
      {error && (
        <details className="error-state-details">
          <summary className="error-state-summary">Error Details</summary>
          <pre className="error-state-error">{error}</pre>
        </details>
      )}
    </div>
  );
};

export default ErrorState; 