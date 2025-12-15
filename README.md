# Vineet Singh - Personal Portfolio & Blog

A minimalist, Swiss-design inspired portfolio and blog built with **React 19**, **Vite**, and **Tailwind CSS**. This project serves as a personal showcase for experience, education, and writing, featuring a build-time markdown processing engine and interactive UI elements.

## 🌟 Features

*   **Minimalist "Swiss Style" Design**:
    *   Grid background with grain texture overlay.
    *   Clean typography using `Inter` and `Space Mono`.
    *   High-contrast, monochromatic aesthetics with accent colors.
*   **Dynamic Theming**:
    *   Four switchable color themes: **Red**, **Orange**, **Blue**, **Green**.
    *   Themes persist across UI elements, hover states, and selection highlights.
*   **Interactive Elements**:
    *   **Magnetic Hero**: Desktop sidebar that tracks mouse movement for a subtle parallax effect on the profile image.
    *   **Custom Navigation**: Smooth scrolling and active section highlighting.
*   **Travel Log ("Terra Incognita")**:
    *   **Brutalist Design**: Interactive "Index" vs "Map" view switcher with technical, monochromatic aesthetics.
    *   **Interactive Map**: Powered by `react-leaflet`, featuring custom minimal markers and smooth fly-to animations.
    *   **List View**: Grid-based layout with reverse chronological ordering and dynamic ID generation.
    *   **Responsive UX**: Custom mobile-specific navigation controls (bottom floating switcher) vs desktop controls (header embedded).
*   **Build-Time Markdown Processing**:
    *   Blog posts are processed at build time, not fetched at runtime.
    *   Content lives in `content/blog/` (not bundled with public assets).
    *   Supports YAML-style frontmatter for metadata (title, date, summary, tags).
    *   Tag filtering and search functionality.
*   **Responsive Layout**:
    *   **Desktop**: Split-screen layout with fixed sidebar and scrolling content.
    *   **Mobile**: Stacked layout optimized for readability and touch interactions.
*   **Content Management**:
    *   Centralized data management in `constants.ts` for easy updates to Experience, Education, and Publications.
    *   Content access layer abstraction for future database migration.

## 🛠️ Tech Stack

