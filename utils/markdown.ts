import { BlogPost } from '../types';

/**
 * Parses a raw markdown string with frontmatter (YAML-like style)
 * ---
 * title: ...
 * date: ...
 * ---
 * Content
 */
export function parseMarkdownFile(filename: string, text: string): BlogPost {
  const frontMatterRegex = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/;
  const match = frontMatterRegex.exec(text);

  const slug = filename.replace(/\.md$/, '');

  if (!match) {
    // Fallback if no frontmatter found
    return {
      slug,
      title: slug,
      date: 'Unknown',
      summary: '',
      tags: [],
      content: text
    };
  }

  const frontMatterBlock = match[1];
  const content = match[2];

  const metadata: any = {};
  frontMatterBlock.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Handle array syntax [tag1, tag2]
      if (value.startsWith('[') && value.endsWith(']')) {
        metadata[key] = value.slice(1, -1).split(',').map(s => s.trim());
      } else {
        // Remove quotes if present
        value = value.replace(/^['"](.*)['"]$/, '$1');
        metadata[key] = value;
      }
    }
  });

  return {
    slug,
    title: metadata.title || slug,
    date: metadata.date || 'Unknown',
    summary: metadata.summary || '',
    tags: metadata.tags || [],
    content: content.trim()
  };
}