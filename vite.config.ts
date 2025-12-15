import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { execSync } from 'child_process';

/**
 * Custom Vite plugin that watches markdown files in content/blog/
 * and automatically rebuilds the generated posts when they change.
 */
function contentWatchPlugin(): Plugin {
  return {
    name: 'content-watch',
    configureServer(server) {
      server.watcher.add('./content/blog');
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
      plugins: [react(), contentWatchPlugin()],
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
