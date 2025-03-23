import "@/app/globals.css";
import { Providers } from "./providers";
import { Metadata, Viewport } from "next";
import BottomBarWrapper from "@/common/ui/BottombarWrapper";

export const metadata: Metadata = {
  title: "AwOO",
  description: "AwOO - 강아지 라이프 플랫폼",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
  title,
  rightAction,
}: {
  children: React.ReactNode;
  title?: string;
  rightAction?: React.ReactNode;
}) {
  // 상단바가 표시될지 여부 결정
  const showTopBar = title || rightAction;

  return (
    <html lang="ko" className="h-screen">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link
          href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css"
          rel="stylesheet"
        />
      </head>

      <body className="h-screen flex flex-col">
        <Providers>
          {/* ✅ 메인 컨텐츠 영역 */}
          <main className="flex-1 overflow-y-auto w-full min-h-screen pb-14 scrollbar-hide">
            {children}
          </main>

          {/* ✅ 하단바 (fixed bottom-0) */}
          <BottomBarWrapper />
        </Providers>
      </body>
    </html>
  );
}
