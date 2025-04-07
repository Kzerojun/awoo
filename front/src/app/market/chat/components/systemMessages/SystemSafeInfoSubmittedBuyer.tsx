"use client";

import { formatTime } from "@/utils/formatTime";
import Image from "next/image";
import logo from "@/../public/logos/AwOO_logo.svg";
import { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useSearchParams } from "next/navigation";
import { chatSocket } from "@/socket/chatSocket"; // 소켓 임포트
import { useAppSelector } from "@/lib/store";
interface Props {
  sender: "me" | "partner";
  createdAt: string;
}

export function SystemSafeInfoSubmittedBuyer({ sender, createdAt }: Props) {
  const isMe = sender === "me";
  const searchParams = useSearchParams();
  const usedProductId = searchParams.get("usedProductId");

  // 상태 변수
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const memberId = useAppSelector((state) => state.memberId.memberId);

  // 상품 상태 조회 함수
  const fetchProductStatus = async (productId: string) => {
    try {
      const res = await axiosInstance.get(`/used-products/${productId}`);
      if (res.data.response.usedProductStatus === "SO") {
        setConfirmed(true);
      }
    } catch (error) {
      console.error("상세 조회 실패:", error);
    }
  };

  // 구매 확정 처리 함수
  const handleConfirmPurchase = async () => {
    if (!usedProductId) return;

    setIsConfirming(true);
    try {
      await axiosInstance.post(`/used-products/${usedProductId}/status`, {
        status: "SO",
        type: "SAFE",
      });
      setConfirmed(true);

      // 소켓을 통해 "SAFE_FINISH" 메시지 전송
      const token = localStorage.getItem("accessToken");
      const chatRoomId = searchParams.get("chatRoomId"); // chatRoomId 가져오기
      if (token && chatRoomId) {
        chatSocket.connect(token, Number(chatRoomId), () => {});
        setTimeout(() => {
          // 상대방에게 "SAFE_FINISH" 메시지 전송
          chatSocket.send(Number(chatRoomId), "SAFE_COMPLETE", memberId); // ✅ 구매 확정 메시지
        }, 300);
      }
    } catch (error) {
      console.error("구매 확정 실패:", error);
      alert("구매 확정 중 오류가 발생했습니다.");
    } finally {
      setIsConfirming(false);
    }
  };

  // useEffect로 상품 상태 조회
  useEffect(() => {
    if (usedProductId) {
      fetchProductStatus(usedProductId);
    }
  }, [usedProductId]);

  return (
    <div className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
      <div className={`flex ${isMe ? "justify-end" : "justify-start"} w-full`}>
        <div className={`flex items-end gap-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
          <div
            className={`bg-[#E3F7F3] px-4 py-4 rounded-2xl flex flex-col items-center text-center ${
              isMe ? "rounded-br-none" : "rounded-bl-none"
            } w-[170px] h-[160px]`}
          >
            <Image src={logo} alt="AwOO 로고" width={80} height={24} className="mb-2" />
            <div className="text-[14px] font-semibold text-black whitespace-nowrap">
              배송 정보 확인 완료
            </div>
            <p className="text-[12px] mt-1 text-gray-600 leading-tight">
              배송이 완료되면
              <br />
              구매 확정을 진행해주세요.
            </p>
            {!confirmed ? (
              <button
                onClick={handleConfirmPurchase}
                disabled={isConfirming}
                className="mt-2 text-[12px] bg-white text-teal-700 border border-teal-400 px-3 py-1 rounded hover:bg-teal-50 transition"
              >
                {isConfirming ? "확인 중..." : "구매 확정"}
              </button>
            ) : (
              <span className="text-[12px] text-green-600 mt-2">구매 확정 완료 🎉</span>
            )}
          </div>
          <span className="text-[10px] text-gray-400 mb-0.5">{formatTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
