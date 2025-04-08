"use client";

import React from "react";
import CommonTopBar from "@/common/ui/CommonTopBar";
import PetRegister from "../components/PetRegister";

const RegisterPetPage = () => {
  return (
    <>
      <CommonTopBar title="마이펫" leftAction="back" backUrl="/my" />
      <main className="mt-14 px-4 h-full ">
        <PetRegister />
      </main>
    </>
  );
};

export default RegisterPetPage;
