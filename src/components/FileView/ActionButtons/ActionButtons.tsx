import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import './ActionButtons.css';

interface ActionButtonsProps {
  onCreateFolder: () => void;
  onCreateFile: () => void;
  onDelete: () => void;
}

interface ButtonConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const createButtonConfigs = (
  onCreateFolder: () => void,
  onCreateFile: () => void,
  onDelete: () => void
): ButtonConfig[] => [
  {
    id: 'create-folder',
    label: 'Create Folder',
    icon: <FiPlus />,
    onClick: onCreateFolder,
  },
  {
    id: 'create-file',
    label: 'Create File',
    icon: <FiPlus />,
    onClick: onCreateFile,
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <FiTrash2 />,
    onClick: onDelete,
  },
];

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCreateFolder,
  onCreateFile,
  onDelete,
}) => {
  const buttonConfigs = createButtonConfigs(onCreateFolder, onCreateFile, onDelete);

  return (
    <div className="action-buttons">
      {buttonConfigs.map((button) => (
        <button 
          key={button.id}
          className="action-btn"
          onClick={button.onClick}
        >
          {button.icon}
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons; 