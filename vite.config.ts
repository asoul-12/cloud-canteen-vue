import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import * as path from 'path';

const plugins = [
  vue(),
  AutoImport({
    resolvers: [
      TDesignResolver({
        library: 'vue-next',
      }),
    ],
  }),
  Components({
    resolvers: [
      TDesignResolver({
        library: 'vue-next',
      }),
    ],
  }),
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);

  return {
    mode: env.VITE_MODE_NAME,
    root: './',
    base: './',
    envDir: './conf',
    publicDir: 'assets',
    plugins,

    server: {
      port: 3001,
      proxy: {
        '/v1': {
          target: 'http://localhost',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/v1/, ''),
        },
        '/v2': {
          target: 'http://localhost:81',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/v2/, ''),
        },
      },
    },

    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'img/',
      sourcemap: env.VITE_MODE_NAME === 'development',
      minify: env.VITE_MODE_NAME === 'development' ? 'terser' : false,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        api: path.resolve(__dirname, 'src/api'),
        utils: path.resolve(__dirname, 'src/utils'),
        components: path.resolve(__dirname, 'src/components'),
        types: path.resolve(__dirname, 'src/types'),
        assets: path.resolve(__dirname, 'src/assets'),
        routes: path.resolve(__dirname, 'src/routes'),
        views: path.resolve(__dirname, 'src/views'),
      },
    },
  };
});
