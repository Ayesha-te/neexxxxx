import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const url = new URL(event.node.req.url || "/", `http://${event.node.req.headers.host}`);
  
  // Don't intercept API routes, static files with extensions, or well-known paths
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/.well-known") ||
    url.pathname.startsWith("/admin/") ||
    url.pathname.match(/\.\w+$/) // has file extension like .js, .css, .png, etc
  ) {
    return;
  }

  // For all other routes (SPA routes), just let TanStack Start handle it
  // The response will be SSR'd by the TanStack Start handler
});
