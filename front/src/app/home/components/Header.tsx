"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-lg">이다은</h1>
      <nav className="flex space-x-4">
        <Link href="/home">
          <span className={`${pathname === "/home" ? "text-black " : "text-gray-400"}`}>상품</span>
        </Link>
        <Link href="/my-account">
          <span className={`${pathname === "/#" ? "text-black" : "text-gray-400"}`}>내 계좌</span>
        </Link>
        <BellIcon className="h-6 w-6 text-gray-500" />
      </nav>
    </header>
  );
}
