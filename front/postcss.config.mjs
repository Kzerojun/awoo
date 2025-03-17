// postcss.config.mjs

import autoprefixer from "autoprefixer";
import tailwindPostcssPlugin from "@tailwindcss/postcss";

export default {
  plugins: [
    tailwindPostcssPlugin, // Tailwind CSS PostCSS 플러그인
    autoprefixer, // 자동 접두어 추가
  ],
};