*   **Frontend Framework**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v3 via CDN for rapid prototyping/portability)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Markdown Rendering**: [react-markdown](https://github.com/remarkjs/react-markdown) with [remark-gfm](https://github.com/remarkjs/remark-gfm)
*   **Build-Time Processing**: [tsx](https://github.com/privatenumber/tsx)
*   **Deployment**: GitHub Pages

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18+ recommended)
*   npm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/vineet-codes/vineet-blog.git
    cd vineet-blog
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:3000` (or next available port).

## 📂 Project Structure

```
vineet-blog/
├── content/                    # 📝 Content source (not bundled with client)
│   └── blog/                   # Markdown blog posts
│       ├── creative-coding.md
│       ├── data-science-pm.md
│       └── ...
│
├── scripts/                    # 🔧 Build scripts
│   └── build-content.ts        # Processes markdown → TypeScript
│
├── src/
│   ├── generated/              # ⚡ Auto-generated (gitignored)
│   │   └── posts.ts            # Pre-processed blog posts
│   ├── lib/
│   │   └── content.ts          # Content access layer (abstraction)
│   └── context/
│       └── ThemeContext.tsx    # Theme state management
│
├── components/                 # Reusable UI components
├── pages/                      # Page components (Home, Post, BlogIndex, TravelLog)
├── utils/                      # Helper functions
├── public/                     # Static assets only (images, favicon)
├── constants.ts                # Static content (Experience, Education, etc.)
├── types.ts                    # TypeScript definitions
├── App.tsx                     # Main application logic & layout
└── index.html                  # HTML template & Tailwind CDN
```

## 📝 Content Architecture

### How It Works

This project uses a **build-time content processing** approach:

```
┌─────────────────────┐     Build Time      ┌─────────────────────┐
│  content/blog/*.md  │ ──────────────────► │ src/generated/      │
│  (Source files)     │   build-content.ts  │ posts.ts            │
└─────────────────────┘                     └──────────┬──────────┘
                                                       │
                                                       │ import
                                                       ▼
                                            ┌─────────────────────┐
                                            │ src/lib/content.ts  │
                                            │ (Access Layer)      │
                                            └──────────┬──────────┘
                                                       │
                                                       │ getAllPosts()
                                                       ▼
                                            ┌─────────────────────┐
                                            │     App.tsx         │
                                            │  (React Components) │
                                            └─────────────────────┘
```

**Why this approach?**

| Aspect | Old (Runtime Fetch) | New (Build-Time) |
|--------|---------------------|------------------|
| **Performance** | Fetch on every page load | Posts bundled in JS |
| **Content location** | `public/` (exposed as static files) | `content/` (source only) |
| **Scalability** | Hard to add database later | Easy to swap data source |
| **SEO** | Content loaded async | Content available immediately |

### Adding a New Blog Post

1.  **Create a markdown file** in `content/blog/`:

    ```markdown
    ---
    title: My New Post Title
    date: Dec 2024
    summary: A brief description of the post.
    tags: [Topic1, Topic2, Topic3]
    ---

    Your markdown content goes here...

    ### Subheading

    More content with **bold** and *italic* text.
    ```

2.  **Rebuild content** (happens automatically on `npm run dev` or `npm run build`):
    ```bash
    npm run build:content
    ```

3.  That's it! The post will automatically appear in the blog index.

### Frontmatter Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title displayed in UI |
| `date` | string | Yes | Publication date (e.g., "Dec 2024", "2024-12-15") |
| `summary` | string | Yes | Brief description for post previews |
| `tags` | string[] | No | Array of topic tags for filtering |

### Content Access Layer

The `src/lib/content.ts` module provides an abstraction over content retrieval:

```typescript
import { getAllPosts, getPostBySlug, getPostsByTag } from './src/lib/content';

// Get all posts (sorted by date, newest first)
const posts = getAllPosts();

// Get a specific post
const post = getPostBySlug('my-post-slug');

// Get posts by tag
const techPosts = getPostsByTag('Technology');
```

**Design Decision**: This abstraction exists to make future migrations easier. When ready to move to a database or CMS, only this file needs to change—all consuming components remain untouched.

## 🔧 NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Build content + start dev server |
| `npm run build` | Build content + production build |
| `npm run build:content` | Only regenerate `src/generated/posts.ts` |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build and deploy to GitHub Pages |

## 🎨 Customization

### Personal Information

Update your personal details, experience, education, and contact info in:
`constants.ts`

### Changing Profile Image

1.  Place your image in the `public/` directory (e.g., `profile.jpg`).
2.  Update the path in `constants.ts`:
    ```typescript
    export const PROFILE_IMAGE = "./profile.jpg";
    ```

### Theme Colors

Modify theme definitions in `constants.ts`:

```typescript
export const THEMES: Record<ThemeKey, Theme> = {
  red: { hex: '#dc2626', classes: { ... } },
  // Add or modify themes here
};
```

## 🗺️ Future Migration Path

The architecture is designed for easy evolution:

### Adding a Database

1. **Set up your database** (e.g., Supabase, PlanetScale, Prisma)

2. **Update the content layer** (`src/lib/content.ts`):

    ```typescript
    // Before (static import)
    import { posts } from '../generated/posts';
    export function getAllPosts() { return posts; }

    // After (API fetch)
    export async function getAllPosts() {
      const res = await fetch('/api/posts');
      return res.json();
    }
    ```

3. **Update consumers** to handle async (or use React Suspense)

### Adding a CMS

The same pattern works for headless CMS integration (Contentful, Sanity, etc.):

```typescript
export async function getAllPosts() {
  return await contentfulClient.getEntries({ content_type: 'blogPost' });
}
```

## 📦 Building & Deployment

To build the project for production:

```bash
npm run build
```

To deploy to GitHub Pages:

```bash
npm run deploy
```

*Note: Ensure your `vite.config.ts` base URL matches your repository name if deploying to a subdirectory.*

## 🗃️ Files Not Committed

The following are auto-generated and excluded via `.gitignore`:

- `src/generated/` - Regenerated on every build
- `node_modules/` - Dependencies
- `dist/` - Production build output

## 📄 License

[MIT](LICENSE) © Vineet Singh
