import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this as a project site under /fantastic-octo-computing-machine/,
  // not the domain root — but `npm run dev` should keep serving at root, unchanged.
  // WORDPRESS_BASE overrides this for the WordPress shell-theme build (see
  // `npm run build:wordpress`), whose assets live under a theme subfolder
  // rather than the GitHub Pages repo subpath.
  base: command === 'build' ? (process.env.WORDPRESS_BASE || '/fantastic-octo-computing-machine/') : '/',
  plugins: [react()],
}))
