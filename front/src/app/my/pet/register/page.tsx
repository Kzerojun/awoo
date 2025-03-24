"use client";

import React from "react";
import CommonTopBar from "@/common/ui/CommonTopBar";

const RegisterPetPage = () => {
  return (
    <>
      <CommonTopBar title="반려견 등록" leftAction="back" />
      <div className="mt-14 px-4 h-full">반려견 등록 페이지</div>
    </>
  );
};

export default RegisterPetPage;
