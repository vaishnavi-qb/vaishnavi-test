import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward /activities requests to the Python backend
      '/activities': 'http://localhost:8000',
    },
  },
})
