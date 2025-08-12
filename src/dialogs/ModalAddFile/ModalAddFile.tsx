import React, { useState } from 'react';
import { NameInput, ModalActionButtons } from '../../shared/components';
import './ModalAddFile.css';

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

  // Check if form is valid
  const isFormValid = fileName.trim().length > 0 && isNameValid;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add new file</h2>
        </div>
        <div className="modal-body">
          <NameInput
            label="File name"
            placeholder="Enter file name"
            existingNames={existingFiles}
            itemType="file"
            onNameChange={handleNameChange}
          />
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter file content"
              className="form-textarea"
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
