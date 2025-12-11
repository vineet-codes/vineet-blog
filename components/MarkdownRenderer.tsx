import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from '../context/ThemeContext';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const { mode, theme } = useTheme();

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
        p: ({ children }) => (
          <p className={`text-lg md:text-xl font-serif leading-relaxed mb-6 ${mode.text} opacity-90`}>
            {children}
          </p>
        ),
        
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
        li: ({ children }) => (
          <li className="pl-2">{children}</li>
        ),

        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className={`border-l-4 ${theme.classes.border} ${mode.quoteBg} p-6 my-8 italic text-lg ${mode.textMuted}`}>
            {children}
          </blockquote>
        ),

        // Links
        a: ({ href, children }) => (
          <a 
            href={href} 
            className={`font-medium underline decoration-2 underline-offset-4 ${theme.classes.text} hover:opacity-80 transition-opacity`}
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),

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

            return (
                <figure className="my-8">
                    <img 
                        src={src} 
                        alt={alt} 
                        className={`w-full h-auto rounded-lg shadow-md border ${mode.border}`}
                        loading="lazy"
                    />
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
        )
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownRenderer;
