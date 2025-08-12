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
  size?: number;
  lastModified?: Date;
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
}
