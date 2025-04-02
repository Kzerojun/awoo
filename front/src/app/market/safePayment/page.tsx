"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import SafePaymentProcess from "./components/SafePaymentProcess";

export default function SafePayment() {
  return (
    <div className="flex flex-col inset-0 bg-white my-14">
      <CommonTopBar title="안심 결제" />
      <SafePaymentProcess />
    </div>
  );
}
