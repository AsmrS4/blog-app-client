import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  server: {
    port: 5500,
    host: 'localhost',
    open: true
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
      {find: '@utils', replacement:'/src/utils'},
      {find: '@styles', replacement:'/src/styles'}
    ]
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    treeShaking: true //команда, удаляющая неиспользуемый код
  }
})
