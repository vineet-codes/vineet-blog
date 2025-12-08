import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { marked } from 'marked';
import { useTheme } from '../context/ThemeContext';
import { BlogPost } from '../types';

interface PostProps {
  posts: BlogPost[];
  loadingPosts: boolean;
}

const Post: React.FC<PostProps> = ({ posts, loadingPosts }) => {
  const { slug } = useParams<{ slug: string }>();
  const { mode, theme, isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [linkCopied, setLinkCopied] = useState(false);

  const selectedPost = posts.find(p => p.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    if (!selectedPost) return;
    
    const url = window.location.href; 
    const text = `Read "${selectedPost.title}" by Vineet Singh`;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else {
      navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const navigateBack = () => {
    const from = (location.state as any)?.from;
    if (from === 'index') {
      navigate('/index');
    } else {
      navigate('/');
    }
  };

  if (loadingPosts) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${mode.bg} ${mode.text}`}>
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!selectedPost) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${mode.bg} ${mode.text}`}>
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <button onClick={() => navigate('/')} className={`underline ${theme.classes.text}`}>Return Home</button>
      </div>
    );
  }

  return (
    <article className={`animate-[fadeIn_0.5s_ease-out] min-h-screen flex flex-col ${mode.bg}`}>
      <div className="p-6 md:p-12 lg:p-24 max-w-4xl mx-auto w-full flex-grow">
        <button 
          onClick={navigateBack}
          className={`mb-12 font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:pl-2 transition-all ${theme.classes.text}`}
        >
          ← Back to {(location.state as any)?.from === 'index' ? 'Index' : 'Profile'}
        </button>

        <div className={`mb-12 pb-12 border-b-2 ${mode.borderStrong}`}>
           <div className="flex gap-4 mb-6">
             {selectedPost.tags.map(tag => (
               <span key={tag} className={`font-mono text-xs border ${mode.border} px-2 py-1 uppercase ${mode.textMuted}`}>{tag}</span>
             ))}
           </div>
           <h1 className={`text-4xl md:text-6xl lg:text-8xl font-black ${mode.text} mb-8 leading-[0.95] tracking-tight`}>
             {selectedPost.title}
           </h1>
           <div className={`flex justify-between items-end border-t ${mode.border} pt-4`}>
             <p className={`font-mono text-sm uppercase tracking-widest ${theme.classes.text}`}>
               Published: {selectedPost.date}
             </p>
             <p className={`font-mono ${mode.textMuted} text-xs uppercase tracking-widest`}>
                Author: Vineet Singh
             </p>
           </div>
        </div>

        <div 
          className={`prose ${mode.prose} prose-lg md:prose-xl max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight
          prose-p:font-serif prose-p:leading-relaxed
          prose-a:no-underline hover:prose-a:underline ${theme.classes.proseLink}
          prose-blockquote:border-l-4 prose-blockquote:p-6 prose-blockquote:italic ${mode.quoteBg} ${theme.classes.proseQuote}`}
          dangerouslySetInnerHTML={{ __html: marked.parse(selectedPost.content) }} 
        />
      </div>
      
      <div className={`w-full ${mode.footerBg} border-t ${mode.border} py-16 px-6`}>
        <div className="max-w-4xl mx-auto text-center">
          <h4 className={`font-mono text-xs uppercase tracking-widest ${mode.textMuted} mb-8`}>Share this log</h4>
          <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
            <button onClick={() => handleShare('twitter')} className={`font-mono text-sm uppercase tracking-widest border ${mode.border} px-6 py-3 ${isDarkMode ? 'bg-stone-800 text-stone-200' : 'bg-white text-stone-900'} hover:border-stone-500 hover:bg-stone-500 hover:text-white transition-colors`}>Twitter / X</button>
            <button onClick={() => handleShare('linkedin')} className={`font-mono text-sm uppercase tracking-widest border ${mode.border} px-6 py-3 ${isDarkMode ? 'bg-stone-800 text-stone-200' : 'bg-white text-stone-900'} hover:border-stone-500 hover:bg-stone-500 hover:text-white transition-colors`}>LinkedIn</button>
            <button onClick={() => handleShare('copy')} className={`font-mono text-sm uppercase tracking-widest border ${mode.border} px-6 py-3 ${isDarkMode ? 'bg-stone-800 text-stone-200' : 'bg-white text-stone-900'} hover:border-stone-500 hover:bg-stone-500 hover:text-white transition-colors min-w-[160px]`}>{linkCopied ? 'Copied!' : 'Copy Link'}</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;

