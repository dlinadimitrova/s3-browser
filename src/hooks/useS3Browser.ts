import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { S3Service } from '../services/s3';
import type { S3Object, AWSCredentials } from '../shared/models/interfaces';
import { BROWSER_PAGE_DEFAULTS } from '../shared/constants/constants';

interface UseS3BrowserProps {
  credentials: AWSCredentials;
  bucketName: string;
}

interface UseS3BrowserReturn {
  currentPrefix: string;
  allObjects: S3Object[];
  objects: S3Object[];
  loading: boolean;
  error: string | null;
  expandedNodes: Set<string>;
  
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

  const s3Service = useMemo(() => new S3Service(credentials), [credentials.accessKeyId, credentials.secretAccessKey, credentials.region]);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    isInitializedRef.current = false;
    setAllObjects([]);
    setObjects([]);
  }, [credentials.accessKeyId, credentials.secretAccessKey, credentials.region, bucketName]);

  const fetchAllObjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const allObjectList = await s3Service.listAllObjects(bucketName, '');
      setAllObjects(allObjectList);
    } catch (err) {
      setError(BROWSER_PAGE_DEFAULTS.ERROR_MESSAGE_PREFIX + (err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [s3Service, bucketName]);

  const filterObjectsForCurrentPrefix = useCallback((prefix: string) => {
    const filteredObjects: S3Object[] = [];
    const seenDirectories = new Set<string>();
    const seenFiles = new Set<string>();

    allObjects.forEach((obj: S3Object) => {
      if (obj.key.startsWith(prefix)) {
        const relativePath = obj.key.slice(prefix.length);
        const parts = relativePath.split('/').filter(Boolean);
        
        if (parts.length === 0) {
          return;
        }
        
        if (parts.length === 1) {
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


  useEffect(() => {
    const filteredObjects = filterObjectsForCurrentPrefix(currentPrefix);
    setObjects(filteredObjects);
  }, [currentPrefix, filterObjectsForCurrentPrefix, allObjects]);

  useEffect(() => {
    if (!isInitializedRef.current) {
      if (!credentials.accessKeyId || !credentials.secretAccessKey || !bucketName) {
        setError('Please provide all required credentials: Access Key ID, Secret Access Key, and Bucket Name.');
        isInitializedRef.current = true;
        return;
      }

      isInitializedRef.current = true;
      fetchAllObjects();
    }
  }, [fetchAllObjects, credentials.accessKeyId, credentials.secretAccessKey, bucketName]);

  const refresh = useCallback(async () => {
    await fetchAllObjects();
  }, [fetchAllObjects]);

  return {
    currentPrefix,
    allObjects,
    objects,
    loading,
    error,
    expandedNodes,
    
    setCurrentPrefix,
    setExpandedNodes,
    refresh,
    s3Service,
  };
}; 