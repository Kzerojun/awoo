"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSavingList } from "@/api/account/open/saving/savingList";
import { getPetDetail } from "@/api/account/open/saving/petDetail";
import { useDispatch } from "react-redux";
import {
  changeClickedAccount,
  changeSelectedSavingAccountNo,
  resetSavingAccountDetailSlice,
  setSelectedSavingId,
} from "@/lib/slices/savingAccountDetailSlice";

interface SavingAccount {
  savingAccountNo: number;
  accountNo: string;
  depositBalance: number;
  petId: number;
  accountName: string;
  totalBalance: number;
}

export default function SavingSummaryCard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [savingAccounts, setSavingAccounts] = useState<SavingAccount[]>([]);
  const [petDetails, setPetDetails] = useState<Record<number, any>>({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getSavingList();
        setSavingAccounts(data);

        const petIds = data
          .map((item) => item.petId)
          .filter((id): id is number => id !== null && id !== undefined);

        const petDetailList = await Promise.all(petIds.map((id) => getPetDetail(id)));

        const detailMap: Record<number, any> = {};
        petDetailList.forEach((detail, i) => {
          detailMap[petIds[i]] = detail;
        });
        setPetDetails(detailMap);
      } catch (err) {
        console.error("적금 계좌 조회 실패:", err);
      }
    };
    fetch();
  }, []);

  const handleClick = async (account: SavingAccount) => {
    try {
      const petId = account.petId;
      const petDetail = await getPetDetail(petId);
      const savingId = petDetail?.savingId;
      if (!savingId) {
        alert("savingId가 없습니다.");
        return;
      }

      dispatch(resetSavingAccountDetailSlice());
      dispatch(setSelectedSavingId(savingId));
      dispatch(changeClickedAccount("saving"));
      dispatch(changeSelectedSavingAccountNo(account.accountNo));
      router.push("/account/my/check-password");
    } catch (err) {
      console.error("saving 클릭 실패:", err);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {savingAccounts.map((item: SavingAccount) => {
        const pet = petDetails[item.petId];
        return (
          <div
            key={item.accountNo}
            className="w-full max-w-sm bg-[#FFEBD6] rounded-2xl px-5 py-6 shadow-sm flex items-center gap-5 cursor-pointer"
            onClick={() => handleClick(item)}
          >
            <img
              src={pet?.profileImage || "/images/avatars/basic.jpg"}
              alt="강아지"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col flex-1">
              <p className="text-sm text-black">
                {pet?.name || "이름없음"} {item.accountName} 적금
              </p>
              <p className="text-lg font-bold mt-1">
                {Number(item.totalBalance).toLocaleString()}원
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
