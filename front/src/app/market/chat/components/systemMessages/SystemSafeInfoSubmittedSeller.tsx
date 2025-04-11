import { formatTime } from "@/utils/formatTime";
import Image from "next/image";
import logo from "@/../public/logos/AwOO_logo.svg";

interface Props {
  sender: "me" | "partner";
  createdAt: string;
}

export function SystemSafeInfoSubmittedSeller({ sender, createdAt }: Props) {
  const isMe = sender === "me";
  if (sender === "me") return null; // 판매자만 보게 하기

  return (
    <div className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
      <div className={`flex ${isMe ? "justify-end" : "justify-start"} w-full`}>
        <div className={`flex items-end gap-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
          <div
            className={`bg-[#E3F7F3] px-4 py-4 rounded-2xl flex flex-col items-center text-center ${
              isMe ? "rounded-br-none" : "rounded-bl-none"
            } w-[170px] h-[130px]`}
          >
            <Image src={logo} alt="AwOO 로고" width={80} height={24} className="mb-2" />
            <div className="text-[14px] font-semibold text-black whitespace-nowrap">
              배송 정보 입력 완료
            </div>
            <p className="text-[12px] mt-1 text-gray-600 leading-tight">
              입력이 완료되었습니다.
              <br />
              구매자가 확인할 수 있어요.
            </p>
          </div>
          <span className="text-[10px] text-gray-400 mb-0.5">{formatTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
