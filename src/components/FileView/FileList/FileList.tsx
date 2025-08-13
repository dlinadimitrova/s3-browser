import React from 'react';
import type { S3Object } from '../../../shared/models/interfaces';
import { formatFileSize, getFileName, getFolderName } from '../../../shared/utils';
import { FiFolder, FiFile, FiTrash2 } from 'react-icons/fi';
import './FileList.css';

interface FileListProps {
  objects: S3Object[];
  onObjectClick: (object: S3Object) => void;
  onDelete: (object: S3Object) => void;
}

const FileList: React.FC<FileListProps> = ({ objects, onObjectClick, onDelete }) => {
  const handleObjectClick = (object: S3Object) => {
    onObjectClick(object);
  };

  const handleDelete = (e: React.MouseEvent, object: S3Object) => {
    e.stopPropagation();
    const itemType = object.isDirectory ? 'directory' : 'file';
    const itemName = object.isDirectory ? getFolderName(object.key) : getFileName(object.key);
    
    if (window.confirm(`Are you sure you want to delete the ${itemType} "${itemName}"?`)) {
      onDelete(object);
    }
  };

  const handleOpen = (e: React.MouseEvent, object: S3Object) => {
    e.stopPropagation();
    onObjectClick(object);
  };

  return (
    <div className="file-list">
      <table className="file-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {objects.map((object) => (
            <tr
              key={object.key}
              className={`file-row ${object.isDirectory ? 'directory' : 'file'}`}
              onClick={() => handleObjectClick(object)}
            >
              <td className="file-name">
                <span className="file-icon">
                  {object.isDirectory ? <FiFolder /> : <FiFile />}
                </span>
                {object.isDirectory ? getFolderName(object.key) : getFileName(object.key)}
              </td>
              <td className="file-size">{formatFileSize(object.size)}</td>
              <td className="file-actions">
                <button
                  className="open-btn"
                  onClick={(e) => handleOpen(e, object)}
                  title="Open"
                >
                  Open
                </button>
                <button
                  className="delete-btn"
                  onClick={(e) => handleDelete(e, object)}
                  title={`Delete ${object.isDirectory ? 'directory' : 'file'}`}
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList; 