export const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '-';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

export const formatDate = (date?: Date): string => {
  if (!date) return '-';
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

export const getFileName = (key: string): string => {
  return key.split('/').pop() || key;
};

export const getFolderName = (key: string): string => {
  const cleanKey = key.replace(/\/$/, '');
  return cleanKey.split('/').pop() || cleanKey;
};

export const getBreadcrumbs = (prefix: string): string[] => {
  if (!prefix) return [];
  return prefix.split('/').filter(Boolean);
};

export const isDirectory = (key: string): boolean => {
  return key.endsWith('/');
};

export const getParentPrefix = (prefix: string): string => {
  if (!prefix) return '';
  
  const cleanPrefix = prefix.replace(/\/$/, '');
  
  if (!cleanPrefix) return '';
  
  const parts = cleanPrefix.split('/');
  const parentParts = parts.slice(0, -1);
  
  return parentParts.length > 0 ? parentParts.join('/') + '/' : '';
};

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