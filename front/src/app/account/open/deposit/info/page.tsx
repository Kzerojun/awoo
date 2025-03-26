"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";

export default function DepositInfoPage() {
  return (
    <div>
      {/* 공통 상단바 */}
      <CommonTopBar title="입출금 통장 개설" leftAction="back" rightAction="cancel" />
    </div>
  );
}
