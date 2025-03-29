"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const pathname = usePathname();

  // ✅ 그룹별로 처리
  const isProductPage =
    (pathname.startsWith("/home") && pathname !== "/home/myaccount") ||
    pathname.startsWith("/account/saving") ||
    pathname.startsWith("/account/open");
  const isMyAccountPage = pathname.startsWith("/home/myaccount");

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 flex justify-between items-center p-4">
      <h1 className="text-lg">이다은</h1>
      <nav className="flex space-x-4">
        <Link href="/home">
          <span className={`${isProductPage ? "text-black" : "text-gray-400"}`}>상품</span>
        </Link>
        <Link href="/home/myaccount">
          <span className={`${isMyAccountPage ? "text-black" : "text-gray-400"}`}>내 계좌</span>
        </Link>
        <BellIcon className="h-6 w-6 text-gray-500" />
      </nav>
    </header>
  );
}
