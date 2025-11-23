
import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { EXPERIENCE, EDUCATION, PUBLICATIONS, CERTIFICATIONS, SUMMARY, CONTACT, BLOG_FILES, PROFILE_IMAGE } from './constants';
import { BlogPost } from './types';
import { parseMarkdownFile } from './utils/markdown';
import Section from './components/Section';

// Theme Configuration
type ThemeKey = 'red' | 'orange' | 'blue' | 'green';

const THEMES: Record<ThemeKey, any> = {
  red: {
    hex: '#dc2626',
    classes: {
      text: 'text-red-600',
      bg: 'bg-red-600',
      border: 'border-red-600',
      hoverText: 'hover:text-red-600',
      hoverBg: 'hover:bg-red-600',
      hoverBorder: 'hover:border-red-600',
      groupHoverText: 'group-hover:text-red-600',
      groupHoverTextLight: 'group-hover:text-red-200',
      groupHoverTextLighter: 'group-hover:text-red-100',
      activeNav: 'text-red-600 font-bold pl-4 border-red-600',
      proseLink: 'prose-a:text-red-600',
      proseQuote: 'prose-blockquote:border-red-600',
      placeholder: 'placeholder:text-red-300',
      ring: 'focus:ring-red-600'
    }
  },
  orange: {
    hex: '#ea580c',
    classes: {
      text: 'text-orange-600',
      bg: 'bg-orange-600',
      border: 'border-orange-600',
      hoverText: 'hover:text-orange-600',
      hoverBg: 'hover:bg-orange-600',
      hoverBorder: 'hover:border-orange-600',
      groupHoverText: 'group-hover:text-orange-600',
      groupHoverTextLight: 'group-hover:text-orange-200',
      groupHoverTextLighter: 'group-hover:text-orange-100',
      activeNav: 'text-orange-600 font-bold pl-4 border-orange-600',
      proseLink: 'prose-a:text-orange-600',
      proseQuote: 'prose-blockquote:border-orange-600',
      placeholder: 'placeholder:text-orange-300',
      ring: 'focus:ring-orange-600'
    }
  },
  blue: {
    hex: '#2563eb',
    classes: {
      text: 'text-blue-600',
      bg: 'bg-blue-600',
      border: 'border-blue-600',
      hoverText: 'hover:text-blue-600',
      hoverBg: 'hover:bg-blue-600',
      hoverBorder: 'hover:border-blue-600',
      groupHoverText: 'group-hover:text-blue-600',
      groupHoverTextLight: 'group-hover:text-blue-200',
      groupHoverTextLighter: 'group-hover:text-blue-100',
      activeNav: 'text-blue-600 font-bold pl-4 border-blue-600',
      proseLink: 'prose-a:text-blue-600',
      proseQuote: 'prose-blockquote:border-blue-600',
      placeholder: 'placeholder:text-blue-300',
      ring: 'focus:ring-blue-600'
    }
  },
  green: {
    hex: '#16a34a',
    classes: {
      text: 'text-green-600',
      bg: 'bg-green-600',
      border: 'border-green-600',
      hoverText: 'hover:text-green-600',
      hoverBg: 'hover:bg-green-600',
      hoverBorder: 'hover:border-green-600',
      groupHoverText: 'group-hover:text-green-600',
      groupHoverTextLight: 'group-hover:text-green-200',
      groupHoverTextLighter: 'group-hover:text-green-100',
      activeNav: 'text-green-600 font-bold pl-4 border-green-600',
      proseLink: 'prose-a:text-green-600',
      proseQuote: 'prose-blockquote:border-green-600',
      placeholder: 'placeholder:text-green-300',
      ring: 'focus:ring-green-600'
    }
  }
};

type ViewState = 'home' | 'index' | 'post';

