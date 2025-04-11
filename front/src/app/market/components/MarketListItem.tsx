"use client";

import Image from "next/image";
import React from "react";
import { MarketItem } from "../types/market";
import { EyeIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface MarketListItemProps extends MarketItem {
  onClick?: () => void;
  status?: "SA" | "RE" | "SO"; // 상태 정보 props로 추가
}

export default function MarketListItem({
  productId,
  imageUrl,
  title,
  price,
  viewCount,
  likeCount,
  createdAt,
  status,
  onClick,
}: MarketListItemProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) return onClick(); // ✅ 부모에서 넘긴 onClick 있으면 실행
    router.push(`/market/${productId}`);
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string): string => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return diffMinutes === 0 ? "방금 전" : `${diffMinutes}분 전`;
      }
      return `${diffHours}시간 전`;
    } else {
      return `${diffDays}일 전`;
    }
  };

  // 상품 상태에 따른 스타일과 텍스트
  const getStatusBadge = () => {
    if (!status) return null;

    let bgColor = "bg-teal-100";
    let textColor = "text-teal-700";
    let statusText = "판매중";

    if (status === "RE") {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-700";
      statusText = "예약중";
    } else if (status === "SO") {
      bgColor = "bg-gray-200";
      textColor = "text-gray-700";
      statusText = "거래완료";
    }

    return (
      <span className={`${bgColor} ${textColor} text-xs px-2 py-0.5 rounded-sm`}>{statusText}</span>
    );
  };

  // 가격 포맷팅 (숫자에 천 단위 콤마 추가)
  const formatPrice = (price: number | string): string => {
    if (typeof price === "string") {
      const numPrice = parseInt(price.replace(/[^0-9]/g, ""));
      return !isNaN(numPrice) ? numPrice.toLocaleString() : price;
    }
    return price.toLocaleString();
  };

  return (
    <div onClick={handleClick} className="border-b pb-4 mb-4 border-gray-200">
      <div className="flex">
        {/* 상품 이미지 */}
        <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>

        {/* 상품 정보 */}
        <div className="ml-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-m line-clamp-2">{title}</h3>
              {getStatusBadge()}
            </div>
            <p className="text-[11px] text-gray-500 mt-1">{formatDate(createdAt)}</p>
          </div>

          <div className="flex flex-col mt-1">
            <div className="flex items-center justify-between w-full">
              <p className="text-lg font-bold">{formatPrice(price)}원</p>

              <div className="flex items-center gap-2 text-xs text-gray-400">
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
      </div>
    </div>
  );
}
