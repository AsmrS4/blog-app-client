import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5500,
    host: 'localhost',
    open: true
  },
  define: {
    SERVER_URL: `http://localhost:8800/api/v1`
  },

  esbuild: {
    jsxInject: `import React from 'react'`,
    treeShaking: true //команда, удаляющая неиспользуемый код
  }
})
