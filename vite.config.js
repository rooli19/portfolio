import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

const pages = [
  'index', 'about', 'works', 'playground', 'contact', '404',
  'works/transpogapo', 'works/resh', 'works/landr', 'works/hiss-n-miss',
  'works/zen', 'works/uno', 'works/danang', 'works/katagina',
]

export default defineConfig({
  plugins: [react()],
  appType: 'mpa',
  build: { rolldownOptions: { input: pages.map(page => resolve(import.meta.dirname, page + '.html')) } },
})
