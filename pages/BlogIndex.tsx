import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { BlogPost } from '../types';

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
             <div key={post.slug} onClick={() => navigate(`/blog/${post.slug}`, { state: { from: 'index' } })} className={`group cursor-pointer relative overflow-hidden border-b ${mode.border}`} style={{ animationDelay: `${index * 50}ms` }}>
               <div className={`flex flex-col md:flex-row items-baseline md:items-center justify-between py-8 px-4 transition-all duration-300 ${mode.cardHover} ${theme.classes.hoverText} hover:${mode.textInverse}`}>
                 <div className="flex flex-col md:flex-row items-baseline md:items-center w-full transition-transform duration-300 group-hover:translate-x-4">
                    <div className={`font-mono text-xs md:text-sm w-32 uppercase ${mode.textMuted} group-hover:text-current opacity-80 mb-2 md:mb-0 flex-shrink-0`}>{post.date}</div>
                    <div className="flex-1 min-w-0 mr-4"><h2 className={`text-2xl md:text-4xl font-bold ${mode.text} group-hover:text-current transition-colors truncate`}>{post.title}</h2></div>
                    <div className="hidden md:flex gap-2 w-64 justify-end flex-shrink-0">{post.tags.map(tag => (<span key={tag} className={`font-mono text-[10px] uppercase border ${mode.border} ${mode.textMuted} px-2 py-1 group-hover:border-current group-hover:text-current`}>{tag}</span>))}</div>
                 </div>
                 <div className={`absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0 group-hover:-translate-y-2 text-current text-xl hidden md:block`}>→</div>
               </div>
             </div>
           ))}
           {filteredIndexPosts.length === 0 && <div className={`py-12 text-center font-mono ${mode.textMuted}`}>No items found matching your query.</div>}
         </div>
       </div>
    </div>
  );
};

export default BlogIndex;

