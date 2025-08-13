import React, { useState, useRef, useCallback } from 'react';
import { RESIZABLE_PANELS_DEFAULTS } from '../../shared/constants/constants';
import './ResizablePanels.css';

interface ResizablePanelsProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  initialLeftWidth?: number;
  minLeftWidth?: number;
  maxLeftWidth?: number;
}

const ResizablePanels: React.FC<ResizablePanelsProps> = ({
  leftPanel,
  rightPanel,
  initialLeftWidth = RESIZABLE_PANELS_DEFAULTS.INITIAL_LEFT_WIDTH,
  minLeftWidth = RESIZABLE_PANELS_DEFAULTS.MIN_LEFT_WIDTH,
  maxLeftWidth = RESIZABLE_PANELS_DEFAULTS.MAX_LEFT_WIDTH,
}) => {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newLeftWidth = e.clientX - containerRect.left;
    
    const clampedWidth = Math.max(minLeftWidth, Math.min(maxLeftWidth, newLeftWidth));
    setLeftWidth(clampedWidth);
  }, [isDragging, minLeftWidth, maxLeftWidth]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div ref={containerRef} className="resizable-panels">
      <div 
        className="left-panel"
        style={{ width: `${leftWidth}px` }}
      >
        {leftPanel}
      </div>
      
      <div 
        className={`resizer ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
      />
      
      <div className="right-panel">
        {rightPanel}
      </div>
    </div>
  );
};

export default ResizablePanels; 