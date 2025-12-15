/**
 * Content Access Layer
 * 
 * This module abstracts how blog content is accessed.
 * Currently it imports from build-time generated files.
 * In the future, this can be swapped to fetch from an API or database.
 */

import { posts } from '../generated/posts';
import type { BlogPost } from '../../types';

/**
 * Get all blog posts, sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  return posts;
}

/**
 * Get a single post by its slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug);
}

/**
 * Get all posts that have a specific tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  return posts.filter(p => 
    p.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique tags across all posts
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

