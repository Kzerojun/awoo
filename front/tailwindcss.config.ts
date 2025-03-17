export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // ✅ Next.js App Router 적용
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ 전체 프로젝트 감지
    "./src/domains/**/*.{js,ts,jsx,tsx}", // ✅ 비즈니스 로직 관련 컴포넌트 포함
    "./src/styles/**/*.{css,scss}", // ✅ Tailwind 관련 CSS 파일 감지
    "./src/common/**/*.{js,ts,jsx,tsx}",
    "./src/stories/**/*.{js,ts,jsx,tsx}", // Storybook 파일 경로 추가
  ],
  theme: {
    extend: {
      fontFamily: {
        nanumsquare: ["NanumSquareNeo", "sans-serif"],
      },
      colors: {
        "--aqua": "#0fc9ba",
        "LIGHT-AQUA": "#8aede1",
        GREEN: "#77debb",
        "LIGHT-GREEN": "#9eebd1",
        WHITE: "#FFFFFF",
        BLACK: "#000000",
        GRAY: "968F8F",
        ERROR: "#f12a2a",
      },
    },
  },
  plugins: [],
};
