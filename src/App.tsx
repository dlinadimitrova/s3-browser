import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm/AuthForm';
import BrowserPage from './pages/BrowserPage';
import { EmptyState } from './shared/components';
import { EMPTY_STATE_DEFAULTS } from './shared/constants/constants';
import type { AWSCredentials } from './shared/models/interfaces';
import styles from './App.module.css';

interface LoginState extends AWSCredentials {
  bucketName: string;
}

function App() {
  const [loginState, setLoginState] = useState<LoginState | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedConfig = localStorage.getItem('s3Config');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        setLoginState(config);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('s3Config');
      }
    }
  }, []);

  const handleLogin = (data: LoginState) => {
    setLoginState(data);
    setIsAuthenticated(true);
    localStorage.setItem('s3Config', JSON.stringify(data));
  };

  return (
    <div className={styles.app}>
        <AuthForm onLogin={handleLogin} />
      {!loginState && !isAuthenticated && (
        <EmptyState 
          title={EMPTY_STATE_DEFAULTS.TITLE}
          message={EMPTY_STATE_DEFAULTS.MESSAGE}
          icon={EMPTY_STATE_DEFAULTS.ICON}
        />
      )}
      
      {isAuthenticated && loginState && (
        <BrowserPage
          credentials={{
            accessKeyId: loginState.accessKeyId,
            secretAccessKey: loginState.secretAccessKey,
            region: loginState.region,
          }}
          bucketName={loginState.bucketName}
        />
      )}
    </div>
  );
}

export default App;
