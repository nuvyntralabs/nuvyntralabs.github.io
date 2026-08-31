import type { NextConfig } from "next";
import { writePublicSitemaps } from "./lib/sitemap-xml";

writePublicSitemaps();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
