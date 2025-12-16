import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { BlogPost } from '../types';
import BlogPostItem from '../components/BlogPostItem';

interface BlogIndexProps {
  posts: BlogPost[];
}

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
  const { mode, theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredIndexPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={`animate-[fadeIn_0.5s_ease-out] min-h-screen flex flex-col ${mode.bg} p-6 md:p-12 lg:p-24`}>
       <div className="max-w-7xl mx-auto w-full">
         <div className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b-4 ${mode.borderStrong} pb-6`}>
           <div>
             <Link to="/" className={`mb-8 font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:pl-2 transition-all ${theme.classes.text}`}>← Return Home</Link>
             <h1 className={`text-6xl md:text-8xl font-black ${mode.text} tracking-tighter`}>INDEX</h1>
           </div>
           <div className="w-full md:w-auto mt-8 md:mt-0">
             <input 
               type="text" 
               placeholder="Filter index..." 
               value={searchQuery} 
               onChange={(e) => setSearchQuery(e.target.value)} 
               className={`w-full md:w-64 bg-transparent border-b ${mode.inputBorder} py-2 font-mono text-sm uppercase tracking-widest focus:outline-none focus:${mode.borderStrong} ${mode.text} transition-colors ${theme.classes.placeholder}`} 
             />
           </div>
         </div>
        <div className="space-y-0">
          {filteredIndexPosts.map((post, index) => (
            <BlogPostItem
              key={post.slug}
              post={post}
              onClick={() => navigate(`/blog/${post.slug}`, { state: { from: 'index' } })}
              index={index}
            />
          ))}
          {filteredIndexPosts.length === 0 && <div className={`py-12 text-center font-mono ${mode.textMuted}`}>No items found matching your query.</div>}
        </div>
       </div>
    </div>
  );
};

export default BlogIndex;

