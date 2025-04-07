import logo from "@/../public/logos/AwOO_logo.svg";
import Image from "next/image";
import { formatTime } from "@/utils/formatTime";

interface SystemSafeCompleteSellerProps {
  sender: "me" | "partner";
  createdAt: string;
}

export function SystemSafeCompleteSeller({ createdAt }: SystemSafeCompleteSellerProps) {
  return (
    <div className="flex flex-col gap-1 items-start">
      <div className="flex justify-start w-full">
        <div className="flex items-end gap-1 flex-row">
          <div className="bg-[#FFF5E1] px-4 py-4 rounded-2xl text-center rounded-bl-none w-[200px] h-[160px] flex flex-col items-center">
            <Image src={logo} alt="AwOO 로고" width={80} height={24} className="mb-2" />
            <div className="text-[14px] font-semibold text-black whitespace-nowrap">
              구매 확정 완료 🎉
            </div>
            <p className="text-[12px] mt-1 text-gray-600 leading-tight">
              판매 금액이 송금 완료되었어요.
              <br />
              멍페이에서 확인해보세요!
            </p>
          </div>
          <span className="text-[10px] text-gray-400 mb-0.5">{formatTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
