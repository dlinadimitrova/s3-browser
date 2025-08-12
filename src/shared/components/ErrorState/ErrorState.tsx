import React from 'react';
import './ErrorState.css';

interface ErrorStateProps {
  title: string;
  message: string;
  error?: string;
  icon: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  title, 
  message,
  error,
  icon
}) => {
  return (
    <div className="error-state">
      <div className="error-state-icon">{icon}</div>
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