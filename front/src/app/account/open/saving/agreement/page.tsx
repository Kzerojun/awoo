"use client";

import { useState } from "react";
import AgreementSection from "../../deposit/agreement/components/AgreementSection";
import CommonTopBar from "@/common/ui/CommonTopBar";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/common/ui/Button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setConditionsAgreement } from "@/lib/slices/savingSlice";

const agreementItems = [
  "적립식예금 약관",
  "AwOO은행 정기적금 특약",
  "비과세종합저축 특약",
  "중요사항 설명 안내",
  "불이익사항 안내",
  "금융소비자 권리사항 안내",
];

export default function SavingAgreementPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { conditionsAgreement } = useAppSelector((state) => state.saving);

  // 체크박스 상태 (상품설명서 + 6개 약관 = 총 7개)
  const [checkedList, setCheckedList] = useState<boolean[]>(
    Array(agreementItems.length + 1).fill(false)
  );
  const [showWarning, setShowWarning] = useState(false);

  // ✅ 개별 체크
  const toggleCheck = (index: number) => {
    const updated = [...checkedList];
    updated[index] = !updated[index];
    setCheckedList(updated);
    setShowWarning(false);
    dispatch(setConditionsAgreement(updated.every(Boolean)));
  };

  // ✅ 묶음 체크 (section용)
  const toggleSection = (indexes: number[]) => {
    const updated = [...checkedList];
    const allCheckedSection = indexes.every((i) => checkedList[i]);

    indexes.forEach((i) => {
      updated[i] = !allCheckedSection;
    });

    setCheckedList(updated);
    setShowWarning(false);
    dispatch(setConditionsAgreement(updated.every(Boolean)));
  };

  const handleNextClick = () => {
    if (!conditionsAgreement) {
      setShowWarning(true);
      return;
    }
    router.push("/account/open/saving/info");
  };

  return (
    <div className="pt-14 px-4 pb-10 max-w-md mx-auto bg-white min-h-screen">
      <CommonTopBar
        title="정기적금 상품 동의"
        leftAction="back"
        rightAction="cancel"
        onClose={() => router.push("/account/open/saving")}
      />

      {/* 상품 설명서 */}
      <div className="border p-4 mb-1.5">
        <button onClick={() => toggleCheck(0)} className="flex items-center space-x-2">
          {checkedList[0] ? (
            <CheckCircleIcon className="w-7 h-7 text-aqua" />
          ) : (
            <CheckCircleIcon className="w-7 h-7 text-gray-300" />
          )}
          <span>AwOO뱅크 정기적금 상품 설명서</span>
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-6 ml-2">상품설명서의 내용을 반드시 확인해주세요.</p>

      {/* 이용약관 */}
      <AgreementSection
        title="상품 이용약관"
        items={agreementItems.slice(0, 5)}
        startIndex={1}
        checkedList={checkedList}
        toggleCheck={toggleCheck}
        toggleSection={toggleSection}
      />

      {/* 안내사항 */}
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

      {/* 다음 버튼 */}
      <Button
        text="다음"
        width="long"
        textSize="medium"
        fontBold="base"
        className="w-full mt-6 py-3 text-center"
        disabled={!conditionsAgreement}
        onClick={handleNextClick}
      />
    </div>
  );
}
