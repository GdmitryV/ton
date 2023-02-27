import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import * as path from "path";

export default defineConfig({
    plugins: [react(), viteTsConfigPaths()],

    define: {
        __APP_ENV__: process.env
    }
})