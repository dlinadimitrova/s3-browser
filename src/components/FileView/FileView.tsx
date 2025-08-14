import React, { useState } from 'react';
import type { S3Object, S3Service } from '../../shared/models/interfaces';
import { ModalAddFile, ModalAddFolder, ModalShowContent } from '../../shared/dialogs';
import { EmptyState, LoadingState } from '../../shared/components';
import { BROWSER_PAGE_DEFAULTS, LOADING_STATE_DEFAULTS } from '../../shared/constants/constants';
import { isDirectory, getParentPrefix, getFileName } from '../../shared/utils/fileUtils';
import ActionButtons from './ActionButtons/ActionButtons';
import DirectoryInfo from './DirectoryInfo/DirectoryInfo';
import FileList from './FileList/FileList';
import styles from './FileView.module.css';

interface FileViewProps {
  currentPrefix: string;
  objects: S3Object[];
  s3Service: S3Service;
  bucketName: string;
  onRefresh: () => void;
  onPrefixSelect?: (prefix: string) => void;
  loading?: boolean;
}

const FileView: React.FC<FileViewProps> = ({
  currentPrefix,
  objects,
  s3Service,
  bucketName,
  onRefresh,
  onPrefixSelect,
  loading = false,
}) => {
  const [isAddFileOpen, setIsAddFileOpen] = useState(false);
  const [isAddFolderOpen, setIsAddFolderOpen] = useState(false);
  const [isShowContentOpen, setIsShowContentOpen] = useState(false);
  const [fileContent, setFileContent] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

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

  const handleObjectClick = async (object: S3Object) => {
    if (object.isDirectory) {
      onPrefixSelect?.(object.key);
    } else {
      try {
        const fileName = getFileName(object.key);
        setSelectedFileName(fileName);
        setFileContent('Loading file content...');
        setIsShowContentOpen(true);
        
        const content = await s3Service.getObjectContent(bucketName, object.key);
        setFileContent(content || 'File is empty or could not be read.');
      } catch {
        setFileContent('Failed to load file content. The file might be too large, binary, or inaccessible.');
      }
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
        const parentPrefix = getParentPrefix(currentPrefix);
        onPrefixSelect?.(parentPrefix);
      } catch {
        alert('Failed to delete directory. Please try again.');
      }
    }
  };

  return (
    <div className={styles.fileView}>
      <div className={styles.workingDirectory}>
        <DirectoryInfo 
          currentPrefix={currentPrefix} 
          onPrefixSelect={onPrefixSelect}
        />
        
        <ActionButtons
          onCreateFolder={() => setIsAddFolderOpen(true)}
          onCreateFile={() => setIsAddFileOpen(true)}
          onDelete={handleDeleteCurrentDirectory}
        />
      </div>

      {loading && (
        <LoadingState 
          message={LOADING_STATE_DEFAULTS.MESSAGE}
          icon={LOADING_STATE_DEFAULTS.ICON}
        />
      )}

      {objects.length === 0 && !loading ? (
        <EmptyState 
          title={BROWSER_PAGE_DEFAULTS.EMPTY_BUCKET_TITLE}
          message={BROWSER_PAGE_DEFAULTS.EMPTY_FOLDER_MESSAGE}
          icon={BROWSER_PAGE_DEFAULTS.EMPTY_BUCKET_ICON}
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

      <ModalShowContent
        isOpen={isShowContentOpen}
        onClose={() => setIsShowContentOpen(false)}
        title={selectedFileName}
        content={fileContent}
      />
    </div>
  );
};

export default FileView; 