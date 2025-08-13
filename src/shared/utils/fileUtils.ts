// Format file size in human readable format
export const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '-';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

// Format date in a readable format
export const formatDate = (date?: Date): string => {
  if (!date) return '-';
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

// Get file name from S3 key
export const getFileName = (key: string): string => {
  return key.split('/').pop() || key;
};

// Get folder name from S3 key (removes trailing slash and gets last part)
export const getFolderName = (key: string): string => {
  // Remove trailing slash if present
  const cleanKey = key.replace(/\/$/, '');
  return cleanKey.split('/').pop() || cleanKey;
};

// Get breadcrumbs from prefix
export const getBreadcrumbs = (prefix: string): string[] => {
  if (!prefix) return [];
  return prefix.split('/').filter(Boolean);
};

// Check if S3 key represents a directory
export const isDirectory = (key: string): boolean => {
  return key.endsWith('/');
};

// Get parent directory from S3 prefix
export const getParentPrefix = (prefix: string): string => {
  if (!prefix) return '';
  
  // Remove trailing slash if present
  const cleanPrefix = prefix.replace(/\/$/, '');
  
  if (!cleanPrefix) return '';
  
  // Split by slash and remove the last part
  const parts = cleanPrefix.split('/');
  const parentParts = parts.slice(0, -1);
  
  // Join back and add trailing slash
  return parentParts.length > 0 ? parentParts.join('/') + '/' : '';
};

// Validate name (for files or folders)
export const validateName = (
  name: string, 
  existingNames: string[], 
  itemType: 'file' | 'folder' = 'file'
): string => {
  const trimmedName = name.trim();
  
  if (!trimmedName) {
    return `${itemType === 'file' ? 'File' : 'Folder'} name is required`;
  }
  
  if (existingNames.includes(trimmedName)) {
    return `A ${itemType} with this name already exists`;
  }
  
  return '';
}; 