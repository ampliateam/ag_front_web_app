import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import createBabelPlugin  from 'vite-plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [vue(),
    createBabelPlugin({
      babelConfig: {
        presets: ['@babel/preset-env']
      }
    })
  ],
})
