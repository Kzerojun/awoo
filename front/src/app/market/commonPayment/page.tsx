"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import CommonPaymentProcess from "./components/CommonPaymentProcess";
import { useSearchParams } from "next/navigation";

export default function CommonPayment() {
  const searchParams = useSearchParams();
  const chatRoomId = searchParams.get("chatRoomId");
  const usedProductId = searchParams.get("usedProductId");
  const backUrl = `/market/chat/${chatRoomId}?usedProductId=${usedProductId}`;

  return (
    <div className="flex flex-col inset-0 bg-white my-14">
      <CommonTopBar title="일반 결제" leftAction="back" backUrl={backUrl} />
      <CommonPaymentProcess chatRoomId={chatRoomId} usedProductId={usedProductId} />
    </div>
  );
}
