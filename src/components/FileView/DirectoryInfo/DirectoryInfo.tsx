import React from 'react';
import { getBreadcrumbs } from '../../../shared/utils';
import './DirectoryInfo.css';

interface DirectoryInfoProps {
  currentPrefix: string;
}

const DirectoryInfo: React.FC<DirectoryInfoProps> = ({ currentPrefix }) => {
  const breadcrumbs: string[] = getBreadcrumbs(currentPrefix);
  
  return (
    <div className="directory-info">
      <div className="directory-content">
        <div className="directory-label">Current working directory:</div>
        <div className="breadcrumb">
          <div className="breadcrumb-item">Root</div>
          {breadcrumbs.flatMap((crumb, index) => [
            <div key={`sep-${index}`} className="breadcrumb-separator"> / </div>,
            <div key={`crumb-${index}`} className="breadcrumb-item">{crumb}</div>
          ])}
        </div>
      </div>
      <div className="file-actions">
        <input 
          type="text" 
          className="filter-input" 
          placeholder="Filter files..."
        />
      </div>
    </div>
  );
};

export default DirectoryInfo; 