import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
import { execSync } from 'child_process';

/**
 * Custom Vite plugin that watches markdown files in content/blog/
 * and images in public/blog/, automatically rebuilding when they change.
 */
function contentWatchPlugin(): Plugin {
  let imageOptimizeTimeout: ReturnType<typeof setTimeout> | null = null;

  const runImageOptimization = () => {
    // Debounce image optimization to handle batch additions
    if (imageOptimizeTimeout) {
      clearTimeout(imageOptimizeTimeout);
    }
    imageOptimizeTimeout = setTimeout(() => {
      try {
        execSync('npx tsx scripts/optimize-images.ts', { stdio: 'inherit' });
        console.log('🔄 Hot reloading...\n');
      } catch (error) {
        console.error('❌ Failed to optimize images:', error);
      }
    }, 500);
  };

  const handleImageFile = (file: string, eventType: string) => {
    if (file.includes('public/blog') && /\.(png|jpg|jpeg)$/i.test(file)) {
      console.log(`\n🖼️  Image ${eventType}: ${path.basename(file)}`);
      runImageOptimization();
    }
  };

  return {
    name: 'content-watch',
    configureServer(server) {
      // Watch markdown content
      server.watcher.add('./content/blog');
      // Watch images in public/blog
      server.watcher.add('./public/blog');

      server.watcher.on('change', (file) => {
        if (file.includes('content/blog') && file.endsWith('.md')) {
          console.log(`\n📝 Blog content changed: ${path.basename(file)}`);
          try {
            execSync('npx tsx scripts/build-content.ts', { stdio: 'inherit' });
            console.log('🔄 Hot reloading...\n');
          } catch (error) {
            console.error('❌ Failed to rebuild content:', error);
          }
        }
        handleImageFile(file, 'changed');
      });

      server.watcher.on('add', (file) => {
        handleImageFile(file, 'added');
      });
    }
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/vineet-blog/',
      assetsInclude: ['**/*.md'],
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        contentWatchPlugin(),
        imagetools({
          defaultDirectives: (url) => {
            // Auto-apply webp format and quality to all processed images
            return new URLSearchParams({
              format: 'webp',
              quality: '80',
            });
          },
        }),
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom'],
            }
          }
        }
      }
    };
});
