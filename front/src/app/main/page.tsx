"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function MainPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-[80px] flex justify-between items-center px-12 py-5 bg-white border-b border-gray-200">
        <img src="/logos/AwOO_logo.svg" alt="AwOO 로고" className="h-8" />
        <nav className="space-x-8 text-sm text-gray-600">
          <a href="#">서비스 소개</a>
          <a href="#">상품안내</a>
          <a href="#">고객센터</a>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 flex justify-center gap-5 items-center bg-gradient-to-r from-[#00c3a5] via-[#33d1b9] to-[#66e0cd] text-white px-32">
        {/* Left */}
        <div className="w-[600px] space-y-6 flex flex-col items-start">
          <h2 className="text-6xl font-bold leading-normal whitespace-pre-line text-left">
            새로운
            <br />
            발자국 금융 라이프
          </h2>
          <p className="text-lg leading-relaxed text-white/90 text-left">
            걸을수록 쌓이는 발자국, 모일수록 커지는 행복
            <br />
            당신과 반려견을 위한 새로운 금융 경험을 만나보세요.
          </p>

          {/* QR Section */}
          <div className="mt-4 space-y-2 text-left">
            <p className="text-sm text-white/80">모바일로 QR을 스캔하여 앱을 설치하세요</p>
            <div className="inline-block p-4 rounded-2xl border border-white bg-white shadow-lg">
              <QRCode value="https://awoofinance.duckdns.org" style={{ width: 140, height: 140 }} />
            </div>
            <p className="text-xs text-white/70">QR 스캔 후 홈 화면에 추가하고,</p>
          </div>
        </div>

        {/* Right - Dog */}
        <div className="flex justify-center items-center">
          <img src="/icons/main/paw_dog.svg" alt="귀여운 강아지" className="w-[600px]" />
        </div>
      </main>

      {/* Footer */}
      <footer className="h-[50px] bg-white flex justify-center items-center text-xs text-gray-500">
        © 2025 AwOO. All Rights Reserved.
      </footer>
    </div>
  );
}
