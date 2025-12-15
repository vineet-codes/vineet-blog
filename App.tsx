import React, { useState, useEffect, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { THEMES, ThemeKey } from './constants';
import { useTheme } from './context/ThemeContext';
import { LoadingScreen } from './components/LoadingScreen';
import { getAllPosts } from './src/lib/content';

const Home = React.lazy(() => import('./pages/Home'));
const BlogIndex = React.lazy(() => import('./pages/BlogIndex'));
const Post = React.lazy(() => import('./pages/Post'));
const TravelLog = React.lazy(() => import('./pages/TravelLog'));

// Get posts at module load time (they're pre-built)
const posts = getAllPosts();

const App: React.FC = () => {
  const { activeThemeKey, setActiveThemeKey, isDarkMode, setIsDarkMode, theme, mode } = useTheme();
  
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Initial Splash Screen Timer & Preloading
  useEffect(() => {
    // Preload lazy components to minimize Suspense fallback
    import('./pages/Home');
    import('./pages/BlogIndex');
    import('./pages/TravelLog');
    import('./pages/Post');

    // Start fade out at 2.5s
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Remove splash at 3.2s (giving time for fade transition)
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className={`min-h-screen ${mode.bg} ${mode.text} ${mode.grid} transition-colors duration-500`}>
      <style>{`
        ::selection {
          background-color: ${theme.hex} !important;
          color: white;
        }
        ::-webkit-scrollbar-thumb {
          background-color: ${theme.hex} !important;
        }
      `}</style>

      {/* CONTROLS COMPONENT (Colors & Dark Mode) */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-4 items-end">
        
        {/* Color Picker */}
        <div className={`flex flex-col-reverse md:flex-row gap-2 p-2 ${isDarkMode ? 'bg-stone-900/90 border-stone-800' : 'bg-stone-50/90 border-stone-200'} backdrop-blur rounded-full border shadow-sm`}>
          {Object.keys(THEMES).map((key) => (
            <button
              key={key}
              onClick={() => setActiveThemeKey(key as ThemeKey)}
              className={`w-4 h-4 rounded-full transition-transform hover:scale-110 ${activeThemeKey === key ? 'ring-2 ring-offset-1 ring-stone-400 scale-110' : ''}`}
              style={{ backgroundColor: THEMES[key as ThemeKey].hex }}
              aria-label={`Select ${key} theme`}
            />
          ))}
          <div className="h-px w-full md:w-px md:h-4 bg-stone-400/20 my-1 md:my-0 md:mx-1"></div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-4 h-4 flex items-center justify-center rounded-full transition-colors hover:text-stone-500 ${mode.textSub}`}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
               // Moon Icon
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            ) : (
               // Sun Icon
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            )}
          </button>
        </div>
      </div>

      {showSplash ? (
        <LoadingScreen fadeOut={fadeOut} />
      ) : (
        <HashRouter>
          <Suspense fallback={<LoadingScreen isFallback />}>
            <Routes>
              <Route path="/" element={<Home posts={posts} loadingPosts={false} />} />
              <Route path="/index" element={<BlogIndex posts={posts} />} />
              <Route path="/travel" element={<TravelLog />} />
              <Route path="/blog/:slug" element={<Post posts={posts} loadingPosts={false} />} />
            </Routes>
          </Suspense>
        </HashRouter>
      )}
    </div>
  );
};

export default App;
