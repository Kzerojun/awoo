import "@/app/globals.css"; // 글로벌 CSS (Tailwind 포함)
import { Providers } from "./providers";
import { Metadata, Viewport } from "next";
import BottombarWrapper from "@/common/ui/BottombarWrapper"; // 클라이언트 하단바 컴포넌트

// ✅ Next.js에서 metadata 유지 (서버 컴포넌트 전용)
export const metadata: Metadata = {
  title: "AwOO",
  description: "AwOO - 강아지 라이프 플랫폼",
  manifest: "/manifest.json",
};

// ✅ viewport 설정 (PWA 최적화)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <main className="flex-1">{children}</main>
            {/* ✅ 클라이언트 컴포넌트로 분리된 하단바 */}
            <BottombarWrapper />
          </div>
        </Providers>
      </body>
    </html>
  );
}