const App: React.FC = () => {
  // State
  const [activeThemeKey, setActiveThemeKey] = useState<ThemeKey>('red');
  const theme = THEMES[activeThemeKey];

  const [view, setView] = useState<ViewState>('home');
  const [activeSection, setActiveSection] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [returnToIndex, setReturnToIndex] = useState(false);
  
  // Mouse tracking
  // Center of w-64 (256px) is 128, Center of h-80 (320px) is 160
  const [mousePos, setMousePos] = useState({ x: 128, y: 160 });
  const [isHovering, setIsHovering] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    // Intentionally NOT resetting mousePos to keep image at last known location
  };

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const loadedPosts = await Promise.all(
          BLOG_FILES.map(async (filename) => {
            const response = await fetch(`${import.meta.env.BASE_URL}blog/${filename}`);
            if (!response.ok) throw new Error(`Failed to load ${filename}`);
            const text = await response.text();
            return parseMarkdownFile(filename, text);
          })
        );
        setPosts(loadedPosts);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  // Intersection Observer
  useEffect(() => {
    if (view !== 'home') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [posts, view]);

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

  const navigateToPost = (post: BlogPost) => {
    setSelectedPost(post);
    setView('post');
  };

  const navigateBack = () => {
    if (selectedPost && view === 'post') {
      setView(returnToIndex ? 'index' : 'home');
      setSelectedPost(null);
    } else if (view === 'index') {
      setView('home');
      setReturnToIndex(false);
    }
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'writing', label: 'Writing' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'publications', label: 'Publications' },
  ];

  const filteredIndexPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Render Image with Swiss Parallax Effect
  const renderProfileImage = () => {
    const centerX = 128; // Approximate visual center
    const centerY = 160; 
    
    // Movement deltas
    const moveX = mousePos.x - centerX;
    const moveY = mousePos.y - centerY;

    return (
      <div className="absolute top-0 left-0 w-64 h-80 hidden lg:block pointer-events-none z-10">
        
        {/* LAYER 1: THEME COLOR BLOCK (Shadow/Parallax) */}
        {/* Moves slightly more than the image to create depth separation */}
        <div 
           className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-out ${isHovering ? 'opacity-100' : 'opacity-0'}`}
           style={{ 
             transform: `translate(${moveX * 1.2}px, ${moveY * 1.2}px)`,
             backgroundColor: theme.hex
           }}
        />

        {/* LAYER 2: MAIN IMAGE */}
        <div 
           className="absolute inset-0 w-full h-full transition-transform duration-150 ease-out"
           style={{ transform: `translate(${moveX}px, ${moveY}px)` }}
        >
          {/* 
              Image Styling:
              - Default: Grayscale, Normal Contrast.
              - Hover: High Contrast (pop), slightly brighter (to ensure black text stays readable over it)
          */}
          <div className="w-full h-full bg-stone-50">
             <img 
               src={PROFILE_IMAGE} 
               className={`w-full h-full object-cover transition-all duration-500
                 ${isHovering 
                    ? 'grayscale-0 contrast-125 brightness-110' // Active: Color + High Contrast + Brightness (for text legibility)
                    : 'grayscale contrast-100 brightness-100'    // Static: Classic B&W
                  }
               `}
               alt=""
             />
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 bg-grid">
      <style>{`
        ::selection {
          background-color: ${theme.hex} !important;
          color: white;
        }
        ::-webkit-scrollbar-thumb {
          background-color: ${theme.hex} !important;
        }
      `}</style>

      {/* CONTROLS COMPONENT (Colors) */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 items-end">
        
        {/* Color Picker */}
        <div className="flex gap-2 p-2 bg-stone-50/90 backdrop-blur rounded-full border border-stone-200 shadow-sm">
          {Object.keys(THEMES).map((key) => (
            <button
              key={key}
              onClick={() => setActiveThemeKey(key as ThemeKey)}
              className={`w-4 h-4 rounded-full transition-transform hover:scale-110 ${activeThemeKey === key ? 'ring-2 ring-offset-1 ring-stone-400 scale-110' : ''}`}
              style={{ backgroundColor: THEMES[key as ThemeKey].hex }}
              aria-label={`Select ${key} theme`}
            />
          ))}
        </div>
      </div>

      {/* Main Layout Wrapper */}
      <div className="max-w-screen-2xl mx-auto">
        
        {/* LEFT COLUMN: MAGNETIC HERO & NAV */}
        {view === 'home' && (
          <header 
            ref={headerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[35%] lg:border-r border-stone-300 z-40 bg-stone-50 lg:bg-transparent relative overflow-hidden flex flex-col justify-between group"
          >
            {/* Dynamic Profile Image */}
            {renderProfileImage()}

            <div className="p-8 lg:p-12 xl:p-16 relative z-20 flex-1 flex flex-col justify-center lg:justify-start pointer-events-none">
              <div className="mb-12 lg:mb-24 relative text-stone-900 pointer-events-auto">
                {/* Massive Typography */}
                <h1 className="text-7xl md:text-8xl lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[0.9] font-black tracking-tighter uppercase select-none flex flex-col items-start cursor-default text-stone-900">
                  <span>Vineet</span>
                  <span>Singh</span>
                </h1>
                <div className={`mt-8 border-t-4 pt-6 inline-block ${theme.classes.border}`}>
                  <p className={`text-xl md:text-2xl font-mono tracking-widest uppercase ${theme.classes.text}`}>
                    Product Builder
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden lg:block mb-auto relative z-20 pointer-events-auto">
                <ul className="space-y-2 font-mono text-xs uppercase tracking-widest">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <a 
                        href={`#${link.id}`}
                        className={`block py-2 border-b border-transparent hover:pl-4 transition-all duration-300 ${theme.classes.hoverBorder} ${
                          activeSection === link.id ? theme.classes.activeNav : 'text-stone-400 hover:text-stone-900'
                        }`}
                      >
                        {String(navLinks.indexOf(link) + 1).padStart(2, '0')} // {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile/Tablet Profile Image Fallback */}
              <div className="lg:hidden mb-8 pointer-events-auto">
                <img src={PROFILE_IMAGE} className="w-full h-96 object-cover grayscale contrast-125" alt="Vineet Singh" />
              </div>

              <div className="text-xs font-mono uppercase tracking-widest text-stone-400 flex flex-col gap-2 relative z-20 pointer-events-auto">
                <a href={`mailto:${CONTACT.email}`} className={`transition-colors ${theme.classes.hoverText}`}>
                  MAIL: {CONTACT.email}
                </a>
                <a href={`https://${CONTACT.linkedin}`} target="_blank" rel="noreferrer" className={`transition-colors ${theme.classes.hoverText}`}>
                  LINKEDIN
                </a>
                <span>LOC: {CONTACT.location}</span>
              </div>
            </div>
          </header>
        )}

        {/* RIGHT COLUMN */}
        <main className={`${view !== 'home' ? 'w-full mx-auto' : 'lg:ml-[35%] lg:w-[65%]'} bg-stone-50 relative z-0 min-h-screen transition-all duration-500`}>
          {view === 'post' && selectedPost ? (
            <article className="animate-[fadeIn_0.5s_ease-out] min-h-screen flex flex-col">
              <div className="p-6 md:p-12 lg:p-24 max-w-4xl mx-auto w-full flex-grow">
                <button 
                  onClick={navigateBack}
                  className={`mb-12 font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:pl-2 transition-all ${theme.classes.text}`}
                >
                  ← Back to {returnToIndex ? 'Index' : 'Profile'}
                </button>

                <div className="mb-12 pb-12 border-b-2 border-stone-900">
                   <div className="flex gap-4 mb-6">
                     {selectedPost.tags.map(tag => (
                       <span key={tag} className="font-mono text-xs border border-stone-300 px-2 py-1 uppercase text-stone-500">{tag}</span>
                     ))}
                   </div>
                   <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-stone-900 mb-8 leading-[0.95] tracking-tight">
                     {selectedPost.title}
                   </h1>
                   <div className="flex justify-between items-end border-t border-stone-200 pt-4">
                     <p className={`font-mono text-sm uppercase tracking-widest ${theme.classes.text}`}>
                       Published: {selectedPost.date}
                     </p>
                     <p className="font-mono text-stone-400 text-xs uppercase tracking-widest">
                        Author: Vineet Singh
                     </p>
                   </div>
                </div>

                <div 
                  className={`prose prose-stone prose-lg md:prose-xl max-w-none 
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-stone-900
                  prose-p:font-serif prose-p:text-stone-700 prose-p:leading-relaxed
                  prose-a:no-underline hover:prose-a:underline ${theme.classes.proseLink}
                  prose-blockquote:border-l-4 prose-blockquote:bg-stone-100 prose-blockquote:p-6 prose-blockquote:italic ${theme.classes.proseQuote}`}
                  dangerouslySetInnerHTML={{ __html: marked.parse(selectedPost.content) }} 
                />
              </div>
              
              <div className="w-full bg-stone-100 border-t border-stone-200 py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-8">Share this log</h4>
                  <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
                    <button onClick={() => handleShare('twitter')} className={`font-mono text-sm uppercase tracking-widest border border-stone-300 px-6 py-3 bg-white hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-colors`}>Twitter / X</button>
                    <button onClick={() => handleShare('linkedin')} className={`font-mono text-sm uppercase tracking-widest border border-stone-300 px-6 py-3 bg-white hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-colors`}>LinkedIn</button>
                    <button onClick={() => handleShare('copy')} className={`font-mono text-sm uppercase tracking-widest border border-stone-300 px-6 py-3 bg-white hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-colors min-w-[160px]`}>{linkCopied ? 'Copied!' : 'Copy Link'}</button>
                  </div>
                </div>
              </div>
            </article>
          ) : view === 'index' ? (
            <div className="animate-[fadeIn_0.5s_ease-out] min-h-screen flex flex-col bg-stone-50 p-6 md:p-12 lg:p-24">
               <div className="max-w-7xl mx-auto w-full">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b-4 border-stone-900 pb-6">
                   <div>
                     <button onClick={navigateBack} className={`mb-8 font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:pl-2 transition-all ${theme.classes.text}`}>← Return Home</button>
                     <h1 className="text-6xl md:text-8xl font-black text-stone-900 tracking-tighter">INDEX</h1>
                   </div>
                   <div className="w-full md:w-auto mt-8 md:mt-0">
                     <input type="text" placeholder="Filter index..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-full md:w-64 bg-transparent border-b border-stone-300 py-2 font-mono text-sm uppercase tracking-widest focus:outline-none focus:border-stone-900 transition-colors ${theme.classes.placeholder}`} />
                   </div>
                 </div>
                 <div className="space-y-0">
                   {filteredIndexPosts.map((post, index) => (
                     <div key={post.slug} onClick={() => { setReturnToIndex(true); navigateToPost(post); }} className="group cursor-pointer relative overflow-hidden border-b border-stone-200" style={{ animationDelay: `${index * 50}ms` }}>
                       <div className={`flex flex-col md:flex-row items-baseline md:items-center justify-between py-8 px-4 transition-all duration-300 ${theme.classes.hoverBg} ${theme.classes.hoverText} hover:text-white`}>
                         <div className="flex flex-col md:flex-row items-baseline md:items-center w-full transition-transform duration-300 group-hover:translate-x-4">
                            <div className="font-mono text-xs md:text-sm w-32 uppercase text-stone-400 group-hover:text-white/80 mb-2 md:mb-0 flex-shrink-0">{post.date}</div>
                            <div className="flex-1 min-w-0 mr-4"><h2 className="text-2xl md:text-4xl font-bold text-stone-900 group-hover:text-white transition-colors truncate">{post.title}</h2></div>
                            <div className="hidden md:flex gap-2 w-64 justify-end flex-shrink-0">{post.tags.map(tag => (<span key={tag} className="font-mono text-[10px] uppercase border border-stone-300 text-stone-400 px-2 py-1 group-hover:border-white group-hover:text-white">{tag}</span>))}</div>
                         </div>
                         <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0 group-hover:-translate-y-2 text-stone-200 group-hover:text-white text-xl hidden md:block">→</div>
                       </div>
                     </div>
                   ))}
                   {filteredIndexPosts.length === 0 && <div className="py-12 text-center font-mono text-stone-400">No items found matching your query.</div>}
                 </div>
               </div>
            </div>
          ) : (
            <div className="animate-[fadeIn_0.5s_ease-out]">
              <Section id="about" className="pt-16 lg:pt-32 px-6 md:px-16 border-b border-stone-200">
                 <div className="prose prose-xl md:prose-2xl prose-stone max-w-4xl">
                   <p className="font-light leading-relaxed text-stone-800 indent-12">
                     <span className={`font-bold text-6xl float-left mr-4 mt-[-10px] font-mono ${theme.classes.text}`}>/</span>
                     {SUMMARY}
                   </p>
                 </div>
              </Section>

              <section id="writing" className="border-b border-stone-200">
                <div className="px-6 md:px-16 py-12 md:py-20">
                  <div className="flex items-end justify-between mb-12 border-b-4 border-stone-900 pb-4">
                    <h2 className="text-4xl md:text-6xl font-black text-stone-900 uppercase tracking-tight">Log</h2>
                    <button onClick={() => { setView('index'); setReturnToIndex(false); }} className={`font-mono text-xs uppercase tracking-widest mb-2 hover:underline ${theme.classes.text}`}>Index [View All]</button>
                  </div>
                  <div className="flex flex-col">
                    {loadingPosts ? <div className="h-20 bg-stone-100 animate-pulse w-full"></div> : posts.slice(0, 3).map((post) => (
                        <div key={post.slug} onClick={() => { setReturnToIndex(false); navigateToPost(post); }} className={`group cursor-pointer border-b border-stone-300 transition-all duration-200 py-6 px-4 -mx-4 ${theme.classes.hoverBg} ${theme.classes.hoverBorder}`}>
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline transition-transform duration-200 group-hover:translate-x-2">
                            <div className={`md:col-span-2 font-mono text-xs text-stone-400 uppercase tracking-widest ${theme.classes.groupHoverTextLight}`}>{post.date}</div>
                            <div className="md:col-span-8">
                              <h3 className="text-xl md:text-2xl font-bold text-stone-900 group-hover:text-white leading-tight truncate">{post.title}</h3>
                              <p className={`text-stone-500 text-sm mt-2 line-clamp-1 md:hidden ${theme.classes.groupHoverTextLighter}`}>{post.summary}</p>
                            </div>
                            <div className="hidden md:col-span-2 md:flex justify-end gap-2 flex-wrap">
                               {post.tags.slice(0,1).map(tag => (<span key={tag} className="font-mono text-[10px] border border-stone-300 group-hover:border-white group-hover:text-white px-2 py-1 rounded-none uppercase text-stone-400">{tag}</span>))}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </section>

              <Section id="experience" title="Experience" className="px-6 md:px-16 border-b border-stone-200">
                <div className="space-y-0 divide-y divide-stone-200">
                  {EXPERIENCE.map((job, index) => (
                    <div key={index} className="py-12 group first:pt-0">
                      <div className="flex flex-col md:flex-row md:justify-between mb-6">
                        <h3 className={`text-3xl font-bold text-stone-900 transition-colors ${theme.classes.groupHoverText}`}>{job.role}</h3>
                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start mt-2 md:mt-0 gap-4 md:gap-1">
                          {job.logo && <img src={job.logo} alt={`${job.company} logo`} className="h-8 md:h-12 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 mb-2 mix-blend-multiply" />}
                          <div className="text-right">
                            <span className="block text-lg font-medium text-stone-900">{job.company}</span>
                            <span className="block font-mono text-xs text-stone-400 uppercase tracking-widest">{job.period}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-1 hidden md:block"><div className={`w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity ${theme.classes.bg}`}></div></div>
                        <div className="md:col-span-11"><ul className="space-y-3">{job.description.map((desc, i) => (<li key={i} className="text-stone-600 font-light leading-relaxed">{desc}</li>))}</ul></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div id="education" className="p-6 md:p-16 border-b md:border-b-0 md:border-r border-stone-200">
                   <h2 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-12">Education</h2>
                   <div className="space-y-12">
                    {EDUCATION.map((edu, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-bold text-stone-900 leading-tight">{edu.institution}</h3>
                        <p className="text-stone-500 font-light">{edu.degree}</p>
                      </div>
                    ))}
                    <div className="pt-8 border-t border-stone-200">
                      <h4 className="text-sm font-bold text-stone-900 mb-4 uppercase tracking-wide">Certifications</h4>
                      <ul className="space-y-2">
                        {CERTIFICATIONS.map((cert, i) => (<li key={i} className="text-sm text-stone-600 font-mono flex gap-2"><span className={theme.classes.text}>+</span> {cert.name}</li>))}
                      </ul>
                    </div>
                   </div>
                </div>
                <div id="publications" className="p-6 md:p-16">
                  <h2 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-12">Publications</h2>
                  <ul className="space-y-8">
                    {PUBLICATIONS.map((pub, index) => (
                      <li key={index} className="group">
                         <span className={`block font-mono text-xs mb-2 ${theme.classes.text}`}>REF_{String(index + 1).padStart(3, '0')}</span>
                         <p className={`text-stone-800 transition-colors leading-relaxed font-medium ${theme.classes.groupHoverText}`}>{pub.title}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <footer className="p-12 border-t border-stone-200 bg-stone-100">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                   <p className="text-xs font-mono text-stone-400 uppercase">© {new Date().getFullYear()} Vineet Singh</p>
                   <p className="text-xs font-mono text-stone-400 uppercase">Dublin, IE</p>
                </div>
              </footer>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
