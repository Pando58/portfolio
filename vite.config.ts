import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/portfolio/",
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    host: true,
  },
  plugins: [react()],
  assetsInclude: ["**/*.gltf"],
});
