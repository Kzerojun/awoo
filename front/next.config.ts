import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    appDir: true,
  },
  // ✅ next-pwa 설정은 별도로 적용
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: false,
  }),
  webpack(config) {
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader", "postcss-loader"], // PostCSS 로더 설정
    });
    return config;
  },
};

export default nextConfig;
