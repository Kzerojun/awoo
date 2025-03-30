"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function QRSection() {
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      setShowQR(true);
    }
  }, []);

  if (!showQR) return null;

  return (
    <div className="mt-8 text-center space-y-3">
      {/* 안내문 */}
      <p className="text-sm text-gray-600 font-medium">
        📱 모바일로 아래 QR을 스캔하여 앱을 설치하세요
      </p>

      {/* QR 박스 */}
      <div className="inline-block p-4 rounded-2xl border border-gray-200 bg-white shadow-lg">
        <QRCode value="https://awoofinance.duckdns.org" style={{ width: 140, height: 140 }} />
      </div>

      {/* 설명 */}
      <p className="text-xs text-gray-400">
        QR 스캔 후 <span className="font-semibold text-gray-600">앱 설치</span>를 눌러주세요
      </p>
    </div>
  );
}
