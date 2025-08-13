import React from 'react';
import TreeView from '../components/TreeView/TreeView';
import FileView from '../components/FileView/FileView';
import ResizablePanels from '../components/ResizablePanels/ResizablePanels';
import { ErrorState } from '../shared/components';
import { ERROR_STATE_DEFAULTS } from '../shared/constants/constants';
import type { AWSCredentials } from '../shared/models/interfaces';
import { useS3Browser } from '../hooks/useS3Browser';

export interface BrowserPageProps {
  credentials: AWSCredentials;
  bucketName: string;
}

const BrowserPage: React.FC<BrowserPageProps> = ({ credentials, bucketName }) => {
  const {
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
  } = useS3Browser({ credentials, bucketName });



  if (error) {
    return (
      <div className="browser-page">
        <div className="browser-layout">
          <ErrorState 
            title={ERROR_STATE_DEFAULTS.TITLE}
            message={error}
            icon={ERROR_STATE_DEFAULTS.ICON}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="browser-page">
      <ResizablePanels
        leftPanel={
          <TreeView
            buckets={[bucketName]}
            currentBucket={bucketName}
            currentPrefix={currentPrefix}
            objects={allObjects}
            expandedNodes={expandedNodes}
            onBucketSelect={() => {}}
            onPrefixSelect={setCurrentPrefix}
            onExpandedNodesChange={setExpandedNodes}
          />
        }
        rightPanel={
          <FileView
            currentPrefix={currentPrefix}
            objects={objects}
            s3Service={s3Service}
            bucketName={bucketName}
            onRefresh={refresh}
            onPrefixSelect={setCurrentPrefix}
            loading={loading}
          />
        }
        initialLeftWidth={300}
        minLeftWidth={200}
        maxLeftWidth={500}
      />
    </div>
  );
};

export default BrowserPage; 