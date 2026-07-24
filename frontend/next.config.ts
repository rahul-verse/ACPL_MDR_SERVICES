import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withBundleAnalyzer = (config: NextConfig): NextConfig => {
  if (process.env.ANALYZE === "true") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const withBundleAnalyzer = require("@next/bundle-analyzer")({
      enabled: true,
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: "bundle-stats.json",
      logLevel: "info",
    });
    return withBundleAnalyzer(config);
  }
  return config;
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: path.join(__dirname),
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withBundleAnalyzer(nextConfig);
