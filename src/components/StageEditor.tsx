import React, { useState } from 'react';
import { Guitar, Drum, Mic, Speaker, Users } from 'lucide-react';
import { ElementLibrary } from './ElementLibrary';
import { StagePlan } from './StagePlan';
import { DraggableElement } from './DraggableElement';
import { CameraIcon } from './CustomSvgIcon';

interface StageElement {
  id: string;
  type: string;
  position: { x: number; y: number };
  rotation: number;
}

const elementIcons: Record<string, React.ReactNode> = {
  guitar: <Guitar className="w-8 h-8" />,
  drums: <Drum className="w-8 h-8" />,
  mic: <Mic className="w-8 h-8" />,
  speaker: <Speaker className="w-8 h-8" />,
  musician: <Users className="w-8 h-8" />,
  camera: <CameraIcon />,
};

export const StageEditor: React.FC = () => {
  const [elements, setElements] = useState<StageElement[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData('element');
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setElements([
      ...elements,
      {
        id: `${elementType}-${Date.now()}`,
        type: elementType,
        position: { x, y },
        rotation: 0
      }
    ]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDeleteElement = (id: string) => {
    setElements(elements.filter(element => element.id !== id));
  };

  return (
    <div className="flex h-full gap-4 rounded-xl overflow-hidden">
      <ElementLibrary />
      <div 
        className="flex-1"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <StagePlan>
          {elements.map((element) => (
            <DraggableElement
              key={element.id}
              id={element.id}
              type={element.type}
              initialPosition={element.position}
              initialRotation={element.rotation}
              icon={elementIcons[element.type]}
              onDelete={handleDeleteElement}
            />
          ))}
        </StagePlan>
      </div>
    </div>
  );
};