"use client";

import { useState } from "react";
import { formatTime } from "@/utils/formatTime";
import Image from "next/image";
import logo from "@/../public/logos/AwOO_logo.svg";
import SafePaymentModal from "../modal/SafePaymentModal"; // 모달 import
import { useParams } from "next/navigation";
import { chatSocket } from "@/socket/chatSocket";
import { useAppSelector } from "@/lib/store";

interface Props {
  sender: "me" | "partner";
  createdAt: string;
}

export function SystemSafePaymentStart({ sender, createdAt }: Props) {
  const isMe = sender === "me";
  const [openModal, setOpenModal] = useState(false);
  const { chatRoomId } = useParams() as { chatRoomId: string };
  const memberId = useAppSelector((state) => state.memberId.memberId);

  const handleSubmitTracking = (trackingNumber: string) => {
    console.log("📦 운송장 번호 전송됨:", trackingNumber);
    const message = "SAFE_INFO_SUBMITTED";

    // 소켓 메시지 전송
    chatSocket.send(Number(chatRoomId), message, Number(memberId));
  };

  return (
    <>
      <div className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
        <div className={`flex ${isMe ? "justify-end" : "justify-start"} w-full`}>
          <div className={`flex items-end gap-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
            <div
              className={`
                bg-[#E3F7F3]
                px-4 py-4
                rounded-2xl
                flex flex-col items-center text-center
                ${isMe ? "rounded-br-none" : "rounded-bl-none"}
                w-[170px] h-[130px]
              `}
            >
              <Image src={logo} alt="AwOO 로고" width={80} height={24} className="mb-2" />
              <div className="text-[16px] font-semibold text-black whitespace-nowrap">
                안심결제 정보입력
              </div>
              <button
                onClick={() => setOpenModal(true)}
                className="bg-gray-100 mt-3 text-gray-800 text-sm border border-gray-300 px-4 py-1 rounded-md"
              >
                제출하기
              </button>
            </div>
            <span className="text-[10px] text-gray-400 mb-0.5">{formatTime(createdAt)}</span>
          </div>
        </div>
      </div>

      {/* 🚀 모달 */}
      <SafePaymentModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitTracking}
      />
    </>
  );
}
