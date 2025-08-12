import React from 'react';
import './SettingsButton.css';

interface SettingsButtonProps {
  onClick: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => {
  return (
    <button className="settings-button" onClick={onClick}>
      ⚙️
    </button>
  );
};

export default SettingsButton; 