/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ctrl-plus-c/',
  plugins: [react()],
  test: {
    globals: true,           // Allows using 'test', 'expect' without imports
    environment: 'jsdom',    // Simulates a browser
    setupFiles: './src/setupTests.js', // Where you'll import matchers
  },
})
