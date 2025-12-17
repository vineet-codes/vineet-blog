import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { BlogPost } from '../types';

interface BlogPostItemProps {
  post: BlogPost;
  onClick: () => void;
  index?: number;
}

/**
 * Format an ISO date string (YYYY-MM-DD) or legacy format to display format
 * Returns compact format like "Dec '25"
 */
function formatDisplayDate(dateStr: string): string {
  // Try ISO format (YYYY-MM-DD)
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (isoMatch) {
    const [, year, month] = isoMatch;
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    const monthStr = date.toLocaleDateString('en-US', { month: 'short' });
    return `${monthStr} '${year.slice(2)}`;
  }
  // Return as-is for legacy formats
  return dateStr;
}

const BlogPostItem: React.FC<BlogPostItemProps> = ({ post, onClick, index = 0 }) => {
  const { mode, theme } = useTheme();

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer relative overflow-hidden border-b ${mode.border}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div
        className={`flex flex-col md:flex-row items-start md:items-center justify-between py-6 md:py-8 px-4 transition-all duration-300 ${mode.cardHover} ${theme.classes.hoverText}`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center w-full transition-transform duration-300 group-hover:translate-x-1">
          {/* Date */}
          <div
            className={`font-mono text-xs uppercase tracking-widest ${mode.textMuted} group-hover:text-current opacity-80 mb-2 md:mb-0 w-28 flex-shrink-0`}
          >
            {formatDisplayDate(post.date)}
          </div>

          {/* Title & Summary */}
          <div className="flex-1 min-w-0 md:mr-4">
            <h3
              className={`text-lg md:text-xl lg:text-2xl font-bold ${mode.text} group-hover:text-current transition-colors`}
            >
              {post.title}
            </h3>
            {/* Summary */}
            <p
              className={`${mode.textMuted} text-sm mt-1 line-clamp-2 md:line-clamp-1 ${theme.classes.groupHoverTextLighter}`}
            >
              {post.summary}
            </p>
          </div>

          {/* Tags - desktop only */}
          <div className="hidden md:flex gap-2 justify-end flex-shrink-0">
            {post.tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className={`font-mono text-[10px] uppercase border ${mode.border} ${mode.textMuted} px-2 py-1 group-hover:border-current group-hover:text-current transition-colors`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow indicator - desktop only */}
        <div
          className={`absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-2 text-current text-xl hidden md:block`}
        >
          →
        </div>
      </div>
    </div>
  );
};

export default BlogPostItem;

