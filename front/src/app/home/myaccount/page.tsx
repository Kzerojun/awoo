"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/home/components/Header";
import { getInternalAccounts } from "@/api/account/open/saving/depositlist";
import { getSavingList } from "@/api/account/open/saving/savingList";
import { getPetDetail } from "@/api/account/open/saving/petDetail";
import { useDispatch } from "react-redux";
import { setSelectedSavingId, resetSelectedSavingId } from "@/lib/slices/savingAccountDetailSlice";

export default function AccountMinePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [deposit, setDeposit] = useState<any>(null);
  const [savingAccounts, setSavingAccounts] = useState<any[]>([]);

  // ✅ 입출금, 적금 계좌 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [depositData, savingData] = await Promise.all([
          getInternalAccounts(),
          getSavingList(),
        ]);
        setDeposit(depositData);
        setSavingAccounts(savingData);
      } catch (error) {
        console.error("계좌 조회 실패", error);
      }
    };
    fetchData();
  }, []);

  // ✅ 적금 클릭 시 petDetail 통해 savingId 저장
  const handleSavingClick = async (account: any) => {
    try {
      const petId = account.petId;
      if (!petId) return alert("petId가 없습니다");

      const petDetail = await getPetDetail(petId);
      const savingId = petDetail?.savingId;
      if (savingId === null || savingId === undefined) {
        return alert("savingId가 없습니다");
      }

      dispatch(resetSelectedSavingId());
      dispatch(setSelectedSavingId(savingId));

      router.push(`/account/my/saving`);
    } catch (err) {
      console.error("pet 상세 조회 실패", err);
    }
  };

  return (
    <div>
      <Header />

      <div className="px-4 py-2 flex flex-col gap-2 pt-16">
        {/* ✅ 입출금 계좌 */}
        <div
          className="bg-[#C9F5F1] rounded-xl p-4 shadow cursor-pointer"
          onClick={() => router.push("/account/my/deposit")}
        >
          <p className="text-sm ml-3 mt-1">AwOO 입출금계좌</p>
          <p className="text-xl font-semibold mt-1 mb-3 ml-3">
            {deposit?.accountBalance !== undefined
              ? `${deposit.accountBalance.toLocaleString()}원`
              : "로딩중"}
          </p>

          <div className="flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push("/##"); // TODO: 이체 페이지로 변경
              }}
              className="text-xs text-black bg-[#B3D6D3] px-4 py-1.5 rounded-md"
            >
              이체
            </button>
          </div>
        </div>

        {/* ✅ 적금 계좌 */}
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
