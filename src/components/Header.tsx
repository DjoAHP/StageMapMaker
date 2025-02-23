import React from 'react';
import { Music } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-glass backdrop-blur-glass border-b border-glass-border p-4">
      <div className="container mx-auto flex items-center gap-3">
        <Music className="w-8 h-8" />
        <h1 className="text-2xl font-bold">StageMapMaker</h1>
      </div>
    </header>
  );
};