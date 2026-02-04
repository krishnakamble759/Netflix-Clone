import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: './',
    base: '/Netflix-Clone/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },
    server: {
        port: 3000,
        open: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true,
            },
        },
    },
});
