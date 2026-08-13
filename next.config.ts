import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/ca",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
