import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 builds a fully static site (./out) for hosts without a Node
 * server, such as GitHub Pages. In that mode the enquiry API route is not
 * available (the Pages workflow removes it before building), images are served
 * unoptimised, and NEXT_PUBLIC_BASE_PATH sets the sub-path (e.g. /elara).
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || undefined;

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      basePath,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
