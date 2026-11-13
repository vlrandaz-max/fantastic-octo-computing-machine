import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Writes the built stylesheet straight into index.html instead of linking
// it as a separate file. The production host intermittently drops single
// requests, and a dropped stylesheet leaves the whole page unstyled; with
// the styles inside the page itself, that failure can't happen.
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = Object.values(bundle).find((f) => f.type === 'asset' && f.fileName.endsWith('.html'))
      if (!html || html.type !== 'asset') return
      let source = String(html.source)
      for (const [fileName, file] of Object.entries(bundle)) {
        if (file.type !== 'asset' || !fileName.endsWith('.css')) continue
        const tag = new RegExp(`<link rel="stylesheet"[^>]*href="[^"]*${fileName.replace(/[.]/g, '\\.')}"[^>]*>`)
        if (!tag.test(source)) continue
        const css = String(file.source).replace(/<\/style/gi, '<\\/style')
        source = source.replace(tag, () => `<style>${css}</style>`)
        delete bundle[fileName]
      }
      html.source = source
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this as a project site under /fantastic-octo-computing-machine/
  // by default — but `npm run dev` always serves at root, unchanged. SITE_BASE
  // overrides the build-time base for other deploy targets: '/' for a plain
  // static deploy at a domain root (`npm run build:production`), or a theme
  // subfolder for the WordPress shell build (`npm run build:wordpress`).
  base: command === 'build' ? (process.env.SITE_BASE || '/fantastic-octo-computing-machine/') : '/',
  plugins: [react(), inlineCss()],
}))
