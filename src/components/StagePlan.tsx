import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Grid, Calendar } from 'lucide-react';

interface StagePlanProps {
  children: React.ReactNode;
}

export const StagePlan: React.FC<StagePlanProps> = ({ children }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [title, setTitle] = useState('Stage Plan');
  const [date, setDate] = useState(new Date().toLocaleDateString('fr-FR'));
  const [bgColor, setBgColor] = useState('#1a1a1a');

  const exportAsPNG = async () => {
    if (stageRef.current) {
      const dataUrl = await toPng(stageRef.current);
      const link = document.createElement('a');
      link.download = 'stage-plan.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="mb-4 flex gap-4 items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-glass backdrop-blur-glass border border-glass-border rounded-lg px-4 py-2 text-xl font-bold"
          placeholder="Enter title"
        />
        <div className="flex items-center gap-2 bg-glass backdrop-blur-glass border border-glass-border rounded-lg px-4 py-2">
          <Calendar size={16} />
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-transparent w-24"
            placeholder="DD/MM/YYYY"
          />
        </div>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="h-10 w-10 rounded cursor-pointer"
          title="Background color"
        />
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`p-2 rounded-lg border ${
            showGrid ? 'bg-white/20 border-white/40' : 'bg-glass border-glass-border'
          }`}
          title="Toggle grid"
        >
          <Grid size={20} />
        </button>
      </div>
      
      <div 
        ref={stageRef}
        className="flex-1 relative rounded-xl backdrop-blur-glass border border-glass-border p-4"
        style={{
          backgroundColor: bgColor,
          backgroundImage: showGrid
            ? `
                repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 20px),
                repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 20px)
              `
            : 'none'
        }}
      >
        {children}
      </div>
      
      <button
        onClick={exportAsPNG}
        className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-glass rounded-lg backdrop-blur-glass border border-glass-border hover:bg-opacity-80 transition-all"
      >
        <Download size={16} />
        Export PNG
      </button>
    </div>
  );
};