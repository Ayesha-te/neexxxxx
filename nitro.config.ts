import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  preset: process.env.VERCEL ? "vercel" : "node-server",
  compatibilityDate: "2026-05-05",
  publicAssets: [
    {
      dir: ".output/public",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    },
  ],
  rollupConfig: {
    output: {
      entryFileNames: "index.mjs",
    },
  },
  typescript: {
    esbuild: {
      options: {
        target: "ES2020",
      },
    },
  },
});
