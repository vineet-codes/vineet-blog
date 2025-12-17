import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from '../context/ThemeContext';

interface MarkdownRendererProps {
  content: string;
}

interface FootnoteData {
  id: string;
  content: string;
}

// Pre-process markdown to extract footnotes and replace references with markers
function processFootnotes(content: string): { 
  processedContent: string; 
  footnotes: Map<string, string>;
} {
  const footnotes = new Map<string, string>();
  
  // Extract footnote definitions: [^id]: content
  // Handle both single-line and the content after the colon
  const definitionRegex = /^\[\^(\w+)\]:\s*(.+)$/gm;
  let match;
  while ((match = definitionRegex.exec(content)) !== null) {
    footnotes.set(match[1], match[2].trim());
  }
  
  // Remove footnote definitions from content
  let processedContent = content.replace(/^\[\^(\w+)\]:\s*.+$/gm, '');
  
  // Replace footnote references [^id] with a custom marker
  // Using a format that won't be processed by remark-gfm
  processedContent = processedContent.replace(
    /\[\^(\w+)\]/g, 
    '‹FOOTNOTE:$1›'
  );
  
  // Clean up extra blank lines left by removing definitions
  processedContent = processedContent.replace(/\n{3,}/g, '\n\n');
  
  return { processedContent, footnotes };
}

