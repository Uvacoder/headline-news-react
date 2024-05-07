import { defineConfig } from 'vite';
import {resolve} from "path";

import react from '@vitejs/plugin-react';
import styleX from "vite-plugin-stylex";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),styleX()],
  resolve: {
    alias: {
      //"@styles": resolve(__dirname, "./src/styles"),
      "@/assets": resolve(__dirname, "./src/assets"),
      "@/components": resolve(__dirname, "./src/components"),
      "@/routes": resolve(__dirname, "./src/routes"),
      "@/hooks": resolve(__dirname, "./src/hooks"),
      "@/types": resolve(__dirname, "./src/types")
    }
  }
})