import { defineConfig } from 'vite'

export default defineConfig({
  root: './ws-测试2',
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: '../dist'
  }
})