import { useMemo } from 'react';
import type { S3Object } from '../shared/models/interfaces';

export interface TreeNode {
  name: string;
  path: string;
  children: TreeNode[];
  hasSubdirectories: boolean;
}

interface UseTreeDataProps {
  objects: S3Object[];
}

export const useTreeData = ({ objects }: UseTreeDataProps): TreeNode => {
  return useMemo(() => {
    const folderMap = new Map<string, TreeNode>();
    

    const root: TreeNode = {
      name: 'Root',
      path: '',
      children: [],
      hasSubdirectories: false
    };
    folderMap.set('', root);
    

    objects.forEach((object) => {
      if (object.isDirectory) {
        const parts = object.key.split('/').filter(Boolean);
        let currentPath = '';
        
        parts.forEach((part) => {
          const parentPath = currentPath;
          currentPath += part + '/';
          
          if (!folderMap.has(currentPath)) {
            const node: TreeNode = {
              name: part,
              path: currentPath,
              children: [],
              hasSubdirectories: false
            };
            folderMap.set(currentPath, node);
            
            const parent = folderMap.get(parentPath);
            if (parent) {
              parent.children.push(node);
              parent.hasSubdirectories = true;
            }
          }
        });
      }
    });
  
    return root;
  }, [objects]);
}; 