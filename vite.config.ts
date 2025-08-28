import { defineConfig, ConfigEnv, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

export default function ({ mode }: ConfigEnv): UserConfigExport {
  return defineConfig({
    plugins: [react()],
    build: {
      assetsDir: '.',
    },
    server: {
      port: 8000,
      proxy: {
        '/api/v1': {
          target: 'http://localhost:3001',
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@test': path.resolve(__dirname, './test')
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        less: {
          modifyVars: { 'primary-color': '#13c2c2' },
          javascriptEnabled: true,
        },
      },
    },
  });
}