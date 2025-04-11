// next.config.ts
import withPWA from "next-pwa";
import type { NextConfig } from "next";

const baseConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["c209awoo.s3.us-east-2.amazonaws.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader", "postcss-loader"],
    });
    return config;
  },
};

// ✅ 이렇게 감싸줘야 sw.js 생성됨!
const withPWAConfig = withPWA({
  dest: "public",
  register: false,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // ✅ 개발환경 비활성화

  buildExcludes: [/firebase-messaging-sw\.js$/, /app-build-manifest\.json$/],
  sw: "sw.js",
});

export default withPWAConfig(baseConfig);
