import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { S3Service } from '../services/s3';
import type { S3Object, AWSCredentials } from '../shared/models/interfaces';
import { BROWSER_PAGE_DEFAULTS, STORAGE_KEYS } from '../shared/constants/constants';

interface UseS3BrowserProps {
  credentials: AWSCredentials;
  bucketName: string;
}

interface UseS3BrowserReturn {
  // State
  currentPrefix: string;
  allObjects: S3Object[];
  objects: S3Object[];
  loading: boolean;
  error: string | null;
  expandedNodes: Set<string>;
  
  // Actions
  setCurrentPrefix: (prefix: string) => void;
  setExpandedNodes: (nodes: Set<string>) => void;
  refresh: () => Promise<void>;
  s3Service: S3Service;
}

export const useS3Browser = ({ credentials, bucketName }: UseS3BrowserProps): UseS3BrowserReturn => {
  const [currentPrefix, setCurrentPrefix] = useState('');
  const [allObjects, setAllObjects] = useState<S3Object[]>([]);
  const [objects, setObjects] = useState<S3Object[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const s3Service = useMemo(() => new S3Service(credentials), [credentials]);
  const isInitializedRef = useRef(false);

  // Cross-tab synchronization functions
  const saveObjectsToStorage = useCallback((objects: S3Object[]) => {
    try {
      const storageData = {
        objects,
        bucketName,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEYS.S3_OBJECTS, JSON.stringify(storageData));
      localStorage.setItem(STORAGE_KEYS.S3_OBJECTS_TIMESTAMP, Date.now().toString());
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [bucketName]);

  const loadObjectsFromStorage = useCallback(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEYS.S3_OBJECTS);
      const timestamp = localStorage.getItem(STORAGE_KEYS.S3_OBJECTS_TIMESTAMP);
      
      if (storedData && timestamp) {
        const data = JSON.parse(storedData);
        const age = Date.now() - parseInt(timestamp);
        
        // Only use cached data if it's less than 5 minutes old and for the same bucket
        if (age < 5 * 60 * 1000 && data.bucketName === bucketName) {
          return data.objects;
        }
      }
    } catch {
      // Silently fail if localStorage is not available or data is corrupted
    }
    return null;
  }, [bucketName]);

  const triggerCrossTabRefresh = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.S3_REFRESH_TRIGGER, Date.now().toString());
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  // Fetch all objects once for the entire tree
  const fetchAllObjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const allObjectList = await s3Service.listAllObjects(bucketName, '');
      setAllObjects(allObjectList);
      
      // Save to localStorage for cross-tab synchronization
      saveObjectsToStorage(allObjectList);
    } catch (err) {
      setError(BROWSER_PAGE_DEFAULTS.ERROR_MESSAGE_PREFIX + (err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [s3Service, bucketName, saveObjectsToStorage]);

  // Filter objects for current directory
  const filterObjectsForCurrentPrefix = useCallback((prefix: string) => {
    const filteredObjects: S3Object[] = [];
    const seenDirectories = new Set<string>();
    const seenFiles = new Set<string>();

    allObjects.forEach((obj: S3Object) => {
      if (obj.key.startsWith(prefix)) {
        const relativePath = obj.key.slice(prefix.length);
        const parts = relativePath.split('/').filter(Boolean);
        
        if (parts.length === 0) {
          // This is the current directory itself, skip
          return;
        }
        
        if (parts.length === 1) {
          // Direct child of current directory
          const childName = parts[0];
          if (obj.isDirectory) {
            if (!seenDirectories.has(childName)) {
              seenDirectories.add(childName);
              filteredObjects.push({
                key: obj.key,
                size: obj.size,
                lastModified: obj.lastModified,
                isDirectory: true
              });
            }
          } else {
            if (!seenFiles.has(childName)) {
              seenFiles.add(childName);
              filteredObjects.push({
                key: obj.key,
                size: obj.size,
                lastModified: obj.lastModified,
                isDirectory: false
              });
            }
          }
        }
      }
    });

    return filteredObjects.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.key.localeCompare(b.key);
    });
  }, [allObjects]);

  // Update objects when currentPrefix changes
  useEffect(() => {
    const filteredObjects = filterObjectsForCurrentPrefix(currentPrefix);
    setObjects(filteredObjects);
  }, [currentPrefix, filterObjectsForCurrentPrefix, allObjects]);

  // Cross-tab storage event listener
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEYS.S3_REFRESH_TRIGGER && event.newValue) {
        // Another tab triggered a refresh
        fetchAllObjects();
      } else if (event.key === STORAGE_KEYS.S3_OBJECTS && event.newValue) {
        // Another tab updated the objects
        try {
          const data = JSON.parse(event.newValue);
          if (data.bucketName === bucketName) {
            setAllObjects(data.objects);
          }
        } catch {
          // Ignore invalid data
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [fetchAllObjects, bucketName]);

  // Initialize with cached data if available
  useEffect(() => {
    if (!isInitializedRef.current) {
      const cachedObjects = loadObjectsFromStorage();
      if (cachedObjects) {
        setAllObjects(cachedObjects);
        isInitializedRef.current = true;
      }
      fetchAllObjects();
    }
  }, [loadObjectsFromStorage, fetchAllObjects]);

  const refresh = useCallback(async () => {
    await fetchAllObjects();
    // Trigger refresh in other tabs
    triggerCrossTabRefresh();
  }, [fetchAllObjects, triggerCrossTabRefresh]);

  return {
    // State
    currentPrefix,
    allObjects,
    objects,
    loading,
    error,
    expandedNodes,
    
    // Actions
    setCurrentPrefix,
    setExpandedNodes,
    refresh,
    s3Service,
  };
}; 