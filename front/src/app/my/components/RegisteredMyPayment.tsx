"use client";

import { useRouter } from "next/navigation";

export default function RegisteredMyPayment() {
  const router = useRouter();

  const handleChargeClick = () => {
    router.push("/my/paymentCharge");
  };

  const handleSendClick = () => {
    router.push("/my/paymentSend");
  };

  return (
    <div className="px-1 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-teal-500 mr-1 font-bold text-[16px]">멍Pay</span>
          <span className="ml-2 font-bold text-[15px]">
            3,000,000 <span className="font-light">원</span>
          </span>
        </div>
        <div className="flex mr-1">
          <button onClick={handleSendClick} className="text-gray-400 mr-2 text-sm">
            송금
          </button>
          <span className="text-gray-300">|</span>
          <button onClick={handleChargeClick} className="text-gray-400 ml-2 text-sm">
            충전
          </button>
        </div>
      </div>
    </div>
  );
}
