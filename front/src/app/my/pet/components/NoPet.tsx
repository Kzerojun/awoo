"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import awooLogo from "../../../../../public/logos/AwOO_logo.svg";
import dogLogo from "../../../../../public/logos/dog_logo.svg";
import Button from "@/common/ui/Button";

import SittingDog from "./SittingDog";

const NoPet = () => {
  const router = useRouter();

  const goToRegisterPet = () => {
    router.push("/my/pet/register");
  };

  return (
    <div className="h-full flex flex-col items-center justify-start">
      <div className="text-2xl mt-32">반려견을 먼저 등록해주세요!</div>
      <div className="flex flex-col items-center justify-center mt-10">
        <Image src={awooLogo} alt="awoo 로고" priority />

        <SittingDog />
      </div>

      <div className="">
        <Button
          text="반려견 등록하기"
          width="medium"
          backgroundColor="light-green"
          onClick={goToRegisterPet}
        />
      </div>
    </div>
  );
};

export default NoPet;
