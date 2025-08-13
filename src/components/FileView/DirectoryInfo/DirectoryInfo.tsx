import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { getBreadcrumbs } from '../../../shared/utils';
import styles from './DirectoryInfo.module.css';

interface DirectoryInfoProps {
  currentPrefix: string;
  onPrefixSelect?: (prefix: string) => void;
}

const DirectoryInfo: React.FC<DirectoryInfoProps> = ({ currentPrefix, onPrefixSelect }) => {
  const breadcrumbs: string[] = getBreadcrumbs(currentPrefix);
  
  const handleBreadcrumbClick = (index: number) => {
    if (!onPrefixSelect) return;
    
    const targetBreadcrumbs = breadcrumbs.slice(0, index + 1);
    const targetPrefix = targetBreadcrumbs.join('/') + '/';
    onPrefixSelect(targetPrefix);
  };

  const handleRootClick = () => {
    if (!onPrefixSelect) return;
    onPrefixSelect('');
  };
  
  return (
    <div className={styles.directoryInfo}>
      <div className={styles.directoryContent}>
        <div className={styles.directoryLabel}>Current working directory:</div>
        <div className={styles.breadcrumb}>
          <div 
            className={`${styles.breadcrumbItem} ${styles.breadcrumbClickable} ${!currentPrefix ? styles.breadcrumbActive : ''}`}
            onClick={handleRootClick}
            title="Navigate to root directory"
          >
            Root
          </div>
          {breadcrumbs.flatMap((crumb, index) => [
            <FiChevronRight key={`sep-${index}`} className={styles.breadcrumbSeparator} />,
            <div 
              key={`crumb-${index}`} 
              className={`${styles.breadcrumbItem} ${styles.breadcrumbClickable} ${index === breadcrumbs.length - 1 ? styles.breadcrumbActive : ''}`}
              onClick={() => handleBreadcrumbClick(index)}
              title={`Navigate to ${crumb}`}
            >
              {crumb}
            </div>
          ])}
        </div>
      </div>
    </div>
  );
};

export default DirectoryInfo; 