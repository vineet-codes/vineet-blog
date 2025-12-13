import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface LoadingScreenProps {
  fadeOut?: boolean;
  isFallback?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ fadeOut = false, isFallback = false }) => {
  const { theme, mode } = useTheme();
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState('');
  
  const targetText = isFallback ? "LOADING DATA..." : "INITIALIZING SYSTEM...";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  // Progress animation (Only for initial splash)
  useEffect(() => {
    if (isFallback) return;

    const duration = 1800; // 1.8 seconds to reach 100%
    const steps = 100;
    const intervalTime = duration / steps;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isFallback]);

  // Decoder text effect
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(targetText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return letter;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("")
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      
      iteration += 1/3; 
    }, 30);

    return () => clearInterval(interval);
  }, [targetText]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${mode.bg} ${mode.text} transition-opacity duration-700 ease-out ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Percentage Counter - Hide in fallback mode to avoid confusing reset */}
      {!isFallback && (
        <div className={`text-9xl md:text-[12rem] font-black tracking-tighter leading-none select-none ${theme.classes.text}`}>
          {progress.toString().padStart(2, '0')}%
        </div>
      )}

      {/* Fallback Loader Indicator */}
      {isFallback && (
        <div className={`text-6xl md:text-8xl font-black tracking-tighter animate-pulse ${theme.classes.text}`}>
          ...
        </div>
      )}

      {/* Decoder Text */}
      <div className={`mt-8 font-mono text-sm md:text-base tracking-[0.5em] uppercase ${mode.textMuted}`}>
        {displayText}
      </div>

      {/* Progress Bar Line */}
      {!isFallback && (
         <div className="absolute bottom-0 left-0 h-1 transition-all duration-300 ease-out"
             style={{ 
               width: `${progress}%`,
               backgroundColor: theme.hex
             }}
        />
      )}
    </div>
  );
};
