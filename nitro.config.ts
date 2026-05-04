import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  // Use vercel preset when on Vercel, otherwise node-server
  preset: 
    process.env.VERCEL === "1" || 
    process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production" && process.env.VERCEL_ENV
      ? "vercel" 
      : "node-server",
  
  compatibilityDate: "2026-05-05",
  
  // These settings ensure public files are served correctly
  publicAssets: [
    {
      dir: "./public",
      maxAge: 60 * 60 * 24 * 365,
    },
  ],

  // Ensure SSR routes are prioritized
  routeRules: {
    "/**": { cache: false, headers: { "Cache-Control": "no-cache" } },
    "/**/*.js": { cache: { maxAge: 60 * 60 * 24 } },
    "/**/*.css": { cache: { maxAge: 60 * 60 * 24 } },
    "/**/*.json": { cache: { maxAge: 60 * 60 } },
  },
});
