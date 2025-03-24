"use client";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin" || pathname === "/admin/";

  return (
    <div className="flex min-h-screen">
      {/* 로그인 페이지가 아닐 때만 사이드바 표시 */}
      {!isLoginPage && <Sidebar />}

      <div className={`flex-1 flex flex-col ${!isLoginPage ? "ml-50" : ""}`}>
        {/* 로그인 페이지가 아닐 때만 탑바 표시 */}
        {!isLoginPage && <Topbar />}

        {/* 페이지 내용이 들어갈 영역 */}
        <main className={`flex-1 ${!isLoginPage ? "pt-20" : ""}`}>
          <div className="bg-white p-6 mt-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
