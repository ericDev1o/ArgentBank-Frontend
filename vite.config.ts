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
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
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