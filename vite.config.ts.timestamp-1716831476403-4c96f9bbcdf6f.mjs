// vite.config.ts
import { defineConfig } from "file:///D:/Account/3.MuntasirAlAbid/Headline/react-news-app/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import react from "file:///D:/Account/3.MuntasirAlAbid/Headline/react-news-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import styleX from "file:///D:/Account/3.MuntasirAlAbid/Headline/react-news-app/node_modules/vite-plugin-stylex/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\Account\\3.MuntasirAlAbid\\Headline\\react-news-app";
var vite_config_default = defineConfig({
  plugins: [react(), styleX()],
  resolve: {
    alias: {
      //"@styles": resolve(__dirname, "./src/styles"),
      "@/assets": resolve(__vite_injected_original_dirname, "./src/assets"),
      "@/components": resolve(__vite_injected_original_dirname, "./src/components"),
      "@/routes": resolve(__vite_injected_original_dirname, "./src/routes"),
      "@/hooks": resolve(__vite_injected_original_dirname, "./src/hooks"),
      "@/types": resolve(__vite_injected_original_dirname, "./src/types")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBY2NvdW50XFxcXDMuTXVudGFzaXJBbEFiaWRcXFxcSGVhZGxpbmVcXFxccmVhY3QtbmV3cy1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEFjY291bnRcXFxcMy5NdW50YXNpckFsQWJpZFxcXFxIZWFkbGluZVxcXFxyZWFjdC1uZXdzLWFwcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQWNjb3VudC8zLk11bnRhc2lyQWxBYmlkL0hlYWRsaW5lL3JlYWN0LW5ld3MtYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQge3Jlc29sdmV9IGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgc3R5bGVYIGZyb20gXCJ2aXRlLXBsdWdpbi1zdHlsZXhcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLHN0eWxlWCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAvL1wiQHN0eWxlc1wiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9zdHlsZXNcIiksXG4gICAgICBcIkAvYXNzZXRzXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2Fzc2V0c1wiKSxcbiAgICAgIFwiQC9jb21wb25lbnRzXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2NvbXBvbmVudHNcIiksXG4gICAgICBcIkAvcm91dGVzXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3JvdXRlc1wiKSxcbiAgICAgIFwiQC9ob29rc1wiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9ob29rc1wiKSxcbiAgICAgIFwiQC90eXBlc1wiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy90eXBlc1wiKVxuICAgIH1cbiAgfVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQXFWLFNBQVMsb0JBQW9CO0FBQ2xYLFNBQVEsZUFBYztBQUV0QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZO0FBSm5CLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUUsT0FBTyxDQUFDO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBO0FBQUEsTUFFTCxZQUFZLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQzdDLGdCQUFnQixRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLE1BQ3JELFlBQVksUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDN0MsV0FBVyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUMzQyxXQUFXLFFBQVEsa0NBQVcsYUFBYTtBQUFBLElBQzdDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
