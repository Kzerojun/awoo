"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import DepositManageTop from "../../components/DepositManageTop";
import DepositManageBottom from "../../components/DepositManageBottom";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import ChangeDepositLimit from "../../components/ChangDepositLimit";
import DeleteDeposit from "../../components/DeleteDeposit";

const ManageDepositPage = () => {
  // 계좌 관리 view. 1 -> 메인 뷰, 2 -> 이체 한도 변경, 3 -> 계좌 해지
  const currentDepositCurrentView = useAppSelector(
    (staet) => staet.userAction.currnetManageDepositView
  );

  return (
    <>
      {currentDepositCurrentView === 1 && (
        <div>
          <CommonTopBar title="계좌 관리" />
          <main className="mt-14 w-full h-full flex flex-col justify-center items-center ">
            <DepositManageTop />
            <DepositManageBottom />
          </main>
        </div>
      )}
      {currentDepositCurrentView === 2 && (
        <div className="w-full h-[calc(100%-3.5rem)]">
          <CommonTopBar
            title="이체 한도 조회 및 변경"
            leftAction="depositManageBack"
            currentDepositCurrentView={currentDepositCurrentView}
          />
          <main className="mt-14 w-full h-full flex flex-col justify-center items-center ">
            <ChangeDepositLimit />
          </main>
        </div>
      )}
      {currentDepositCurrentView === 3 && (
        <div className="w-full h-[calc(100%-3.5rem)]">
          <CommonTopBar
            title="계좌 해지"
            leftAction="depositManageBack"
            currentDepositCurrentView={currentDepositCurrentView}
          />
          <main className="mt-14 w-full h-full flex flex-col justify-center items-center ">
            <DeleteDeposit />
          </main>
        </div>
      )}
    </>
  );
};

export default ManageDepositPage;
