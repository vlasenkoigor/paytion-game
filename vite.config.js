import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import checker from 'vite-plugin-checker';

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.


  return {
    esbuild: {
      target: "es2020"
    },
    plugins: [
      checker({
        typescript: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    build: {},
  };
});
