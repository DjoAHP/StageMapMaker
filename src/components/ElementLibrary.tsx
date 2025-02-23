import React, { useState } from 'react';
import { Music, Mic, Speaker, Users, Guitar, Drum, ChevronDown, Camera } from 'lucide-react';
import { CameraIcon } from './CustomSvgIcon';

const categories = [
  {
    name: 'All Elements',
    icon: <Music className="w-5 h-5" />,
    elements: [
      { id: 'guitar', name: 'Guitar', icon: <Guitar className="w-8 h-8" /> },
      { id: 'drums', name: 'Drums', icon: <Drum className="w-8 h-8" /> },
      { id: 'mic', name: 'Microphone', icon: <Mic className="w-8 h-8" /> },
      { id: 'speaker', name: 'Speaker', icon: <Speaker className="w-8 h-8" /> },
      { id: 'musician', name: 'Musician', icon: <Users className="w-8 h-8" /> },
      { id: 'camera', name: 'Camera', icon: <CameraIcon /> },
    ]
  },
  {
    name: 'Instruments',
    icon: <Music className="w-5 h-5" />,
    elements: [
      { id: 'guitar', name: 'Guitar', icon: <Guitar className="w-8 h-8" /> },
      { id: 'drums', name: 'Drums', icon: <Drum className="w-8 h-8" /> },
    ]
  },
  {
    name: 'Sound',
    icon: <Speaker className="w-5 h-5" />,
    elements: [
      { id: 'mic', name: 'Microphone', icon: <Mic className="w-8 h-8" /> },
      { id: 'speaker', name: 'Speaker', icon: <Speaker className="w-8 h-8" /> },
    ]
  },
  {
    name: 'People',
    icon: <Users className="w-5 h-5" />,
    elements: [
      { id: 'musician', name: 'Musician', icon: <Users className="w-8 h-8" /> },
    ]
  },
  {
    name: 'Custom',
    icon: <Camera className="w-5 h-5" />,
    elements: [
      { id: 'camera', name: 'Camera', icon: <CameraIcon /> },
    ]
  }
];

export const ElementLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Elements');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onDragStart = (e: React.DragEvent, elementId: string) => {
    e.dataTransfer.setData('element', elementId);
  };

  return (
    <div className="w-64 h-full bg-glass backdrop-blur-glass border-r border-glass-border p-4 space-y-6">
      <h2 className="text-xl font-semibold text-white/90">Elements</h2>
      
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2">
            {categories.find(c => c.name === selectedCategory)?.icon}
            <span>{selectedCategory}</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-glass backdrop-blur-glass border border-glass-border rounded-lg overflow-hidden">
            {categories.map((category) => (
              <button
                key={category.name}
                className="w-full flex items-center gap-2 p-2 hover:bg-white/10 transition-colors"
                onClick={() => {
                  setSelectedCategory(category.name);
                  setIsDropdownOpen(false);
                }}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {categories
          .find(c => c.name === selectedCategory)
          ?.elements.map((element) => (
            <div
              key={element.id}
              draggable
              onDragStart={(e) => onDragStart(e, element.id)}
              className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg cursor-move hover:bg-white/10 transition-colors"
            >
              {element.icon}
              <span className="text-sm text-white/70 mt-1">{element.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
};