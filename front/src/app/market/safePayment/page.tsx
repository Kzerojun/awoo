"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import SafePaymentProcess from "./components/SafePaymentProcess";
import { useSearchParams } from "next/navigation";

export default function SafePayment() {
  const searchParams = useSearchParams();
  const chatRoomId = searchParams.get("chatRoomId");
  const usedProductId = searchParams.get("usedProductId");
  const backUrl = `/market/chat/${chatRoomId}?usedProductId=${usedProductId}`;

  return (
    <div className="flex flex-col inset-0 bg-white my-14">
      {/* 안심결제 출입 이후 다시 채팅으로 돌아갈때 중고물품 정보를 알고 가기 위함 */}
      <CommonTopBar title="안심 결제" leftAction="back" backUrl={backUrl} />
      <SafePaymentProcess />
    </div>
  );
}
