import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { THEMES, ThemeKey, BLOG_FILES } from './constants';
import { BlogPost } from './types';
import { parseMarkdownFile } from './utils/markdown';
import { useTheme } from './context/ThemeContext';
import Home from './pages/Home';
import BlogIndex from './pages/BlogIndex';
import Post from './pages/Post';

const App: React.FC = () => {
  const { activeThemeKey, setActiveThemeKey, isDarkMode, setIsDarkMode, theme, mode } = useTheme();
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const loadedPosts = await Promise.all(
          BLOG_FILES.map(async (filename) => {
            const response = await fetch(`./blog/${filename}`);
            if (!response.ok) throw new Error(`Failed to load ${filename}`);
            const text = await response.text();
            return parseMarkdownFile(filename, text);
          })
        );

        // Sort posts by date (newest first) to handle dynamic ordering
        loadedPosts.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          // Handle invalid dates safely
          if (isNaN(dateA)) return 1; 
          if (isNaN(dateB)) return -1;
          return dateB - dateA;
        });

        setPosts(loadedPosts);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
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
        <div className={`flex gap-2 p-2 ${isDarkMode ? 'bg-stone-900/90 border-stone-800' : 'bg-stone-50/90 border-stone-200'} backdrop-blur rounded-full border shadow-sm`}>
          {Object.keys(THEMES).map((key) => (
            <button
              key={key}
              onClick={() => setActiveThemeKey(key as ThemeKey)}
              className={`w-4 h-4 rounded-full transition-transform hover:scale-110 ${activeThemeKey === key ? 'ring-2 ring-offset-1 ring-stone-400 scale-110' : ''}`}
              style={{ backgroundColor: THEMES[key as ThemeKey].hex }}
              aria-label={`Select ${key} theme`}
            />
          ))}
          <div className="w-px bg-stone-400/20 mx-1"></div>
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

      <HashRouter>
        <Routes>
          <Route path="/" element={<Home posts={posts} loadingPosts={loadingPosts} />} />
          <Route path="/index" element={<BlogIndex posts={posts} />} />
          <Route path="/blog/:slug" element={<Post posts={posts} loadingPosts={loadingPosts} />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
