"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import SafePaymentProcess from "./components/SafePaymentProcess";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/store";
import { setPaymentMethod, setChatStatus } from "@/lib/slices/chatSystemSlice";
import { useEffect } from "react";

export default function SafePayment() {
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const chatRoomId = searchParams.get("chatRoomId");
  const usedProductId = searchParams.get("usedProductId");
  const backUrl = `/market/chat/${chatRoomId}?usedProductId=${usedProductId}`;
  useEffect(() => {
    dispatch(setPaymentMethod("SAFE")); // SAFE 결제 방식
    dispatch(setChatStatus("STARTED")); // 결제 시작 상태
  }, []);

  return (
    <div className="flex flex-col inset-0 bg-white my-14">
      {/* 안심결제 출입 이후 다시 채팅으로 돌아갈때 중고물품 정보를 알고 가기 위함 */}
      <CommonTopBar title="안심 결제" leftAction="back" backUrl={backUrl} />
      <SafePaymentProcess chatRoomId={chatRoomId} usedProductId={usedProductId} />
    </div>
  );
}
