import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface LoadingScreenProps {
  fadeOut?: boolean;
  isFallback?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ fadeOut = false, isFallback = false }) => {
  const { theme, mode } = useTheme();
  const [progress, setProgress] = useState(0);
  const [gaelicText, setGaelicText] = useState('');
  
  // Target text for Gaelic decoder
  const gaelicTarget = "DIA DHUIT";
  const latinChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

  // Decoder text effect for Gaelic part only
  useEffect(() => {
    if (isFallback) {
      setGaelicText("LOADING...");
      return;
    }
    
    let iteration = 0;
    const interval = setInterval(() => {
      setGaelicText(gaelicTarget
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return letter;
          }
          if (letter === ' ') return ' ';
          return latinChars[Math.floor(Math.random() * latinChars.length)];
        })
        .join("")
      );

      if (iteration >= gaelicTarget.length) {
        clearInterval(interval);
      }
      
      iteration += 1/3; 
    }, 30);

    return () => clearInterval(interval);
  }, [isFallback]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${mode.bg} ${mode.text} transition-opacity duration-700 ease-out ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Heritage Greeting - Namaste → Dia Dhuit (MAIN HERO) */}
      <div className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tight ${theme.classes.text} flex items-center gap-4 md:gap-6 select-none`}>
        {!isFallback && (
          <>
            <span className="font-devanagari">नमस्ते</span>
            <span className="opacity-60">→</span>
          </>
        )}
        <span className="font-mono uppercase">{gaelicText}</span>
      </div>

      {/* Percentage Counter - Secondary, muted */}
      {!isFallback && (
        <div className={`mt-6 text-2xl md:text-4xl font-mono tracking-widest leading-none select-none ${mode.textMuted}`}>
          {progress.toString().padStart(2, '0')}%
        </div>
      )}

      {/* Fallback Loader Indicator */}
      {isFallback && (
        <div className={`mt-6 text-2xl md:text-4xl font-mono tracking-widest animate-pulse ${mode.textMuted}`}>
          ...
        </div>
      )}

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
