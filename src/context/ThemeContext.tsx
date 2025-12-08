import React, { createContext, useContext, useState, ReactNode } from 'react';
import { THEMES, ThemeKey } from '../constants';

type Mode = {
  bg: string;
  text: string;
  textMuted: string;
  textSub: string;
  textInverse: string;
  border: string;
  borderStrong: string;
  cardHover: string;
  grid: string;
  prose: string;
  quoteBg: string;
  inputBorder: string;
  footerBg: string;
  logoFilter: string;
};

interface ThemeContextType {
  activeThemeKey: ThemeKey;
  setActiveThemeKey: (key: ThemeKey) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  theme: any;
  mode: Mode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeThemeKey, setActiveThemeKey] = useState<ThemeKey>('red');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = THEMES[activeThemeKey];

  const mode = isDarkMode ? {
    bg: 'bg-stone-950',
    text: 'text-stone-50',
    textMuted: 'text-stone-500',
    textSub: 'text-stone-400',
    textInverse: 'text-stone-950',
    border: 'border-stone-800',
    borderStrong: 'border-stone-100',
    cardHover: 'hover:bg-stone-900',
    grid: 'bg-grid-dark',
    prose: 'prose-invert',
    quoteBg: 'bg-stone-900',
    inputBorder: 'border-stone-700',
    footerBg: 'bg-stone-900',
    logoFilter: 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 brightness-125'
  } : {
    bg: 'bg-stone-50',
    text: 'text-stone-900',
    textMuted: 'text-stone-400',
    textSub: 'text-stone-600',
    textInverse: 'text-stone-50',
    border: 'border-stone-200',
    borderStrong: 'border-stone-900',
    cardHover: 'hover:bg-stone-100',
    grid: 'bg-grid',
    prose: 'prose-stone',
    quoteBg: 'bg-stone-100',
    inputBorder: 'border-stone-300',
    footerBg: 'bg-stone-100',
    logoFilter: 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 mix-blend-multiply'
  };

  return (
    <ThemeContext.Provider value={{
      activeThemeKey,
      setActiveThemeKey,
      isDarkMode,
      setIsDarkMode,
      theme,
      mode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

