import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://38.242.131.127:1020",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
