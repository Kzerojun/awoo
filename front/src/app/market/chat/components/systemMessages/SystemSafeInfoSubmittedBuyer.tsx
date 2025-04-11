"use client";

import { formatTime } from "@/utils/formatTime";
import Image from "next/image";
import logo from "@/../public/logos/AwOO_logo.svg";
import { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useSearchParams, useParams } from "next/navigation";
import { chatSocket } from "@/socket/chatSocket";
import { useAppSelector } from "@/lib/store";

interface Props {
  sender: "me" | "partner";
  createdAt: string;
}

export function SystemSafeInfoSubmittedBuyer({ sender, createdAt }: Props) {
  const isMe = sender === "me";
  const searchParams = useSearchParams();
  const { chatRoomId } = useParams() as { chatRoomId: string };
  const usedProductId = searchParams.get("usedProductId");
  const memberId = useAppSelector((state) => state.memberId.memberId);

  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [readyToSendMessage, setReadyToSendMessage] = useState(false);

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

  const handleConfirmPurchase = async () => {
    if (!usedProductId) return;

    setIsConfirming(true);
    try {
      await axiosInstance.post(`/used-products/${usedProductId}/status`, {
        status: "SO",
        type: "SAFE",
      });
      setConfirmed(true);
      setReadyToSendMessage(true); // 메시지 전송 준비 완료
    } catch (error) {
      console.error("구매 확정 실패:", error);
      alert("구매 확정 중 오류가 발생했습니다.");
    } finally {
      setIsConfirming(false);
    }
  };
  const handleSendMessage = () => {
    const message = "SAFE_COMPLETE";
    chatSocket.send(Number(chatRoomId), message, memberId);

    setReadyToSendMessage(false); // 메시지 전송 후 버튼 제거
  };

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
            {!confirmed && (
              <button
                onClick={handleConfirmPurchase}
                disabled={isConfirming}
                className="mt-2 text-[12px] bg-white text-teal-700 border border-teal-400 px-3 py-1 rounded hover:bg-teal-50 transition"
              >
                {isConfirming ? "확인 중..." : "구매 확정"}
              </button>
            )}
            {readyToSendMessage && (
              <button
                onClick={handleSendMessage}
                className="mt-2 text-[12px] bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 transition"
              >
                확인
              </button>
            )}
            {confirmed && !readyToSendMessage && (
              <span className="text-[12px] text-green-600 mt-2">구매 확정 완료 🎉</span>
            )}
          </div>
          <span className="text-[10px] text-gray-400 mb-0.5">{formatTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
