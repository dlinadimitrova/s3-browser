import React from 'react';
import type { S3Object } from '../../shared/models/interfaces';
import { useTreeData } from '../../hooks/useTreeData';
import type { TreeNode } from '../../hooks/useTreeData';
import { FiChevronDown, FiChevronRight, FiFolder } from 'react-icons/fi';
import styles from './TreeView.module.css';

const TREE_INDENTATION = {
  BASE_PADDING: 12,
  LEVEL_INCREMENT: 20,
} as const;

interface TreeViewProps {
  buckets: string[];
  currentBucket: string;
  currentPrefix: string;
  objects: S3Object[];
  expandedNodes: Set<string>;
  onBucketSelect: (bucket: string) => void;
  onPrefixSelect: (prefix: string) => void;
  onExpandedNodesChange: (nodes: Set<string>) => void;
}

const TreeView: React.FC<TreeViewProps> = ({
  currentPrefix,
  objects,
  expandedNodes,
  onPrefixSelect,
  onExpandedNodesChange,
}) => {
  const treeData = useTreeData({ objects });

  const calculateTreePadding = (level: number): number => {
    return TREE_INDENTATION.BASE_PADDING + (level * TREE_INDENTATION.LEVEL_INCREMENT);
  };

  const toggleExpanded = (path: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    onExpandedNodesChange(newExpanded);
  };

  const handleNodeDoubleClick = (path: string) => {
    onPrefixSelect(path);
  };

  const renderTreeNode = (node: TreeNode, level: number = 0): React.ReactNode => {
    const isExpanded = expandedNodes.has(node.path);
    const isActive = currentPrefix === node.path;
    const canExpand = node.hasSubdirectories;

    return (
      <div key={node.path}>
        <div 
          className={`${styles.treeItem} ${isActive ? styles.active : ''}`}
          style={{ paddingLeft: `${calculateTreePadding(level)}px` }}
          onClick={() => {
            if (canExpand) {
              toggleExpanded(node.path);
            }
          }}
          onDoubleClick={() => handleNodeDoubleClick(node.path)}
        >
          {canExpand && (
            <div className={styles.treeArrow}>
              {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
            </div>
          )}
          {!canExpand && (
            <div className={styles.treeArrowPlaceholder}></div>
          )}

          <div className={styles.treeIcon}>
            <FiFolder />
          </div>
          <div className={styles.treeLabel}>{node.name}</div>
        </div>
        {isExpanded && node.children.map(child => renderTreeNode(child, level + 1))}
      </div>
    );
  };

  return (
    <div className={styles.treeView}>
      <div className={styles.treeContent}>
        {renderTreeNode(treeData)}
      </div>
    </div>
  );
};

export default TreeView; 