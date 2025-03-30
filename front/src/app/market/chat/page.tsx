"use client";

import { useState } from "react";
import ChatRoomHeader from "./components/ChatRoomHeader";
import ChatMessageBubble from "././components/ChatMessagaBubble";
import ChatInputBox from "./components/ChatInputBox";
import PaymentSelectModal from "././components/PaymentSelectModal";
const dummyMessages = [
  { id: "1", sender: "me", content: "안녕하세요!", time: "오후 4:40" },
  { id: "2", sender: "me", content: "ㅎㅎ", time: "오후 4:40" },
  {
    id: "3",
    sender: "me",
    content: "아이랑 잘 맞을 것 같아서 구매하고 싶어요!",
    time: "오후 4:41",
  },
  { id: "4", sender: "partner", content: "네! 안녕하세요", time: "오후 5:41" },
] as const;

export default function ChatRoom() {
  const [showActions, setShowActions] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-50 relative">
      {/* 상단 상품 */}
      <ChatRoomHeader />

      {/* 채팅 내용 */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {dummyMessages.map((msg) => (
          <ChatMessageBubble key={msg.id} {...msg} />
        ))}
      </div>

      {/* 입력창 */}
      <ChatInputBox onToggleActions={() => setShowActions((prev) => !prev)} />

      {/* 액션 박스 */}
      {showActions && (
        <div className="w-full bg-white py-4 flex justify-around border-t">
          {[
            { label: "앨범", icon: "🖼️" },
            { label: "카메라", icon: "📷" },
            { label: "송금", icon: "💸" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center space-y-1 cursor-pointer"
              onClick={() => {
                if (item.label === "송금") {
                  setShowPaymentModal(true);
                  setShowActions(false);
                }
              }}
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                {item.icon}
              </div>
              <span className="text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* 송금 선택 모달 */}
      <PaymentSelectModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} />
    </div>
  );
}
