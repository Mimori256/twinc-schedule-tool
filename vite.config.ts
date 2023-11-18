import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "https://mimori256.github.io/twinc-schedule-tool/",
  build: {
    outDir: './dist',
  }
})
