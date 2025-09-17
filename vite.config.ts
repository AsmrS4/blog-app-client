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
  resolve: {
    alias: [
      {find: '@api', replacement:'/src/api'},
      {find: '@app', replacement:'/src/app'},
      {find: '@assets', replacement:'/src/assets'},
      {find: '@models', replacement:'/src/models'},
      {find: '@components', replacement:'/src/components'},
      {find: '@hooks', replacement:'/src/hooks'},
      {find: '@pages', replacement:'/src/pages'},
      {find: '@store', replacement:'/src/store'},
      {find: '@styles', replacement:'/src/styles'}
    ]
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    treeShaking: true //команда, удаляющая неиспользуемый код
  }
})
