# Vineet Singh - Personal Portfolio & Blog

A minimalist, Swiss-design inspired portfolio and blog built with **React 19**, **Vite**, and **Tailwind CSS**. This project serves as a personal showcase for experience, education, and writing, featuring a custom markdown blog engine and interactive UI elements.

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
*   **Markdown Blog Engine**:
    *   Renders blog posts directly from Markdown (`.md`) files located in `public/blog/`.
    *   Supports metadata parsing (frontmatter-like behavior) and raw HTML rendering.
    *   Tag filtering and search functionality.
*   **Responsive Layout**:
    *   **Desktop**: Split-screen layout with fixed sidebar and scrolling content.
    *   **Mobile**: Stacked layout optimized for readability and touch interactions.
*   **Content Management**:
    *   Centralized data management in `src/constants.ts` for easy updates to Experience, Education, and Publications.

## 🛠️ Tech Stack

*   **Frontend Framework**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v3 via CDN for rapid prototyping/portability)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Markdown Parser**: [Marked](https://marked.js.org/)
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
    The app will be available at `http://localhost:3000` (or similar port).

## 📝 Customization

### Personal Information
Update your personal details, experience, education, and contact info in:
`src/constants.ts`

### Adding Blog Posts
1.  Create a new Markdown file in `public/blog/` (e.g., `my-new-post.md`).
2.  Ensure the file follows the expected format (Title on first line, Metadata lines, then content).
3.  Add the filename to the `BLOG_FILES` array in `src/constants.ts`:
    ```typescript
    export const BLOG_FILES = [
      'web3-ux-gap.md',
      'sustainability-gamified.md',
      'my-new-post.md' // Add your new file here
    ];
    ```

### Changing Profile Image
1.  Place your image in the `public/` directory (e.g., `profile.jpg`).
2.  Update the path in `src/constants.ts`:
    ```typescript
    export const PROFILE_IMAGE = "./profile.jpg";
    ```

## 📦 Building & Deployment

To build the project for production:

```bash
npm run build
```

To deploy to GitHub Pages (configured via `gh-pages`):

```bash
npm run deploy
```
*Note: Ensure your `vite.config.ts` base URL matches your repository name if deploying to a subdirectory.*

## 📂 Project Structure

```
/
├── public/
│   ├── blog/              # Markdown blog posts
│   └── vineet.jpg         # Profile image
├── src/
│   ├── components/        # Reusable UI components
│   ├── utils/             # Helper functions (markdown parsing)
│   ├── App.tsx            # Main application logic & layout
│   ├── constants.ts       # Static content (Experience, Education, etc.)
│   ├── types.ts           # TypeScript definitions
│   └── main.tsx           # Entry point
├── index.html             # HTML template & Tailwind CDN
├── package.json           # Dependencies & scripts
└── vite.config.ts         # Vite configuration
```

## 📄 License

[MIT](LICENSE) © Vineet Singh
