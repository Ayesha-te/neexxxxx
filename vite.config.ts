import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  publicDir: "public",
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    nitro({ 
      preset: 
        process.env.VERCEL === "1" || process.env.VERCEL_ENV
          ? "vercel" 
          : process.env.NODE_ENV === "production" 
            ? "vercel"
            : "node-server"
    }),
    viteReact(),
    tailwindcss(),
  ],
});
