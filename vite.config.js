import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // or whatever you need it to be
        changeOrigin: true,
      },
    },
  },
})

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
