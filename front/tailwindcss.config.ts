

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // ✅ Next.js App Router 적용
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ 전체 프로젝트 감지
    "./src/domains/**/*.{js,ts,jsx,tsx}", // ✅ 비즈니스 로직 관련 컴포넌트 포함
    "./src/styles/**/*.{css,scss}", // ✅ Tailwind 관련 CSS 파일 감지
    "./src/common/**/*.{js,ts,jsx,tsx}",
    "./src/stories/**/*.{js,ts,jsx,tsx}", // Storybook 파일 경로 추가
    "../app/globals.css",
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
