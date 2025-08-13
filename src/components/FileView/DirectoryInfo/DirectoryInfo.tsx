import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { getBreadcrumbs } from '../../../shared/utils';
import './DirectoryInfo.css';

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
    <div className="directory-info">
      <div className="directory-content">
        <div className="directory-label">Current working directory:</div>
        <div className="breadcrumb">
          <div 
            className={`breadcrumb-item breadcrumb-clickable ${!currentPrefix ? 'breadcrumb-active' : ''}`}
            onClick={handleRootClick}
            title="Navigate to root directory"
          >
            Root
          </div>
          {breadcrumbs.flatMap((crumb, index) => [
            <FiChevronRight key={`sep-${index}`} className="breadcrumb-separator" />,
            <div 
              key={`crumb-${index}`} 
              className={`breadcrumb-item breadcrumb-clickable ${index === breadcrumbs.length - 1 ? 'breadcrumb-active' : ''}`}
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