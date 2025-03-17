const tailwindConfig = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // ✅ Next.js App Router 적용
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ 전체 프로젝트 감지
  ],
  theme: {
    extend: {
      fontFamily: {
        nanumsquare: ["NanumSquareNeo", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
