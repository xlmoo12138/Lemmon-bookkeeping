import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    UnoCSS(),
    react(),
    viteMockServe()
  ]
}))
