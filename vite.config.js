import {defineConfig} from 'vite';
import {ViteEjsPlugin} from 'vite-plugin-ejs';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'
import {fileURLToPath} from 'url';
import path from 'path';

const resolveFixup = {
    name: 'resolve-fixup',
    setup(build) {
        build.onResolve({filter: /react-virtualized/}, async args => {
            return {
                path: path.resolve('./node_modules/react-virtualized/dist/umd/react-virtualized.js'),
            };
        });
    },
};


// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        esbuildOptions: {
            // фикс недоступности импорта одной из зависимостей внутри React Virtualized
            plugins: [resolveFixup],
        },
    },
    plugins: [
        react(),
        ViteEjsPlugin(config => ({
            title: config.env.VITE_APP_TITLE,
        })),
        svgr(),
    ],
    css: {
        devSourcemap: true,
    },
    server: {
        port: 3003,
    },
});
