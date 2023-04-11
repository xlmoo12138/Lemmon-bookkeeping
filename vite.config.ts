import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { svgsprites } from './vite_plugins/svgsprites'

// https://vitejs.dev/config/
// @ts-expect-error
export default defineConfig(({ command }) => ({
  server: {
    proxy: {
      '/api': {
        target: 'http://121.196.236.94:8080/',
        changeOrigin: true,
      }
    },
    host: '0.0.0.0'
  },
  define: {
    isDev: command === 'serve'
  },
  plugins: [
    UnoCSS(),
    react(),
    viteMockServe(),
    svgsprites({ noOptimizeList: ['logo', 'chart', 'category', 'export', 'noty', 'calendar', 'delete'] })
  ]
}))
