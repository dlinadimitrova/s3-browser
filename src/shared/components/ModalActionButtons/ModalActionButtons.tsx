import React from 'react';
import styles from './ModalActionButtons.module.css';
import commonStyles from '../../dialogs/common.module.css';

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
    <div className={styles.modalFooter}>
      <button className={`${commonStyles.btn} ${commonStyles.btnSecondary}`} onClick={onClose}>
        {closeText}
      </button>
      <button 
        className={`${commonStyles.btn} ${commonStyles.btnSecondary}`} 
        onClick={onCreate}
        disabled={isCreateDisabled}
      >
        {createText}
      </button>
    </div>
  );
};

export default ModalActionButtons; 