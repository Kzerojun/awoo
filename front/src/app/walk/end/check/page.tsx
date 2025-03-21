"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import paw from "../../../../../public/icons/white_paw.svg";

import CheckEnd from "../../components/CheckEnd";
import Button from "@/common/ui/Button";

const EndCheckPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const goToHome = () => {
    setTimeout(() => {
      router.push("/home");
    }, 500);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-8">
      <CheckEnd />
      <Button text="홈으로" onClick={goToHome} backgroundColor="green" img={paw} />
    </div>
  );
};

export default EndCheckPage;
