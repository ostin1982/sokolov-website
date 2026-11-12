import type { NextConfig } from "next";

const githubPagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig: NextConfig = {
  cacheComponents: !githubPagesBasePath,
  partialPrefetching: !githubPagesBasePath,
  ...(githubPagesBasePath
    ? {
        output: "export" as const,
        basePath: githubPagesBasePath,
        trailingSlash: true,
      }
    : {}),
  images: {
    unoptimized: Boolean(githubPagesBasePath),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
    ...(githubPagesBasePath
      ? {
          resolveAlias: {
            "@/utils/helpers": "./src/utils/helpers-static.ts",
          },
        }
      : {}),
  },
};

export default nextConfig;
