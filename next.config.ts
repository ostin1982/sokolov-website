import type { NextConfig } from "next";

const githubPagesBasePath = process.env.GITHUB_PAGES_BASE_PATH;

const nextConfig: NextConfig = {
  cacheComponents: !githubPagesBasePath,
  partialPrefetching: !githubPagesBasePath,
  ...(githubPagesBasePath
    ? {
        output: "export" as const,
        basePath: githubPagesBasePath,
        trailingSlash: true,
      }
    : {
        async redirects() {
          return [
            {
              source: "/",
              destination: "/ru",
              permanent: false,
            },
          ];
        },
      }),
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
