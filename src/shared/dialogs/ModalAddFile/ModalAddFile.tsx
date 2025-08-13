import React, { useState } from 'react';
import NameInput from '../../components/NameInput/NameInput';
import ModalActionButtons from '../../components/ModalActionButtons/ModalActionButtons';
import commonStyles from '../common.module.css';

interface ModalAddFileProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (fileName: string, content: string) => void;
  existingFiles?: string[];
}

const ModalAddFile: React.FC<ModalAddFileProps> = ({ 
  isOpen, 
  onClose, 
  onCreate, 
  existingFiles = [] 
}) => {
  const [fileName, setFileName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [content, setContent] = useState('');

  const handleNameChange = (name: string, isValid: boolean) => {
    setFileName(name);
    setIsNameValid(isValid);
  };

  const handleCreate = () => {
    const trimmedFileName = fileName.trim();
    onCreate(trimmedFileName, content);
    setFileName('');
    setContent('');
    setIsNameValid(false);
    onClose();
  };

  const handleClose = () => {
    setFileName('');
    setContent('');
    setIsNameValid(false);
    onClose();
  };

  const isFormValid = fileName.trim().length > 0 && isNameValid;

  if (!isOpen) return null;

  return (
    <div className={commonStyles.modalOverlay}>
      <div className={commonStyles.modal}>
        <div className={commonStyles.modalHeader}>
          <h2>Add new file</h2>
        </div>
        <div className={commonStyles.modalBody}>
          <NameInput
            label="File name"
            placeholder="Enter file name"
            existingNames={existingFiles}
            itemType="file"
            onNameChange={handleNameChange}
          />
          <div className={commonStyles.formGroup}>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter file content"
              className={commonStyles.formTextarea}
              rows={8}
            />
          </div>
        </div>
        <ModalActionButtons
          onClose={handleClose}
          onCreate={handleCreate}
          isCreateDisabled={!isFormValid}
        />
      </div>
    </div>
  );
};

export default ModalAddFile;
