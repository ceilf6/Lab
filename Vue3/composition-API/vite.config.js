module.exports = { // 初代不需要 import { defineConfig } from 'vite' 
    // export default defineConfig
    proxy: { // 初代不需要将 proxy 包在 server 中
        '/api': {
            target: 'http://127.0.0.1:5500/Vue3/composition-API',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '') // 重写去除 /api
        }
    }
}