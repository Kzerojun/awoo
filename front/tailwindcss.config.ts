const tailwindConfig = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // ✅ Next.js App Router 적용
    "./src/components/**/*.{js,ts,jsx,tsx}", // ✅ 컴포넌트 폴더 포함
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default tailwindConfig;
