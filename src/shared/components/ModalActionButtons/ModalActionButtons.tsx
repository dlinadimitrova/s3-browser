import React from 'react';
import './ModalActionButtons.css';

interface ModalActionButtonsProps {
  onClose: () => void;
  onCreate: () => void;
  isCreateDisabled?: boolean;
  closeText?: string;
  createText?: string;
}

const ModalActionButtons: React.FC<ModalActionButtonsProps> = ({
  onClose,
  onCreate,
  isCreateDisabled = false,
  closeText = 'Close',
  createText = 'Create',
}) => {
  return (
    <div className="modal-footer">
      <button className="btn" onClick={onClose}>
        {closeText}
      </button>
      <button 
        className="btn" 
        onClick={onCreate}
        disabled={isCreateDisabled}
      >
        {createText}
      </button>
    </div>
  );
};

export default ModalActionButtons; 