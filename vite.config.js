/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// Custom plugin to copy index.html to 404.html for GitHub Pages SPA routing
const copyIndexTo404 = () => {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      if (fs.existsSync('dist/index.html')) {
        fs.copyFileSync('dist/index.html', 'dist/404.html');
      }
    }
  }
}

// Automatically detect hosting environment
const isVercel = process.env.VERCEL === '1';
const isNetlify = process.env.NETLIFY === 'true';
// Assume GitHub Pages if production and not Vercel/Netlify
const isGitHubPages = process.env.NODE_ENV === 'production' && !isVercel && !isNetlify;

export default defineConfig({
  plugins: [react(), copyIndexTo404()],
  base: isGitHubPages ? '/Sarvana_Website/' : '/',
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-fiber';
            }
            if (id.includes('gsap') || id.includes('@gsap')) {
              return 'gsap';
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
