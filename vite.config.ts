import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
  },
  publicDir: "public",
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    nitro({ 
      preset: 
        process.env.NETLIFY === "true"
          ? "netlify"
          : process.env.VERCEL === "1" || process.env.VERCEL_ENV
          ? "vercel" 
          : process.env.NODE_ENV === "production" 
            ? "netlify"
            : "node-server"
    }),
    viteReact(),
    tailwindcss(),
  ],
});
