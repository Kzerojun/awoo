"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import TransactionList from "./TransactionList";

const DepositBottom = () => {
  return (
    <div className="h-2/3 w-full flex flex-col items-center justify-center ">
      {/* <div>계좌 조회 아랫부분</div> */}
      <TransactionList />
    </div>
  );
};

export default DepositBottom;
