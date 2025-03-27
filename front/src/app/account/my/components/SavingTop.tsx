"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SavingAccountInfo } from "./MyAccountType";

interface MySavingProps {
  savingInfo: SavingAccountInfo;
}
const SavingTop = (savingInfo: MySavingProps) => {
  const router = useRouter();

  return (
    <div>
      <div>적금 탑 부분</div>
    </div>
  );
};

export default SavingTop;
