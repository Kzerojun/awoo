"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/home/components/Header";
import { getInternalAccounts } from "@/api/account/open/saving/depositlist";
import { getSavingList } from "@/api/account/open/saving/savingList";
import { getPetDetail } from "@/api/account/open/saving/petDetail";
import { useDispatch } from "react-redux";
import {
  setSelectedSavingId,
  resetSavingAccountDetailSlice,
  changeSelectedSavingAccountNo,
  changeSelectedDepositAccountNo,
} from "@/lib/slices/savingAccountDetailSlice";
import { changeClickedAccount } from "@/lib/slices/savingAccountDetailSlice";
interface SavingAccount {
  savingAccountNo: number;
  accountNo: string;
  depositBalance: number;
  petId: number;
  name: string;
  accountName: string;
}

export default function AccountMinePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [savingAccounts, setSavingAccounts] = useState<SavingAccount[]>([]);

  const [deposit, setDeposit] = useState<any>(null);
  const [petDetails, setPetDetails] = useState<Record<number, any>>({});

  // ✅ 입출금, 적금 계좌 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [depositData, savingData] = await Promise.all([
          getInternalAccounts(),
          getSavingList(),
        ]);
        dispatch(resetSavingAccountDetailSlice());
        setDeposit(depositData);
        setSavingAccounts(savingData);
      } catch (error) {
        console.error("계좌 조회 실패", error);
      }
    };
    fetchData();
  }, []);

  // 내부 계좌 클릭 시
  const goToDepositCheckPassword = () => {
    if (!deposit) {
      alert("예금 계좌 정보를 불러올 수 없습니다.");
      return;
    }
    dispatch(changeClickedAccount("deposit"));
    dispatch(changeSelectedDepositAccountNo(deposit.accountNo));
    router.replace("/account/my/check-password");
  };

  // 계좌이체 클릭 시
  const goToTransferCheckPassword = () => {
    if (!deposit) {
      alert("예금 계좌 정보를 불러올 수 없습니다.");
      return;
    }
    dispatch(changeClickedAccount("transfer"));
    dispatch(changeSelectedDepositAccountNo(deposit.accountNo));
    router.replace("/account/my/check-password");
  };

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

      dispatch(resetSavingAccountDetailSlice());
      dispatch(setSelectedSavingId(savingId));
      dispatch(changeClickedAccount("saving"));
      dispatch(changeSelectedSavingAccountNo(account.accountNo));

      router.replace(`/account/my/check-password`);
    } catch (err) {
      console.error("pet 상세 조회 실패", err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [depositData, savingData] = await Promise.all([
          getInternalAccounts(),
          getSavingList(),
        ]);
        dispatch(resetSavingAccountDetailSlice());
        setDeposit(depositData);
        setSavingAccounts(savingData);

        // 🐶 pet 상세 조회
        const petIds = savingData
          .map((item: SavingAccount) => item.petId)
          .filter((id: any): id is number => id !== null && id !== undefined);

        const petDetailList = await Promise.all(petIds.map((id: any) => getPetDetail(id)));
        const detailMap: Record<number, any> = {};
        petDetailList.forEach((detail, i) => {
          detailMap[petIds[i]] = detail;
        });
        setPetDetails(detailMap);
      } catch (error) {
        console.error("계좌 조회 실패", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />

      <div className="px-4 py-2 flex flex-col gap-2 pt-16">
        {/* ✅ 입출금 계좌 */}
        <div
          className="bg-[#C9F5F1] rounded-xl p-4 shadow cursor-pointer"
          onClick={goToDepositCheckPassword}
        >
          <p className="text-sm ml-3 mt-1">AwOO 입출금계좌</p>
          <p className="text-xl font-semibold mt-1 mb-3 ml-3">
            {deposit?.accountBalance !== undefined
              ? `${Number(deposit.accountBalance).toLocaleString()}원`
              : "로딩중"}
          </p>

          <div className="flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToTransferCheckPassword();
              }}
              className="text-xs text-black bg-[#B3D6D3] px-4 py-1.5 rounded-md"
            >
              이체
            </button>
          </div>
        </div>

        {/* ✅ 적금 계좌 */}
        {savingAccounts.map((item, idx) => {
          const pet = petDetails[item.petId];
          return (
            <div
              key={item.savingAccountNo || idx}
              className="bg-[#9EEBD1] rounded-xl p-4 flex items-center gap-4 cursor-pointer min-h-[100px]"
              onClick={() => handleSavingClick(item)}
            >
              <img
                src={pet?.profileImage || "/images/avatars/basic.jpg"}
                alt="강아지"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm">
                  {pet?.name || "이름없음"}의 {item.accountName} 적금
                </p>

                <p className="text-lg font-semibold">
                  {Number(item.depositBalance || 0).toLocaleString()}원
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
