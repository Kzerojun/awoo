"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import React from "react";
import CheckPassword from "../../components/CheckPassword";
const CheckPasswordPage = () => {
  const handleCheck = () => {};

  return (
    <div>
      <CommonTopBar title="비밀번호 확인" />
      <main className="mt-14 ">
        <div>비밀번호 확인 페이지</div>
        <CheckPassword onConfirm={handleCheck} />
      </main>
    </div>
  );
};

export default CheckPasswordPage;
