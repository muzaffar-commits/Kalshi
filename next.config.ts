import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // ✅ REQUIRED for out/
  trailingSlash: true, // ✅ folder-based routing
  images: {
    unoptimized: true, // ✅ required for export
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
