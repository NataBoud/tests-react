/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js',
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        '**/node_modules/**', 
        '**/tests/**',   
        'eslint.config.js',
        'src/main.tsx',
        'src/App.tsx',
        '**/dist/**',  
        'vite.config.ts'     
      ]
    }
  }
})
