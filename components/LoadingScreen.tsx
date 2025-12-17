import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface LoadingScreenProps {
  fadeOut?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ fadeOut = false }) => {
  const { mode, isDarkMode } = useTheme();

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 ${mode.bg} transition-opacity duration-500 ease-out ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Cultural icons */}
      <div className="flex items-center gap-4 text-2xl">
        <span>🙏</span>
        <span>☘️</span>
      </div>
      
      {/* Animated line - grows from center */}
      <div className={`h-px w-24 ${isDarkMode ? 'bg-stone-800' : 'bg-stone-200'} overflow-hidden`}>
        <div 
          className={`h-full ${isDarkMode ? 'bg-stone-400' : 'bg-stone-600'} animate-loading-line`}
        />
      </div>
    </div>
  );
};
