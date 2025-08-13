import type { IconType } from 'react-icons';

// AWS Credentials interface
export interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

// S3 Object interface
export interface S3Object {
  key: string;
  isDirectory: boolean;
  lastModified?: Date;
  size?: number;
}

// S3 Bucket interface
export interface S3Bucket {
  name: string;
  creationDate?: Date;
}

// File upload interface
export interface FileUpload {
  file: File;
  bucket: string;
  key: string;
  progress?: number;
}

// Application state interface
export interface AppState {
  isAuthenticated: boolean;
  currentPrefix: string;
  loading: boolean;
  credentials?: AWSCredentials;
  currentBucket?: string;
  error?: string;
  objects?: S3Object[];
}

// S3Service class type
export interface S3Service {
  listAllObjects(bucket: string, prefix?: string): Promise<S3Object[]>;
  deleteObject(bucket: string, key: string): Promise<void>;
  createFile(bucket: string, key: string, content: string): Promise<void>;
  createFolder(bucket: string, key: string): Promise<void>;
  getObjectContent(bucket: string, key: string): Promise<string>;
}

// Constants interfaces
export interface EmptyStateDefaults {
  TITLE: string;
  MESSAGE: string;
  ICON: IconType;
}

export interface ErrorStateDefaults {
  TITLE: string;
  MESSAGE: string;
  ICON: IconType;
}

export interface BrowserPageDefaults {
  LOADING_MESSAGE: string;
  EMPTY_BUCKET_TITLE: string;
  EMPTY_BUCKET_MESSAGE: string;
  EMPTY_BUCKET_ICON: IconType;
  ERROR_MESSAGE_PREFIX: string;
}

export interface LoadingStateDefaults {
  MESSAGE: string;
  ICON: IconType;
}

export interface AuthFormDefaults {
  LABELS: {
    BUCKET_NAME: string;
    SECRET_KEY: string;
    ACCESS_KEY_ID: string;
    REGION: string;
  };
  PLACEHOLDERS: {
    BUCKET_NAME: string;
    SECRET_KEY: string;
    ACCESS_KEY_ID: string;
  };
  IDS: {
    BUCKET_NAME: string;
    SECRET_KEY: string;
    ACCESS_KEY_ID: string;
    REGION: string;
  };
  BUTTON_TEXT: {
    CONNECT: string;
    CONNECTED: string;
  };
  REGION_OPTIONS: Array<{
    value: string;
    label: string;
  }>;
  DEFAULT_REGION: string;
}

export interface StorageKeys {
  S3_OBJECTS: string;
  S3_OBJECTS_TIMESTAMP: string;
  S3_REFRESH_TRIGGER: string;
  S3_CONFIG: string;
}
