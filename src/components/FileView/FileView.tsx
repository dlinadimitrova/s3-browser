import React, { useState } from 'react';
import type { S3Object, S3Service } from '../../shared/models/interfaces';
import { ModalAddFile, ModalAddFolder } from '../../dialogs';
import { EmptyState } from '../../shared/components';
import { BROWSER_PAGE_DEFAULTS } from '../../shared/constants/constants';
import { isDirectory, getParentPrefix } from '../../shared/utils/fileUtils';
import ActionButtons from './ActionButtons/ActionButtons';
import DirectoryInfo from './DirectoryInfo/DirectoryInfo';
import FileList from './FileList/FileList';
import './FileView.css';

interface FileViewProps {
  currentPrefix: string;
  objects: S3Object[];
  s3Service: S3Service;
  bucketName: string;
  onRefresh: () => void;
  onPrefixSelect?: (prefix: string) => void;
}

const FileView: React.FC<FileViewProps> = ({
  currentPrefix,
  objects,
  s3Service,
  bucketName,
  onRefresh,
  onPrefixSelect,
}) => {
  const [isAddFileOpen, setIsAddFileOpen] = useState(false);
  const [isAddFolderOpen, setIsAddFolderOpen] = useState(false);

  const existingFiles: string[] = objects
    .filter(obj => !obj.isDirectory)
    .map(obj => {
      return obj.key.split('/').pop() || obj.key;
    });

  const existingFolders: string[] = objects
    .filter(obj => obj.isDirectory)
    .map(obj => {
      const folderName = obj.key.replace(/\/$/, '');
      return folderName.split('/').pop() || folderName;
    });

  const buildFullKey = (name: string, isFolder: boolean = false): string => {
    const separator = currentPrefix && !isDirectory(currentPrefix) ? '/' : '';
    const suffix = isFolder ? '/' : '';
    return currentPrefix ? `${currentPrefix}${separator}${name}${suffix}` : `${name}${suffix}`;
  };

  const handleCreateFile = async (fileName: string, content: string) => {
    try {
      const fullKey = buildFullKey(fileName, false);
      await s3Service.createFile(bucketName, fullKey, content);
      onRefresh();
    } catch {
      alert('Failed to create file. Please try again.');
    }
  };

  const handleCreateFolder = async (folderName: string) => {
    try {
      const fullKey = buildFullKey(folderName, true);
      await s3Service.createFolder(bucketName, fullKey);
      onRefresh();
    } catch {
      alert('Failed to create folder. Please try again.');
    }
  };

  const handleObjectClick = (object: S3Object) => {
    if (object.isDirectory) {
      onPrefixSelect?.(object.key);
    } else {
      // TODO: Handle file click (download, preview, etc.)
    }
  };

  const handleDelete = async (object: S3Object) => {
    try {
      await s3Service.deleteObject(bucketName, object.key);
      onRefresh();
    } catch {
      alert('Failed to delete object. Please try again.');
    }
  };

  const handleDeleteCurrentDirectory = async () => {
    if (!currentPrefix) {
      alert('Cannot delete root directory.');
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete the directory "${currentPrefix}" and all its contents?`
    );

    if (confirmed) {
      try {
        await s3Service.deleteObject(bucketName, currentPrefix);
        onRefresh();
        // Navigate to parent directory after deletion
        const parentPrefix = getParentPrefix(currentPrefix);
        onPrefixSelect?.(parentPrefix);
      } catch {
        alert('Failed to delete directory. Please try again.');
      }
    }
  };

  return (
    <div className="file-view">
      <div className="working-directory">
        <DirectoryInfo currentPrefix={currentPrefix} />
        
        <ActionButtons
          onCreateFolder={() => setIsAddFolderOpen(true)}
          onCreateFile={() => setIsAddFileOpen(true)}
          onDelete={handleDeleteCurrentDirectory}
        />
      </div>

      {objects.length === 0 ? (
        <EmptyState 
          title={BROWSER_PAGE_DEFAULTS.EMPTY_BUCKET_TITLE as string}
          message={BROWSER_PAGE_DEFAULTS.EMPTY_BUCKET_MESSAGE as string}
          icon={BROWSER_PAGE_DEFAULTS.EMPTY_BUCKET_ICON as string}
        />
      ) : (
        <FileList
          objects={objects}
          onObjectClick={handleObjectClick}
          onDelete={handleDelete}
        />
      )}

      <ModalAddFile
        isOpen={isAddFileOpen}
        onClose={() => setIsAddFileOpen(false)}
        onCreate={handleCreateFile}
        existingFiles={existingFiles}
      />

      <ModalAddFolder
        isOpen={isAddFolderOpen}
        onClose={() => setIsAddFolderOpen(false)}
        onCreate={handleCreateFolder}
        existingFolders={existingFolders}
      />
    </div>
  );
};

export default FileView; 