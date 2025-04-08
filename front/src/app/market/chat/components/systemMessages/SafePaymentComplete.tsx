import { formatTime } from "@/utils/formatTime";
import Image from "next/image";
import logo from "@/../public/logos/AwOO_logo.svg";

interface Props {
  sender: "me" | "partner";
  createdAt: string;
}

export function SystemSafePaymentCompleteMe({ sender, createdAt }: Props) {
  const isMe = sender === "me";

  return (
    <div className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
      <div className={`flex ${isMe ? "justify-end" : "justify-start"} w-full`}>
        <div className={`flex items-end gap-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
          {/* ✅ 고정 너비 + 높이 적용 */}
          <div
            className={`
              bg-[#E3F7F3]
              px-4 py-4
              rounded-2xl
              flex flex-col items-center text-center
              ${isMe ? "rounded-br-none" : "rounded-bl-none"}
              w-[180px] h-[110px]
            `}
          >
            <Image src={logo} alt="AwOO 로고" width={80} height={24} className="mb-2" />
            <div className="text-[18px] font-semibold text-black whitespace-nowrap">
              안심거래 송금완료
            </div>
            <div className="text-[12px] mt-2 text-gray-600 leading-tight">
              판매자 배송지입력 대기중
            </div>
          </div>
          <span className="text-[10px] text-gray-400 mb-0.5">{formatTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
