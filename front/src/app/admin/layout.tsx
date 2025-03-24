"use client";

import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin" || pathname === "/admin/";

  return (
    <div className="flex min-h-screen">
      {!isLoginPage && <Sidebar />}
      <main className={`flex-1 ${!isLoginPage ? "ml-55" : ""}`}>{children}</main>
    </div>
  );
}
