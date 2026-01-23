// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // output: "export",
//   basePath: "",
//   assetPrefix: "",
//   images: {
//     unoptimized: true,
//   },
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig = {
//   images: {
//     unoptimized: true,
//   },
// } satisfies NextConfig;

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
