import "@/app/globals.css"; // 글로벌 CSS 파일 불러오기 (Tailwind 포함)
import { Providers } from "./providers";
import { Metadata, Viewport } from "next"; // Next.js의 Metadata API 사용
import Bottombar from "@/common/ui/BottomBar";

// Next.js에서 페이지 메타데이터(PWA 포함) 설정
export const metadata: Metadata = {
  title: "AwOO", // ✅ PWA 기본 타이틀
  description: "AwOO - 강아지 라이프 플랫폼", // ✅ SEO 및 검색 최적화
  manifest: "/manifest.json", // ✅ PWA 설정 파일 연결
};

// viewport는 별도로 설정
export const viewport: Viewport = {
  width: "device-width", // 뷰포트를 기기의 화면 너비에 맞게 조정 (반응형 레이아웃을 위해 필요)
  initialScale: 1, // 페이지 로드 시 기본 확대 배율 (1: 기본 크기)
  maximumScale: 1, // 사용자가 페이지를 확대(줌)하는 것을 방지 (접근성을 고려해 변경 가능)
  themeColor: "#ffffff", //PWA 및 모바일 브라우저의 상단 바(탭 바) 색상 설정
};
// RootLayout 컴포넌트 (Next.js App Router에서 모든 페이지를 감싸는 역할)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* 나눔스퀘어네오 웹폰트 추가 */}
        <link
          href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Bottombar />
      </body>
    </html>
  );
}
