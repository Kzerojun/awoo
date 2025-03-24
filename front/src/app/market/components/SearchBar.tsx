"use client";

import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";

export default function MarketSearchBar() {
  return (
    <div className="flex items-center border border-gray-400 rounded-md px-3 py-2 bg-white">
      <Bars3Icon className="w-6 h-6 text-gray-500" />
      <input
        type="text"
        placeholder="상품명을 입력하세요"
        className="flex-1 mx-2 text-sm focus:outline-none caret-transparent"
      />
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
    </div>
  );
}
