"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/home/components/Header";
import { getInternalAccounts } from "@/api/account/open/saving/depositlist";
import { getSavingList } from "@/api/account/open/saving/savingList";
import { getPetList } from "@/api/pet/pet";
import { useDispatch } from "react-redux";
import {
  setSelectedSavingAccountNo,
  resetSelectedSavingAccountNo,
} from "@/lib/slices/savingAccountDetailSlice";

export default function AccountMinePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [deposit, setDeposit] = useState<any>(null);
  const [savingAccounts, setSavingAccounts] = useState<any[]>([]);
  const [pets, setPets] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const depositData = await getInternalAccounts();
        const savingData = await getSavingList();
        const petData = await getPetList();
        console.log(depositData);
        console.log(savingData);
        console.log(petData);
        setDeposit(depositData);
        setSavingAccounts(savingData);
        setPets(petData ?? []);
      } catch (error) {
        console.error("계좌 조회 실패", error);
      }
    };
    fetchData();
  }, []);
  const handleSavingClick = (account: any) => {
    dispatch(resetSelectedSavingAccountNo());
    dispatch(setSelectedSavingAccountNo(account.accountNo));
    router.push(`"/##"`); // 적금 상세로 이동 - 라우터 추가하기
  };
  return (
    <div>
      <Header />

      <div className="px-4 py-2 flex flex-col gap-2 pt-16">
        {/* 입출금 계좌 */}
        <div
          className="bg-[#C9F5F1] rounded-xl p-4 shadow"
          onClick={() => router.push("/##")} // 입출금 상세로 이동 - 라우터 추가하기
        >
          <p className="text-sm ml-3 mt-1">AwOO 입출금계좌</p>
          <p className="text-xl font-semibold mt-1 mb-3 ml-3">
            {deposit && deposit.accountBalance
              ? `${deposit.accountBalance.toLocaleString()}원`
              : "로딩중"}
          </p>

          <div className="flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push("/##");
              }} // 이체 연결 예정
              className="text-xs text-black bg-[#B3D6D3] px-4 py-1.5 rounded-md"
            >
              이체
            </button>
          </div>
        </div>

        {/* 적금 계좌 */}
        {savingAccounts.map((item, idx) => (
          <div
            key={item.savingAccountNo || idx}
            className="bg-[#9EEBD1] rounded-xl p-4 flex items-center gap-4 cursor-pointer min-h-[100px]"
            onClick={() => handleSavingClick(item)}
          >
            <img
              src={item.imageUrl || "/images/avatars/basic.jpg"}
              alt="강아지"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-sm">
                {item.dogName}의 {item.name}
              </p>
              <p className="text-lg font-semibold">
                {item.depositBalance ? `${item.depositBalance.toLocaleString()}원` : "0원"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
