import React, { useState, useEffect } from 'react';
import './AuthForm.css';

interface AuthFormProps {
  onLogin: (credentials: { accessKeyId: string; secretAccessKey: string; region: string; bucketName: string }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [accessKeyId, setAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [region, setRegion] = useState('us-east-1');
  const [bucketName, setBucketName] = useState('');

  useEffect(() => {
    const savedConfig = localStorage.getItem('s3Config');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        setAccessKeyId(config.accessKeyId || '');
        setSecretAccessKey(config.secretAccessKey || '');
        setRegion(config.region || 'us-east-1');
        setBucketName(config.bucketName || '');
      } catch {
        // Error handled by parent component (App.tsx)
        // No need to log or throw here
      }
    }
  }, []);

  const handleSubmit = () => {
    onLogin({ accessKeyId, secretAccessKey, region, bucketName });
  };

  return (
    <div className="auth-form">
      <div className="auth-form-group">
        <div className="form-label">Bucket name</div>
        <input
          type="text"
          className="form-input"
          placeholder="Bucket name"
          id="bucketName"
          value={bucketName}
          onChange={(e) => setBucketName(e.target.value)}
          required
        />
      </div>
      <div className="auth-form-group">
        <div className="form-label">S3 Secret Key</div>
        <input
          type="password"
          className="form-input"
          placeholder="S3 Secret Key"
          id="secretAccessKey"
          value={secretAccessKey}
          onChange={(e) => setSecretAccessKey(e.target.value)}
          required
        />
      </div>
      <div className="auth-form-group">
        <div className="form-label">Access Key ID</div>
        <input
          type="text"
          className="form-input"
          placeholder="Access Key ID"
          id="accessKeyId"
          value={accessKeyId}
          onChange={(e) => setAccessKeyId(e.target.value)}
          required
        />
      </div>
      <div className="auth-form-group">
        <div className="form-label">Region</div>
        <select
          className="form-input"
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="us-east-1">US East (N. Virginia)</option>
          <option value="us-west-2">US West (Oregon)</option>
          <option value="eu-west-1">Europe (Ireland)</option>
          <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
          <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
          <option value="sa-east-1">South America (São Paulo)</option>
        </select>
      </div>
      <button 
        className="submit-btn" 
        type="button" 
        onClick={handleSubmit}
      >
        Connect
      </button>
    </div>
  );
};

export default AuthForm; 