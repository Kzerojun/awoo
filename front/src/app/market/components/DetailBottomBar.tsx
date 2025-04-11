"use client";

import { BookmarkIcon } from "@heroicons/react/24/outline"; // 찜 안됨
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid"; // 찜 됨

import Button from "@/common/ui/Button";
import MoungpayJoinModal from "@/app/market/components/MoungpayJoinModel";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/api/user/auth";

interface DetailBottomBarProps {
  price: string;
  isLiked: boolean;
  onChatClick?: () => void;
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

  // 👉 채팅 버튼 클릭 처리
  const handleChatClick = async () => {
    try {
      const userInfo = await getUserInfo();
      if (!userInfo.paymentRegister) {
        setShowModal(true);
        return;
      }
      onChatClick?.();
    } catch (err) {
      console.error("멍페이 가입 여부 확인 실패:", err);
      alert("사용자 정보를 확인할 수 없습니다.");
    }
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
        {onChatClick ? (
          <Button
            text="채팅하기"
            fontBold="base"
            textSize="small"
            backgroundColor="aqua"
            fontColor="white"
            width="short"
            onClick={handleChatClick}
          />
        ) : (
          // ❗️빈 공간으로 자리 유지
          <div className="w-[88px] h-[40px]" /> // Button의 사이즈와 맞추기
        )}
      </div>

      {/* 💡 모달 컴포넌트 추가 */}
      <MoungpayJoinModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
