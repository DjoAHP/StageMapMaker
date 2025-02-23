import React, { useRef, useEffect, useState } from 'react';
import { RotateCw, Trash2, Maximize2 } from 'lucide-react';

interface DraggableElementProps {
  id: string;
  type: string;
  initialPosition: { x: number; y: number };
  initialRotation: number;
  icon: React.ReactNode;
  onDelete: (id: string) => void;
}

export const DraggableElement: React.FC<DraggableElementProps> = ({
  id,
  type,
  initialPosition,
  initialRotation,
  icon,
  onDelete,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [rotation, setRotation] = useState(initialRotation);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isResizing, setIsResizing] = useState(false);

  const snapToGrid = (value: number, gridSize: number = 20) => {
    return Math.round(value / gridSize) * gridSize;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (elementRef.current && !isResizing) {
      const rect = elementRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleRotate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRotation((prev) => (prev + 45) % 360);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isResizing && elementRef.current) {
        const parent = elementRef.current.parentElement;
        if (parent) {
          const rect = parent.getBoundingClientRect();
          const x = snapToGrid(e.clientX - rect.left - dragOffset.x);
          const y = snapToGrid(e.clientY - rect.top - dragOffset.y);
          setPosition({ x, y });
        }
      } else if (isResizing && elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const deltaX = e.clientX - (rect.left + rect.width);
        setScale((prev) => Math.max(0.5, Math.min(2, prev + deltaX * 0.01)));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset]);

  return (
    <div
      ref={elementRef}
      className={`absolute cursor-move p-3 bg-glass rounded-lg border border-glass-border backdrop-blur-glass transition-colors ${
        isDragging ? 'bg-opacity-80' : 'hover:bg-opacity-60'
      }`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
        touchAction: 'none',
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="relative group">
        {icon}
        <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-1 bg-glass rounded-full border border-glass-border hover:bg-white/20 transition-colors"
            onClick={handleRotate}
            title="Rotate"
          >
            <RotateCw size={12} />
          </button>
          <button
            className="p-1 bg-glass rounded-full border border-glass-border hover:bg-red-500/20 transition-colors"
            onClick={handleDelete}
            title="Delete"
          >
            <Trash2 size={12} />
          </button>
          <button
            className="p-1 bg-glass rounded-full border border-glass-border hover:bg-white/20 transition-colors cursor-se-resize"
            onMouseDown={handleResizeStart}
            title="Resize"
          >
            <Maximize2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};