import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    appDir: true,
  },
  // 이미지 도메인 설정 추가
  images: {
    domains: ["c209awoo.s3.us-east-2.amazonaws.com"],
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
