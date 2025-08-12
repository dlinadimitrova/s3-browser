import React from 'react';
import './ActionButtons.css';

interface ActionButtonsProps {
  onCreateFolder: () => void;
  onCreateFile: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCreateFolder,
  onCreateFile,
  onDelete,
}) => {
  return (
    <div className="action-buttons">
      <button 
        className="action-btn"
        onClick={onCreateFolder}
      >
        + Create Folder
      </button>
      <button 
        className="action-btn"
        onClick={onCreateFile}
      >
        + Create File
      </button>
      <button 
        className="action-btn"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default ActionButtons; 