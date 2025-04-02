"use client";

import React from "react";
import { BackspaceIcon } from "@heroicons/react/24/outline";
interface TransferNumericPadProps {
  onClick: (key: string) => void;
}

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "delete"];

const TransferNumericPad = ({ onClick }: TransferNumericPadProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 auto-rows-[60px] w-full max-w-xs mx-auto mt-4">
      {keys.map((key, idx) => (
        <button
          key={idx}
          onClick={() => onClick(key)}
          className="w-full h-10 flex items-center justify-center text-xl text-gray-700 font-bold"
        >
          {key === "delete" ? <BackspaceIcon className="w-8 h-8 text-gray-700" /> : key}
        </button>
      ))}
    </div>
  );
};

export default TransferNumericPad;
