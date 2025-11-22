import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache components and related features require Next.js canary
  // To enable, upgrade with: pnpm add next@canary
  // Then you can use:
  // - experimental.cacheComponents: true
  // - experimental.cacheLife: { ... }
  // - "use cache" directive in components
};

export default nextConfig;
