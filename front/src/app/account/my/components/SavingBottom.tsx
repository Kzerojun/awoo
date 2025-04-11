"use client";

import React from "react";
import { SavingAccountInfo } from "./MyAccountType";
import { SavingResponse } from "@/api/account/my/saving";
import SavingList from "./SavingList";

interface MySavingProps {
  savingInfo: SavingAccountInfo;
}

const SavingBottom = ({ savingInfo }: MySavingProps) => {
  return (
    <div className="h-3/5 w-full flex flex-col ">
      <SavingList accountNo={savingInfo.accountNo} />
    </div>
  );
};

export default SavingBottom;
