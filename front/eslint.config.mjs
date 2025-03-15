import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended" // ✅ Prettier 연동 추가
  ),
  {
    plugins: ["prettier"], // ✅ Prettier 플러그인 추가
    rules: {
      "prettier/prettier": "error", // ✅ Prettier 룰을 ESLint에서 오류로 표시
    },
  },
];

export default eslintConfig;
