"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";

export default function Pet() {
  return (
    <>
      <CommonTopBar title="마이펫" leftAction="back" />
      <div className="mt-14">pet</div>
    </>
  );
}
