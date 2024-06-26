/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  swcMinify: true,

  compiler: {
    styledComponents: true,
  },
  // env: {},

  // rewrites: {
  //   beforeFiles: {
  //     source: '/api/:path*',
  //     destination: 'https://main.dmb5wiywaiaet.amplifyapp.com/api/:path*',
  //   },
  // },
  // headers: {
  //   key: 'X-DNS-Prefetch-Control',
  //   value: 'on',
  // },

  // domain whitelist
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'roadmaker-images.s3.amazonaws.com',
      },
    ],
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
        },
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')();

// module.exports = nextConfig;

module.exports =
  process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig;
