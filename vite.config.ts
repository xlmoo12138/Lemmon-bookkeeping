import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { svgsprites } from './vite_plugins/svgsprites'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: any) {
          if (id.includes('echarts')) {
            return 'echarts'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  },
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
    svgsprites({ noOptimizeList: ['pig', 'logo', 'chart', 'category', 'export', 'noty', 'calendar', 'delete'] })
  ]
}))
