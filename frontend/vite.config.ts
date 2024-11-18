import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const BACKEND_URL = env.VITE_BACKEND_URL

  if (!BACKEND_URL) {
    throw new Error('BACKEND_URL is not defined in .env file')
  }

  return {
    plugins: [svelte()],
    server: {
      proxy: {
        '/api': {
          target: BACKEND_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        $lib: path.resolve(__dirname, './src/lib'),
      }
    },
  }
})
