import "@/app/globals.css";
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
    <html lang="ko" className="min-h-[100dvh]">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link
          href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css"
          rel="stylesheet"
        />
      </head>

      {/* ✅ `overflow-hidden` 제거, `min-h-[100dvh]` 적용 */}
      <body className="min-h-[100dvh] flex flex-col">
        <Providers>
          {/* ✅ `h-[calc(100dvh-3rem)]`을 사용하여 하단바 제외한 높이 설정 */}
          <main className="flex-1 h-[calc(100dvh-48px)] overflow-y-auto">{children}</main>
        </Providers>

        {/* ✅ 하단바 고정 유지 - `fixed bottom-0`으로 변경 */}
        <div className="fixed bottom-0 left-0 w-full h-12">
          <BottombarWrapper />
        </div>
      </body>
    </html>
  );
}
