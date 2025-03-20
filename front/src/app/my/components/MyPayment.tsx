"use client";
import vector from "../../../../public/icons/mypage/vector.svg";
import Image from "next/image";

export default function MyPayment() {
  return (
    <div className="flex items-center w-full">
      <div className="flex-1">
        <div className="flex flex-col w-full">
          <div className="flex">
            <span className="text-teal-400 text-sm ml-6">멍 Pay</span>
            <span className="ml-1 text-sm">와 함께하는</span>
          </div>
          <div className="flex justify-end">
            <span className="text-teal-400 text-sm">안전 거래</span>
            <span className="ml-1 text-sm mr-4">시작하기</span>
          </div>
        </div>
      </div>
      <div className="ml-4 text-gray-400">
        <Image src={vector} alt="화살표" />
      </div>
    </div>
  );
}
