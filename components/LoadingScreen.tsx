import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface LoadingScreenProps {
  fadeOut?: boolean;
  isFallback?: boolean;
}

// Rangoli Pattern - Simplified geometric mandala
const RangoliPattern: React.FC<{ progress: number; color: string }> = ({ progress, color }) => {
  const pathLength = 1200;
  const drawProgress = Math.min(progress / 40, 1); // Complete by 40%
  
  return (
    <svg 
      viewBox="0 0 200 200" 
      className="w-52 h-52 md:w-72 md:h-72 lg:w-80 lg:h-80"
      style={{ filter: `drop-shadow(0 0 30px ${color}50)` }}
    >
      <g 
        fill="none" 
        stroke={color} 
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength * (1 - drawProgress),
          transition: 'stroke-dashoffset 0.05s linear'
        }}
      >
        {/* Center lotus */}
        <circle cx="100" cy="100" r="6" />
        <circle cx="100" cy="100" r="14" />
        
        {/* Inner petals - 8 directions */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 100 100)`}>
            <path d="M100 82 Q110 68 100 52 Q90 68 100 82" />
          </g>
        ))}
        
        {/* Middle ring */}
        <circle cx="100" cy="100" r="38" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <g key={`d-${angle}`} transform={`rotate(${angle} 100 100)`}>
            <path d="M100 58 L106 62 L100 68 L94 62 Z" />
          </g>
        ))}
        
        {/* Outer decorative ring */}
        <circle cx="100" cy="100" r="58" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <g key={`o-${angle}`} transform={`rotate(${angle} 100 100)`}>
            <line x1="100" y1="58" x2="100" y2="48" />
            <circle cx="100" cy="44" r="3" />
          </g>
        ))}
        
        {/* Outermost border */}
        <circle cx="100" cy="100" r="78" />
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => (
          <g key={`s-${angle}`} transform={`rotate(${angle} 100 100)`}>
            <path d="M100 22 Q108 28 100 34 Q92 28 100 22" />
          </g>
        ))}
      </g>
    </svg>
  );
};

// Celtic Knot Pattern - Triquetra
const CelticKnotPattern: React.FC<{ progress: number; color: string }> = ({ progress, color }) => {
  const pathLength = 900;
  const drawProgress = progress <= 40 ? 0 : Math.min((progress - 40) / 60, 1);
  
  return (
    <svg 
      viewBox="0 0 200 200" 
      className="w-52 h-52 md:w-72 md:h-72 lg:w-80 lg:h-80"
      style={{ filter: `drop-shadow(0 0 30px ${color}50)` }}
    >
      <g 
        fill="none" 
        stroke={color} 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength * (1 - drawProgress),
          transition: 'stroke-dashoffset 0.05s linear'
        }}
      >
        {/* Triquetra - main loops */}
        <path d="M100 40 
                 C65 40, 45 75, 58 102 
                 C68 128, 88 135, 100 118
                 C112 135, 132 128, 142 102
                 C155 75, 135 40, 100 40" />
        
        <path d="M58 102
                 C40 118, 45 152, 72 162
                 C92 170, 100 150, 100 118" />
        
        <path d="M142 102
                 C160 118, 155 152, 128 162
                 C108 170, 100 150, 100 118" />
        
        {/* Interlace details */}
        <path d="M82 92 Q100 80 118 92" strokeWidth="2" />
        <path d="M72 122 Q84 105 100 118" strokeWidth="2" />
        <path d="M128 122 Q116 105 100 118" strokeWidth="2" />
        
        {/* Outer circle */}
        <circle cx="100" cy="105" r="75" strokeWidth="1.5" />
        
        {/* Trinity points */}
        {[0, 120, 240].map((angle) => (
          <g key={`c-${angle}`} transform={`rotate(${angle} 100 105)`}>
            <circle cx="100" cy="30" r="5" strokeWidth="2" />
          </g>
        ))}
      </g>
    </svg>
  );
};

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ fadeOut = false, isFallback = false }) => {
  const { theme, mode } = useTheme();
  const [progress, setProgress] = useState(0);
  const [gaelicText, setGaelicText] = useState('');
  
  const gaelicTarget = "DIA DHUIT";
  const latinChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Progress animation
  useEffect(() => {
    if (isFallback) return;

    const duration = 2800; // 2.8s for dramatic effect
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
    if (isFallback) {
      setGaelicText("LOADING...");
      return;
    }
    
    let iteration = 0;
    const interval = setInterval(() => {
      setGaelicText(gaelicTarget
        .split("")
        .map((letter, index) => {
          if (index < iteration) return letter;
          if (letter === ' ') return ' ';
          return latinChars[Math.floor(Math.random() * latinChars.length)];
        })
        .join("")
      );

      if (iteration >= gaelicTarget.length) clearInterval(interval);
      iteration += 1/3; 
    }, 30);

    return () => clearInterval(interval);
  }, [isFallback]);

  // Crossfade opacities
  const rangoliOpacity = progress <= 35 ? 1 : Math.max(0, 1 - (progress - 35) / 25);
  const celticOpacity = progress <= 35 ? 0 : Math.min(1, (progress - 35) / 25);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${mode.bg} ${mode.text} transition-opacity duration-700 ease-out ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Cultural Pattern Animation */}
      {!isFallback && (
        <div className="relative mb-6 md:mb-10 h-52 md:h-72 lg:h-80 w-52 md:w-72 lg:w-80">
          {/* Rangoli (fades out) */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: rangoliOpacity, transition: 'opacity 0.3s ease-out' }}
          >
            <RangoliPattern progress={progress} color={theme.hex} />
          </div>
          
          {/* Celtic Knot (fades in) */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: celticOpacity, transition: 'opacity 0.3s ease-out' }}
          >
            <CelticKnotPattern progress={progress} color={theme.hex} />
          </div>
        </div>
      )}

      {/* Heritage Greeting */}
      <div className={`text-3xl md:text-5xl lg:text-6xl font-black tracking-tight ${theme.classes.text} flex items-center gap-3 md:gap-5 select-none`}>
        {!isFallback && (
          <>
            <span className="font-devanagari">नमस्ते</span>
            <span className="opacity-50">→</span>
          </>
        )}
        <span className="font-mono uppercase">{gaelicText}</span>
      </div>

      {/* Fallback Loader */}
      {isFallback && (
        <div className={`text-4xl md:text-6xl font-black tracking-tighter animate-pulse ${theme.classes.text}`}>
          ...
        </div>
      )}

      {/* Progress Bar */}
      {!isFallback && (
        <div className="absolute bottom-0 left-0 h-1 transition-all duration-100 ease-out"
          style={{ 
            width: `${progress}%`,
            backgroundColor: theme.hex
          }}
        />
      )}
    </div>
  );
};
