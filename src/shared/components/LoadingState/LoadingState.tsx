import React from 'react';
import type { IconType } from 'react-icons';
import { FiClock } from 'react-icons/fi';
import styles from './LoadingState.module.css';

interface LoadingStateProps {
  message?: string;
  icon?: IconType;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...',
  icon: Icon = FiClock
}) => {
  return (
    <div className={styles.loadingState}>
      <div className={styles.loadingContent}>
        <div className={styles.loadingIcon}>
          <Icon />
        </div>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingMessage}>{message}</p>
      </div>
    </div>
  );
};

export default LoadingState; 