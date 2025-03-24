"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// 컴포넌트에 필요한 프로퍼티 타입 정의
interface TopbarProps {
  username?: string;
}

export default function Topbar({ username = "Administrator" }: TopbarProps) {
  const [currentPage, setCurrentPage] = useState<string>("");
  const pathname = usePathname();

  // 현재 경로에 따라 페이지 타이틀 설정
  useEffect(() => {
    if (pathname.includes("/admin/userReport")) {
      setCurrentPage("유저 신고 관리");
    } else if (pathname.includes("/admin/userAccount")) {
      setCurrentPage("유저 계좌 관리");
    } else if (pathname.includes("/admin/saveProduct")) {
      setCurrentPage("적금 상품 관리");
    } else if (pathname.includes("/admin/questions")) {
      setCurrentPage("문의 사항");
    } else {
      setCurrentPage("");
    }
  }, [pathname]);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    // 실제 로그아웃 로직 구현
    // 예: 토큰 삭제, 세션 종료 등
    console.log("로그아웃");
    // 로그인 페이지로 리다이렉트
    window.location.href = "/admin";
  };

  // 로그인 페이지에서는 Topbar를 표시하지 않음
  if (pathname === "/admin" || pathname === "/admin/") {
    return null;
  }

  return (
    <div className="h-25 flex items-center justify-between px-6 bg-[#FCFCFC] border-b border-gray-200 fixed top-0 right-0 left-50 z-10">
      {/* 현재 페이지 타이틀 */}
      <div className="text-2xl font-bold text-teal-500 mt-6 ml-1">{currentPage}</div>

      {/* 오른쪽 유저 정보 및 드롭다운 */}
      <div className="flex items-center gap-2 cursor-pointer mr-3">
        <div className="relative flex flex-col items-end">
          {/* 로그아웃 버튼 - 상단에 위치 */}
          <div
            className="mt-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-500 text-xs"
            onClick={handleLogout}
          >
            로그아웃
          </div>

          {/* 유저 프로필 - 하단에 위치 */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full mb-1 bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
              A
            </div>
            <span className="text-gray-800 font-medium">{username}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