// Footnote tooltip component - Swiss minimalist design
const FootnoteTooltip: React.FC<{
  id: string;
  content: string;
}> = ({ id, content }) => {
  const { mode, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on click outside or escape
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <span className="relative inline">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          inline-flex items-center justify-center
          font-mono text-[10px] font-bold
          px-0.5
          transition-all duration-200
          cursor-pointer
          hover:opacity-70
        `}
        style={{ color: theme.hex }}
        aria-label={`View footnote ${id}`}
      >
        [{id}]
      </button>
      
      {isOpen && (
        <div
          ref={tooltipRef}
          className="absolute z-50 left-0 bottom-full mb-3 w-[280px] md:w-[400px] border"
          style={{ 
            backgroundColor: mode.bg === 'bg-stone-50' ? '#fafaf9' : '#1c1917',
            borderColor: mode.bg === 'bg-stone-50' ? '#e7e5e4' : '#44403c',
          }}
          role="tooltip"
        >
            {/* Header */}
            <div 
              className="flex items-center justify-between px-4 py-3 md:py-2 border-b"
              style={{ borderColor: theme.hex, backgroundColor: theme.hex }}
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-white">
                Reference {id}
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white text-sm md:text-xs font-mono transition-colors p-1"
              >
                ✕
              </button>
            </div>
            
            {/* Content */}
            <div 
              className="p-4 text-sm leading-relaxed"
              style={{ color: mode.bg === 'bg-stone-50' ? '#1c1917' : '#fafaf9' }}
            >
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <span>{children}</span>,
                  a: ({ href, children }) => (
                    <a 
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`underline decoration-1 underline-offset-2 hover:opacity-70 transition-opacity ${theme.classes.text}`}
                    >
                      {children} ↗
                    </a>
                  ),
                }}
              >
                {content}
              </Markdown>
            </div>
            
            {/* Footer */}
            <div 
              className="px-4 py-2 border-t"
              style={{ borderColor: mode.bg === 'bg-stone-50' ? '#e7e5e4' : '#44403c' }}
            >
              <span 
                className="text-[9px] font-mono uppercase tracking-widest"
                style={{ color: mode.bg === 'bg-stone-50' ? '#78716c' : '#a8a29e' }}
              >
                Tap outside to close
              </span>
            </div>
          </div>
      )}
    </span>
  );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const { mode, theme } = useTheme();
  
  // Pre-process to extract footnotes
  const { processedContent, footnotes } = processFootnotes(content);

  // Custom component to handle text nodes and replace footnote markers
  const renderTextWithFootnotes = (text: string): React.ReactNode => {
    const parts = text.split(/(‹FOOTNOTE:\w+›)/g);
    return parts.map((part, index) => {
      const match = part.match(/‹FOOTNOTE:(\w+)›/);
      if (match) {
        const footnoteId = match[1];
        const footnoteContent = footnotes.get(footnoteId);
        if (footnoteContent) {
          return (
            <FootnoteTooltip 
              key={index} 
              id={footnoteId} 
              content={footnoteContent} 
            />
          );
        }
        return <sup key={index}>[{footnoteId}]</sup>;
      }
      return part;
    });
  };

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Typography
        h1: ({ children }) => (
          <h1 className={`text-4xl md:text-5xl font-black ${mode.text} mb-6 mt-12 tracking-tight uppercase leading-[0.95]`}>
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className={`text-3xl md:text-4xl font-bold ${mode.text} mb-5 mt-10 tracking-tight leading-none`}>
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className={`text-xl md:text-2xl font-bold ${mode.text} mb-4 mt-8 tracking-wide uppercase border-l-4 ${theme.classes.border} pl-3`}>
            {children}
          </h3>
        ),
        p: ({ children }) => {
          // Process children to replace footnote markers
          const processedChildren = React.Children.map(children, child => {
            if (typeof child === 'string') {
              return renderTextWithFootnotes(child);
            }
            return child;
          });
          
          // Check if this paragraph contains only an image
          const childArray = React.Children.toArray(children);
          const hasOnlyImage = childArray.length === 1 && 
            React.isValidElement(childArray[0]) && 
            (childArray[0].type === 'img' || (childArray[0].props as Record<string, unknown>)?.src);
          
          if (hasOnlyImage) {
            return <>{children}</>;
          }
          
          return (
            <p className={`text-lg md:text-xl font-serif leading-relaxed mb-6 ${mode.text} opacity-90`}>
              {processedChildren}
            </p>
          );
        },
        
        // Lists
        ul: ({ children }) => (
          <ul className={`list-disc list-outside ml-6 mb-6 space-y-2 ${mode.text} marker:${theme.classes.text}`}>
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className={`list-decimal list-outside ml-6 mb-6 space-y-2 ${mode.text} marker:${theme.classes.text} font-mono text-sm`}>
            {children}
          </ol>
        ),
        li: ({ children }) => {
          const processedChildren = React.Children.map(children, child => {
            if (typeof child === 'string') {
              return renderTextWithFootnotes(child);
            }
            return child;
          });
          return <li className="pl-2">{processedChildren}</li>;
        },

        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className={`border-l-4 ${theme.classes.border} ${mode.quoteBg} p-6 my-8 italic text-lg ${mode.textMuted}`}>
            {children}
          </blockquote>
        ),

        // Links
        a: ({ href, children }) => {
          const isExternal = href?.startsWith('http');
          
          return (
            <a 
              href={href}
              className={`font-medium underline decoration-2 underline-offset-4 ${theme.classes.text} hover:opacity-80 transition-opacity`}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          );
        },

        // Code
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          const isInline = !match && !String(children).includes('\n');
          
          if (isInline) {
            return (
              <code className={`font-mono text-sm px-1.5 py-0.5 rounded border ${mode.border} ${mode.bg === 'bg-stone-50' ? 'bg-stone-100' : 'bg-stone-900'} ${mode.text}`}>
                {children}
              </code>
            );
          }

          return (
            <div className={`rounded-lg overflow-hidden border ${mode.border} my-6 bg-stone-900`}> 
              <div className="flex items-center justify-between px-4 py-2 bg-stone-800 border-b border-stone-700">
                <span className="text-xs font-mono uppercase text-stone-400">
                  {match ? match[1] : 'Code'}
                </span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-stone-200">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            </div>
          );
        },

        // Images / Video
        img: ({ src, alt }) => {
          if (!src) return null;

          const isVideo = src.match(/\.(mp4|webm|mov)$/i);

          if (isVideo) {
            return (
              <div className="my-8 rounded-lg overflow-hidden shadow-lg">
                <video 
                  controls 
                  className="w-full h-auto" 
                  preload="metadata"
                >
                  <source src={src} />
                  Your browser does not support the video tag.
                </video>
                {alt && (
                  <p className={`mt-2 text-center text-sm font-mono uppercase tracking-widest ${mode.textMuted}`}>
                    {alt}
                  </p>
                )}
              </div>
            );
          }

          const getOptimizedSrc = (originalSrc: string): string => {
            if (originalSrc.match(/\.(png|jpg|jpeg)$/i)) {
              return originalSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp');
            }
            return originalSrc;
          };

          const optimizedSrc = getOptimizedSrc(src);
          const isOptimized = optimizedSrc !== src;

          return (
            <figure className="my-8">
              {isOptimized ? (
                <picture>
                  <source srcSet={optimizedSrc} type="image/webp" />
                  <img 
                    src={src} 
                    alt={alt} 
                    className={`w-full h-auto rounded-lg shadow-md border ${mode.border}`}
                    loading="lazy"
                  />
                </picture>
              ) : (
                <img 
                  src={src} 
                  alt={alt} 
                  className={`w-full h-auto rounded-lg shadow-md border ${mode.border}`}
                  loading="lazy"
                />
              )}
              {alt && (
                <figcaption className={`mt-3 text-center text-xs font-mono uppercase tracking-widest ${mode.textMuted}`}>
                  {alt}
                </figcaption>
              )}
            </figure>
          );
        },
        
        // Horizontal Rule
        hr: () => (
          <hr className={`my-12 border-t-2 ${mode.border}`} />
        ),
      }}
    >
      {processedContent}
    </Markdown>
  );
};

export default MarkdownRenderer;
