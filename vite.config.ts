import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this as a project site under /fantastic-octo-computing-machine/
  // by default — but `npm run dev` always serves at root, unchanged. SITE_BASE
  // overrides the build-time base for other deploy targets: '/' for a plain
  // static deploy at a domain root (`npm run build:production`), or a theme
  // subfolder for the WordPress shell build (`npm run build:wordpress`).
  base: command === 'build' ? (process.env.SITE_BASE || '/fantastic-octo-computing-machine/') : '/',
  plugins: [react()],
}))
