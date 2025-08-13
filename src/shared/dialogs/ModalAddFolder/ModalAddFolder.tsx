import React, { useState } from 'react';
import NameInput from '../../components/NameInput/NameInput';
import ModalActionButtons from '../../components/ModalActionButtons/ModalActionButtons';
import commonStyles from '../common.module.css';

interface ModalAddFolderProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (folderName: string) => void;
  existingFolders?: string[];
}

const ModalAddFolder: React.FC<ModalAddFolderProps> = ({ 
  isOpen, 
  onClose, 
  onCreate, 
  existingFolders = [] 
}) => {
  const [folderName, setFolderName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);

  const handleNameChange = (name: string, isValid: boolean) => {
    setFolderName(name);
    setIsNameValid(isValid);
  };

  const handleCreate = () => {
    const trimmedFolderName = folderName.trim();
    onCreate(trimmedFolderName);
    setFolderName('');
    setIsNameValid(false);
    onClose();
  };

  const handleClose = () => {
    setFolderName('');
    setIsNameValid(false);
    onClose();
  };

  const isFormValid = folderName.trim().length > 0 && isNameValid;

  if (!isOpen) return null;

  return (
    <div className={commonStyles.modalOverlay}>
      <div className={commonStyles.modal}>
        <div className={commonStyles.modalHeader}>
          <h2>Add new folder</h2>
        </div>
        <div className={commonStyles.modalBody}>
          <NameInput
            label="Folder name"
            placeholder="Enter folder name"
            existingNames={existingFolders}
            itemType="folder"
            onNameChange={handleNameChange}
          />
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

export default ModalAddFolder; 