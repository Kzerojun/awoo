"use client";

import React from "react";

import TransactionList from "./TransactionList";
import { DepositResponse } from "@/api/account/my/deposit";

interface Props {
  deposit: DepositResponse;
}

const DepositBottom = ({ deposit }: Props) => {
  return (
    <div className="flex-1 w-full flex flex-col ">
      {/* <div>계좌 조회 아랫부분</div> */}
      <TransactionList />
    </div>
  );
};

export default DepositBottom;
