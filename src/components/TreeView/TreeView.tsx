import React from 'react';
import type { S3Object } from '../../shared/models/interfaces';
import { useTreeData } from '../../hooks/useTreeData';
import type { TreeNode } from '../../hooks/useTreeData';
import { FiChevronDown, FiChevronRight, FiCircle, FiFolder } from 'react-icons/fi';
import './TreeView.css';

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
    const hasChildren = node.children.length > 0;
    const canExpand = node.hasSubdirectories;

    return (
      <div key={node.path}>
        <div 
          className={`tree-item ${isActive ? 'active' : ''}`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          onClick={() => {
            if (canExpand) {
              toggleExpanded(node.path);
            }
          }}
          onDoubleClick={() => handleNodeDoubleClick(node.path)}
        >
          {canExpand && (
            <span className={`tree-arrow ${isExpanded ? 'expanded' : ''}`}>
              {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
            </span>
          )}
          {!canExpand && hasChildren && (
            <span className="tree-arrow-placeholder">
              <FiCircle />
            </span>
          )}
          <span className="tree-icon">
            <FiFolder />
          </span>
          <span className="tree-label">{node.name}</span>
        </div>
        {isExpanded && node.children.map(child => renderTreeNode(child, level + 1))}
      </div>
    );
  };

  return (
    <div className="tree-view">
      <div className="tree-content">
        {renderTreeNode(treeData)}
      </div>
    </div>
  );
};

export default TreeView; 