"use client";

import Image from "next/image";
import React from "react";
import { MarketItem } from "../types/market";
import { EyeIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { formatDistanceToNow, differenceInMinutes } from "date-fns";
import { ko } from "date-fns/locale";
interface MarketListItemProps extends MarketItem {
  onClick?: () => void;
}
export default function MarketListItem({
  productId,
  imageUrl,
  title,
  createdAt,
  price,
  viewCount,
  likeCount,
  onClick,
}: MarketListItemProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) return onClick(); // ✅ 부모에서 넘긴 onClick 있으면 실행
    router.push(`/market/${productId}`);
  };

  console.log("createdAt 값:", createdAt, new Date(createdAt));

  return (
    <div onClick={handleClick} className="flex gap-3 border-b  border-gray-200 pb-4">
      {/* 썸네일 */}
      <div className="w-24 h-24 relative flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>

      {/* 정보 */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900 line-clamp-2">{title}</p>
          <p className="text-xs text-gray-500 mt-1">
            {differenceInMinutes(new Date(), new Date(createdAt)) < 1
              ? "방금 전"
              : formatDistanceToNow(new Date(createdAt), {
                  addSuffix: true,
                  locale: ko,
                }).replace("약 ", "")}
          </p>
        </div>
        <div className="mt-1 flex items-center">
          <div className="text-base font-bold text-gray-900">{price}원</div>
          <div className="ml-auto flex items-center gap-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <EyeIcon className="w-4 h-4" />
              {viewCount}
            </span>
            <span className="flex items-center gap-1">
              <BookmarkIcon className="w-4 h-4" />
              {likeCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
