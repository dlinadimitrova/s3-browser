import React from 'react';
import { FiX } from 'react-icons/fi';
import './ModalShowContent.css';

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>
        
        <div className="modal-content">
          <textarea
            className="content-textarea"
            value={content}
            readOnly
            placeholder="No content to display"
          />
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalShowContent; 