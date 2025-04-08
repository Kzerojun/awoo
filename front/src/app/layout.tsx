import "./globals.css";
import { ReactNode } from "react";
import ClientWrapper from "./ClientWrapper";

export const metadata = {
  title: "AwOO",
  description: "AwOO - 강아지 라이프 플랫폼",
  manifest: "/manifest.json",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head />
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
