import "@/app/globals.css"; // 글로벌 CSS 파일 불러오기 (Tailwind 포함)
import { Providers } from "./providers";
import { Metadata } from "next"; // Next.js의 Metadata API 사용

// Next.js에서 페이지 메타데이터(PWA 포함) 설정
export const metadata: Metadata = {
  title: "AwOO", // ✅ PWA 기본 타이틀
  description: "AwOO - 강아지 라이프 플랫폼", // ✅ SEO 및 검색 최적화
  manifest: "/manifest.json", // ✅ PWA 설정 파일 연결
  themeColor: "#ffffff", // ✅ PWA 테마 색상 설정
  viewport: "width=device-width, initial-scale=1, maximum-scale=1", // ✅ 모바일 최적화
};

// RootLayout 컴포넌트 (Next.js App Router에서 모든 페이지를 감싸는 역할)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
