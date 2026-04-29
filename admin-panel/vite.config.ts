import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const adminRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: adminRoot,
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(adminRoot, "../src"),
      "@admin": path.resolve(adminRoot, "./src"),
    },
  },
  server: {
    port: 5174,
  },
  preview: {
    port: 4174,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
