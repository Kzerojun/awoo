"use client";
import { useState } from "react";
import AgreementSection from "./components/AgreementSection";
import CommonTopBar from "@/common/ui/CommonTopBar";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/common/ui/Button";
const AgreementPage = () => {
  const router = useRouter();

  const agreementItems = [
    "입출금거래기본약관",
    "자유입출금 약관",
    "자동이체(송금) 약관",
    "AwOO은행 입출금 특약",
    "비과세종합저축 특약",
    "중요사항 설명 안내",
    "불이익사항 안내",
    "금융소비자 권리사항 안내",
  ];
  const [checkedList, setCheckedList] = useState<boolean[]>(
    Array(agreementItems.length + 1).fill(false) // 상품설명서 포함
  );
  const [showWarning, setShowWarning] = useState(false);

  const toggleCheck = (index: number) => {
    const updated = [...checkedList];
    updated[index] = !updated[index];
    setCheckedList(updated);
    setShowWarning(false);
  };
  const toggleSection = (indexes: number[]) => {
    const updated = [...checkedList];
    const allChecked = indexes.every((i) => checkedList[i]);

    indexes.forEach((i) => {
      updated[i] = !allChecked; // 모두 체크돼 있으면 전체 해제, 아니면 전체 체크
    });

    setCheckedList(updated);
    setShowWarning(false);
  };

  const handleNextClick = () => {
    const allChecked = checkedList.every(Boolean);
    if (!allChecked) {
      setShowWarning(true);
      return;
    }
    router.push("/account/open/deposit/info");
  };

  return (
    <div className="pt-14 px-4 pb-10 max-w-md mx-auto bg-white min-h-screen">
      {/* 상단 공통 탑바 */}
      <CommonTopBar
        title="입출금 상품 동의"
        leftAction="back"
        rightAction="cancel"
        onClose={() => router.push("/account/open/deposit")}
      />
      {/* 상품 설명서 */}
      <div className="border p-4 mb-1.5">
        <button onClick={() => toggleCheck(0)} className="flex items-center space-x-2">
          {checkedList[0] ? (
            <CheckCircleIcon className="w-7 h-7 text-aqua" />
          ) : (
            <CheckCircleIcon className="w-7 h-7 text-gray-300 " />
          )}
          <span>AwOO뱅크 입출금 상품 설명서</span>
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-6 ml-2">상품설명서의 내용을 반드시 확인해주세요.</p>

      {/* 이용약관: index 1~5 */}
      <AgreementSection
        title="상품 이용약관"
        items={agreementItems.slice(0, 5)}
        startIndex={1}
        checkedList={checkedList}
        toggleCheck={toggleCheck}
        toggleSection={toggleSection}
      />

      {/* 안내사항: index 6~8 */}
      <AgreementSection
        title="금융상품 가입 전 안내"
        items={agreementItems.slice(5)}
        startIndex={6}
        checkedList={checkedList}
        toggleCheck={toggleCheck}
        toggleSection={toggleSection}
      />
      {showWarning && (
        <p className="text-red-500 text-sm text-center mt-4">
          상품 가입을 위해서 동의가 필요합니다.
        </p>
      )}
      <Button
        text="다음"
        width="long"
        textSize="medium"
        fontBold="base"
        className={`w-full mt-6 py-3 text-center ${
          checkedList.every(Boolean)
            ? "bg-aqua text-white"
            : "bg-gray-300 text-white cursor-not-allowed"
        }`}
        onClick={handleNextClick}
      />
    </div>
  );
};

export default AgreementPage;
