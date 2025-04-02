"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import React, { useEffect, useState } from "react";
import CheckPassword from "../components/CheckPassword";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store";
import WalkingLoading from "@/app/walk/components/WalkingLoading";

const CheckPasswordPage = () => {
  const router = useRouter();
  const status = useAppSelector((state) => state.savingAccountDetail.clickedAccount);
  const depositAccountNo = useAppSelector(
    (state) => state.savingAccountDetail.selectedDepositAccountNo
  );
  const savingAccountNo = useAppSelector(
    (state) => state.savingAccountDetail.selectedSavingAccountNo
  );
  const [accountNo, setAccountNo] = useState<string | null>(null);

  useEffect(() => {
    if (status === "deposit" || status === "transfer") {
      if (depositAccountNo) {
        setAccountNo(depositAccountNo);
        console.log("내부 계좌 번호");
      }
    } else if (status === "saving") {
      if (savingAccountNo) {
        setAccountNo(savingAccountNo);
        console.log("적금 계좌 번호");
      }
    }
  }, [status]);

  const handleCheck = () => {
    if (status === "deposit") {
      router.replace("/account/my/deposit");
    } else if (status === "transfer") {
      router.replace("/account/my/deposit/transfer");
    } else if (status === "saving") {
      router.replace("/account/my/saving");
    }
  };

  if (!accountNo) {
    return <WalkingLoading />;
  }

  return (
    <div>
      <CommonTopBar title="비밀번호 확인" />
      <main className="mt-14 ">
        <CheckPassword onConfirm={handleCheck} accountNo={accountNo} />
      </main>
    </div>
  );
};

export default CheckPasswordPage;
