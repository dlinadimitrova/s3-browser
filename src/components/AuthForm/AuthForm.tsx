import React, { useState, useEffect } from 'react';
import { AUTH_FORM_DEFAULTS } from '../../shared/constants/constants';
import './AuthForm.css';

interface AuthFormProps {
  onLogin: (credentials: { accessKeyId: string; secretAccessKey: string; region: string; bucketName: string }) => void;
}

interface InputConfig {
  id: string;
  label: string;
  type: 'text' | 'password';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const createInputConfigs = (
  bucketName: string,
  secretAccessKey: string,
  accessKeyId: string,
  setBucketName: (value: string) => void,
  setSecretAccessKey: (value: string) => void,
  setAccessKeyId: (value: string) => void
): InputConfig[] => [
  {
    id: AUTH_FORM_DEFAULTS.IDS.BUCKET_NAME,
    label: AUTH_FORM_DEFAULTS.LABELS.BUCKET_NAME,
    type: 'text',
    placeholder: AUTH_FORM_DEFAULTS.PLACEHOLDERS.BUCKET_NAME,
    value: bucketName,
    onChange: setBucketName,
    required: true,
  },
  {
    id: AUTH_FORM_DEFAULTS.IDS.SECRET_KEY,
    label: AUTH_FORM_DEFAULTS.LABELS.SECRET_KEY,
    type: 'password',
    placeholder: AUTH_FORM_DEFAULTS.PLACEHOLDERS.SECRET_KEY,
    value: secretAccessKey,
    onChange: setSecretAccessKey,
    required: true,
  },
  {
    id: AUTH_FORM_DEFAULTS.IDS.ACCESS_KEY_ID,
    label: AUTH_FORM_DEFAULTS.LABELS.ACCESS_KEY_ID,
    type: 'text',
    placeholder: AUTH_FORM_DEFAULTS.PLACEHOLDERS.ACCESS_KEY_ID,
    value: accessKeyId,
    onChange: setAccessKeyId,
    required: true,
  },
];

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [accessKeyId, setAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [region, setRegion] = useState(AUTH_FORM_DEFAULTS.DEFAULT_REGION);
  const [bucketName, setBucketName] = useState('');

  useEffect(() => {
    const savedConfig = localStorage.getItem('s3Config');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        setAccessKeyId(config.accessKeyId || '');
        setSecretAccessKey(config.secretAccessKey || '');
        setRegion(config.region || AUTH_FORM_DEFAULTS.DEFAULT_REGION);
        setBucketName(config.bucketName || '');
      } catch {
        // Silent fail
      }
    }
  }, []);

  const handleSubmit = () => {
    onLogin({ accessKeyId, secretAccessKey, region, bucketName });
  };

  const inputConfigs = createInputConfigs(
    bucketName,
    secretAccessKey,
    accessKeyId,
    setBucketName,
    setSecretAccessKey,
    setAccessKeyId
  );

  const renderInput = (config: InputConfig) => (
    <input
      type={config.type}
      className="form-input"
      placeholder={config.placeholder}
      id={config.id}
      value={config.value}
      onChange={(e) => config.onChange(e.target.value)}
      required={config.required}
    />
  );

  return (
    <div className="auth-form">
      {inputConfigs.map((config) => (
        <div key={config.id} className="auth-form-group">
          <div className="form-label">{config.label}</div>
          {renderInput(config)}
        </div>
      ))}
      <div className="auth-form-group">
        <div className="form-label">{AUTH_FORM_DEFAULTS.LABELS.REGION}</div>
        <select
          className="form-input"
          id={AUTH_FORM_DEFAULTS.IDS.REGION}
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          {AUTH_FORM_DEFAULTS.REGION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <button 
        className="submit-btn" 
        type="button" 
        onClick={handleSubmit}
      >
        {AUTH_FORM_DEFAULTS.BUTTON_TEXT.CONNECT}
      </button>
    </div>
  );
};

export default AuthForm; 