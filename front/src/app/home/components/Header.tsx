"use client";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-lg">이다은</h1>
      <nav className="flex space-x-4">
        <a href="#" className="text-gray-600">
          상품
        </a>
        <a href="#" className="text-gray-600">
          내 계좌
        </a>
        <BellIcon className="h-6 w-6 text-gray-500" />
      </nav>
    </header>
  );
}
