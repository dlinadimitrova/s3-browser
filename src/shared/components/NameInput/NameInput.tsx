import React, { useState } from 'react';
import { validateName } from '../../utils/fileUtils';
import './NameInput.css';

interface NameInputProps {
  label: string;
  placeholder: string;
  existingNames: string[];
  itemType: 'file' | 'folder';
  onNameChange: (name: string, isValid: boolean) => void;
}

const NameInput: React.FC<NameInputProps> = ({
  label,
  placeholder,
  existingNames,
  itemType,
  onNameChange,
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    
    const validationError = validateName(newName, existingNames, itemType);
    setError(validationError);
    
    onNameChange(newName, !validationError);
  };

  return (
    <div className="form-group">
      <label htmlFor="nameInput">{label}:</label>
      <input
        type="text"
        id="nameInput"
        value={name}
        onChange={handleNameChange}
        placeholder={placeholder}
        className={`form-input ${error ? 'form-input-error' : ''}`}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default NameInput; 