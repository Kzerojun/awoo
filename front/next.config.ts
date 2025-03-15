import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
};

export default nextConfig;
