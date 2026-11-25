import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  // Optional separate build folder, so a production build can run while `next dev` uses .next.
  // The static export then lands in that folder too (not out/); the post-build and test scripts follow it.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  basePath: basePath || undefined,
  trailingSlash: true,
  outputFileTracingRoot: process.cwd(),
  // Unknown URLs get a real, bilingual 404 (the app has no single root layout).
  experimental: { globalNotFound: true },
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
