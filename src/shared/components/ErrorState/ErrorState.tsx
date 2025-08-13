import React from 'react';
import type { IconType } from 'react-icons';
import styles from './ErrorState.module.css';

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
    <div className={styles.errorState}>
      <div className={styles.errorStateIcon}>
        <Icon />
      </div>
      <h3 className={styles.errorStateTitle}>{title}</h3>
      <p className={styles.errorStateMessage}>{message}</p>
      {error && (
        <details className={styles.errorStateDetails}>
          <summary className={styles.errorStateSummary}>Error Details</summary>
          <pre className={styles.errorStateError}>{error}</pre>
        </details>
      )}
    </div>
  );
};

export default ErrorState; 