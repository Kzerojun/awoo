"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import CommonTopBar from "@/common/ui/CommonTopBar";
import checkmark from "../../../../../public/icons/mypage/checkmark.svg";

export default function CommonPayDone() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState<number>(0);

  // URL에서 금액 정보 가져오기
  useEffect(() => {
    const amountParam = searchParams.get("amount");
    if (amountParam) {
      setAmount(parseInt(amountParam, 10));
    }
  }, [searchParams]);

  // 홈으로 이동
  const handleGoToHome = () => {
    router.push("/market");
  };

  return (
    <div className="flex flex-col inset-0 bg-white">
      <CommonTopBar title="결제 완료" />

      <div className="flex-1 flex flex-col items-center px-6 py-8">
        {/* 체크 아이콘 */}
        <div className="mb-6 mt-12">
          <div className="p-4 bg-teal-50 rounded-full">
            <Image src={checkmark} alt="체크마크" width={100} height={100} />
          </div>
        </div>

        {/* 메인 메시지 */}
        <h1 className="text-xl font-bold text-center mb-4">일반결제가 완료되었습니다</h1>

        {/* 금액 정보 */}
        <div className="text-3xl font-bold text-teal-500 mb-10">{amount.toLocaleString()}원</div>

        {/* 설명 카드 */}
        <div className="w-full bg-teal-50 rounded-xl p-6 mb-2">
          {/* 첫 번째 항목 */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 flex items-center justify-center bg-teal-500 text-white rounded-full mr-3 flex-shrink-0 flex-none">
                <span className="text-sm font-bold leading-none">1</span>
              </div>
              <h3 className="text-md font-medium">결제 완료</h3>
            </div>
            <div>
              <p className="text-gray-700 text-[13px]">
                결제하신 금액이 판매자에게 전달되었습니다.
                <br />
                판매자와 협의하여 물품을 수령하세요.
              </p>
            </div>
          </div>

          {/* 두 번째 항목 */}
          <div>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 flex items-center justify-center bg-teal-500 text-white rounded-full mr-3 flex-shrink-0 flex-none">
                <span className="text-sm font-bold leading-none">2</span>
              </div>
              <h3 className="text-md font-medium">거래 시 유의사항</h3>
            </div>
            <div>
              <p className="text-gray-700 text-[13px]">
                일반 결제는 직접 거래 방식입니다. 물품을 확인한 후 거래를 진행하세요.
                <br />
                필요시 거래 내역은 마이페이지에서 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="p-4 border-gray-200">
        <button
          onClick={handleGoToHome}
          className="w-full py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
        >
          중고거래 홈으로
        </button>
      </div>
    </div>
  );
}
