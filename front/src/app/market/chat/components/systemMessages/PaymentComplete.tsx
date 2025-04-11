// 💸 송금 완료 메시지 - AwOO 스타일 채팅 버블
import { formatTime } from "@/utils/formatTime";
import Image from "next/image";
import logo from "@/../public/logos/AwOO_logo.svg"; // ✅ 너가 쓰는 AwOO 로고 경로에 맞게 수정 필요

interface Props {
  sender: "me" | "partner";
  senderName: string;
  amount: number;
  createdAt: string;
}

export function SystemPaymentComplete({ sender, senderName, amount, createdAt }: Props) {
  const isMe = sender === "me";

  return (
    <div className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
      <div className={`flex ${isMe ? "justify-end" : "justify-start"} w-full`}>
        <div className={`flex items-end gap-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
          {/* ✨ AwOO 스타일 메시지 박스 */}
          <div
            className={`
              bg-[#E3F7F3]
              px-4 py-4
              rounded-2xl
              flex flex-col items-center text-center
              ${isMe ? "rounded-br-none" : "rounded-bl-none"}
            `}
            style={{ maxWidth: "220px" }}
          >
            <Image src={logo} alt="AwOO 로고" width={80} height={24} className="mb-2" />
            <div className="text-[18px] font-semibold text-black">송금완료</div>
            <div className="text-[13px] mt-1 text-gray-600">
              <strong>{amount.toLocaleString()}원</strong>을<br />
              멍페이로 송금했어요
            </div>
          </div>
          <span className="text-[10px] text-gray-400 mb-0.5">{formatTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
