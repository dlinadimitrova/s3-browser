import React from 'react';
import { FiX } from 'react-icons/fi';
import commonStyles from '../common.module.css';

interface ModalShowContentProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const ModalShowContent: React.FC<ModalShowContentProps> = ({
  isOpen,
  onClose,
  title,
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div className={commonStyles.modalOverlay} onClick={onClose}>
      <div className={commonStyles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={commonStyles.modalHeader}>
          <h2 className={commonStyles.modalTitle}>{title}</h2>
          <button className={commonStyles.modalClose} onClick={onClose}>
            <FiX />
          </button>
        </div>
        
        <div className={commonStyles.modalContent}>
          <textarea
            className={commonStyles.contentTextarea}
            value={content}
            readOnly
            placeholder="No content to display"
          />
        </div>
        
        <div className={commonStyles.modalFooter}>
          <button className={`${commonStyles.btn} ${commonStyles.btnSecondary}`} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalShowContent; 