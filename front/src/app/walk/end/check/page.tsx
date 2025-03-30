"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";

import CheckEnd from "../../components/CheckEnd";

const EndCheckPage = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-8">
      <CheckEnd />
    </div>
  );
};

export default EndCheckPage;
