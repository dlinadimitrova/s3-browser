import { 
  FiFolder, 
  FiAlertTriangle, 
  FiClock
} from 'react-icons/fi';
import type { 
  EmptyStateDefaults,
  ErrorStateDefaults,
  BrowserPageDefaults,
  LoadingStateDefaults,
  AuthFormDefaults,
  StorageKeys
} from '../models/interfaces';

// EmptyState Constants
export const EMPTY_STATE_DEFAULTS: EmptyStateDefaults = {
  TITLE: "No Data Available",
  MESSAGE: "Please configure your AWS credentials to get started.",
  ICON: FiFolder
} as const;

// ErrorState Constants
export const ERROR_STATE_DEFAULTS: ErrorStateDefaults = {
  TITLE: "Something went wrong",
  MESSAGE: "An error occurred while loading your data.",
  ICON: FiAlertTriangle
} as const;

// BrowserPage Constants
export const BROWSER_PAGE_DEFAULTS: BrowserPageDefaults = {
  LOADING_MESSAGE: "Loading S3 objects...",
  EMPTY_BUCKET_TITLE: "No Files or Folders Found",
  EMPTY_BUCKET_MESSAGE: "This bucket is empty. Create your first file or folder to get started.",
  EMPTY_BUCKET_ICON: FiFolder,
  ERROR_MESSAGE_PREFIX: "Failed to load objects: "
} as const;

// Cross-Tab Synchronization Storage Keys
export const STORAGE_KEYS: StorageKeys = {
  S3_OBJECTS: 's3-browser-objects',
  S3_OBJECTS_TIMESTAMP: 's3-browser-objects-timestamp',
  S3_REFRESH_TRIGGER: 's3-browser-refresh-trigger',
  S3_CONFIG: 's3Config',
} as const;

// LoadingState Constants
export const LOADING_STATE_DEFAULTS: LoadingStateDefaults = {
  MESSAGE: "Loading S3 objects...",
  ICON: FiClock
} as const;

// AuthForm Constants
export const AUTH_FORM_DEFAULTS: AuthFormDefaults = {
  LABELS: {
    BUCKET_NAME: 'Bucket name',
    SECRET_KEY: 'S3 Secret Key',
    ACCESS_KEY_ID: 'Access Key ID',
    REGION: 'Region',
  },
  PLACEHOLDERS: {
    BUCKET_NAME: 'Bucket name',
    SECRET_KEY: 'S3 Secret Key',
    ACCESS_KEY_ID: 'Access Key ID',
  },
  IDS: {
    BUCKET_NAME: 'bucketName',
    SECRET_KEY: 'secretAccessKey',
    ACCESS_KEY_ID: 'accessKeyId',
    REGION: 'region',
  },
  BUTTON_TEXT: {
    CONNECT: 'Connect',
  },
  REGION_OPTIONS: [
    { value: 'us-east-1', label: 'US East (N. Virginia)' },
    { value: 'us-west-2', label: 'US West (Oregon)' },
    { value: 'eu-west-1', label: 'Europe (Ireland)' },
    { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
    { value: 'ap-northeast-1', label: 'Asia Pacific (Tokyo)' },
    { value: 'sa-east-1', label: 'South America (São Paulo)' },
  ],
  DEFAULT_REGION: 'us-east-1',
} as const; 