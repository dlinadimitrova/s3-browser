import React from 'react';
import type { IconType } from 'react-icons';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  message: string;
  icon: IconType;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, icon: Icon }) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateIcon}>
        <Icon />
      </div>
      <h3 className={styles.emptyStateTitle}>{title}</h3>
      <p className={styles.emptyStateMessage}>{message}</p>
    </div>
  );
};

export default EmptyState; 