"use client";

import React from "react";
import { SavingAccountInfo } from "./MyAccountType";

interface MySavingProps {
  savingInfo: SavingAccountInfo;
}
const SavingBottom = ({ savingInfo }: MySavingProps) => {
  return (
    <div>
      <div>적금 아래 부분</div>
    </div>
  );
};

export default SavingBottom;
