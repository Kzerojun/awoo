"use client";

import { useState } from "react";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { searchUsedProducts } from "@/api/market/search/search";
import { MarketItem } from "../types/market";

export default function MarketSearchBar({
  onSearchResults,
}: {
  onSearchResults: (results: MarketItem[]) => void;
}) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = async () => {
    if (!keyword.trim()) return;

    try {
      const result = await searchUsedProducts(keyword);
      onSearchResults(result.response.usedProducts);
    } catch (error) {
      console.error("상품 검색 중 오류 발생:", error);
      onSearchResults([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center border border-gray-400 rounded-md px-3 py-2 bg-white">
      <Bars3Icon className="w-6 h-6 text-gray-500" />
      <input
        type="text"
        placeholder="상품명을 입력하세요"
        className="flex-1 mx-2 text-sm focus:outline-none"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <MagnifyingGlassIcon
        className="w-5 h-5 text-gray-500 cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
}
