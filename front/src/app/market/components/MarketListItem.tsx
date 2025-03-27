"use client";

import Image from "next/image";
import React from "react";
import { MarketItem } from "../types/market";
import { EyeIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function MarketListItem({ id, image, title, time, price, views, chat }: MarketItem) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/market/${id}`);
  };
  return (
    <div onClick={handleClick} className="flex gap-3 border-b  border-gray-200 pb-4">
      {/* 썸네일 */}
      <div className="w-24 h-24 relative flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* 정보 */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900 line-clamp-2">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{time}</p>
        </div>
        <div className="text-base font-bold text-gray-900 mt-1">{price}</div>
        <div className="text-xs text-gray-400 mt-1 flex items-center space-x-2">
          <span className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            {views}
          </span>
          <span className="flex items-center gap-1">
            <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
            {chat}
          </span>
        </div>
      </div>
    </div>
  );
}
