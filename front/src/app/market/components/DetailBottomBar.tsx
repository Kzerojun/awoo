"use client";

import { BookmarkIcon } from "@heroicons/react/24/outline"; // 찜 안됨
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid"; // 찜 됨

import Button from "@/common/ui/Button";
import MoungpayJoinModal from "@/app/market/components/MoungpayJoinModel";
import { useAppSelector } from "@/lib/store";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DetailBottomBarProps {
  price: string;
  isLiked: boolean;
  onChatClick: () => void;
  onToggleLike: () => void;
}

export default function DetailBottomBar({
  price,
  isLiked,
  onChatClick,
  onToggleLike,
}: DetailBottomBarProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const isPaymentUser = useAppSelector((state) => state.user.paymentRegister);
  // 👉 채팅 버튼 클릭 처리
  const handleChatClick = () => {
    if (!isPaymentUser) {
      setShowModal(true);
      return;
    }
    onChatClick(); // 기존 로직 그대로 실행
  };
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-3 z-50">
      <div className="flex items-center justify-between">
        {/* 💖 찜 + 가격 묶음 */}
        <div className="flex items-center gap-2">
          <button onClick={onToggleLike} className="mr-4 ml-2">
            {isLiked ? (
              <SolidBookmarkIcon className="w-6 h-6 text-gray-600" />
            ) : (
              <BookmarkIcon className="w-6 h-6 text-gray-400" />
            )}
          </button>
          <div className="text-lg font-bold text-gray-900">{price}</div>
        </div>

        {/* 💬 채팅하기 버튼 (공통 컴포넌트 사용) */}
        <Button
          text="채팅하기"
          fontBold="base"
          textSize="small"
          backgroundColor="aqua"
          fontColor="white"
          width="short"
          onClick={handleChatClick}
        />
      </div>

      {/* 💡 모달 컴포넌트 추가 */}
      <MoungpayJoinModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
