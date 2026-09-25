import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this as a project site under /fantastic-octo-computing-machine/,
  // not the domain root — but `npm run dev` should keep serving at root, unchanged.
  base: command === 'build' ? '/fantastic-octo-computing-machine/' : '/',
  plugins: [react()],
}))
