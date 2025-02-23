import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-black text-white">
      <Header />
      <main className="container mx-auto p-4 h-[calc(100vh-80px)]">
        {children}
      </main>
    </div>
  );
};