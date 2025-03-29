"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import Header from "@/app/home/components/Header";

// 적금 단계명
const savingNameMap = {
  1: "산뜻하개",
  2: "적절하개",
  3: "풍족하개",
} as const;
type SavingStep = keyof typeof savingNameMap;

export default function SavingPage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  const petList = user.petList ?? [];

  // ✅ 선택된 펫 ID 및 모달 상태
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // ✅ 선택된 펫 정보
  const pet = petList.find((p) => p.petId === selectedPet);

  // ✅ 펫 선택 핸들러
  const handleSelectPet = (p: (typeof petList)[0]) => {
    if (p.savingId !== 0) {
      setModalMessage("이미 적금에 가입된 반려견입니다 🐾");
      setShowModal(true);
      return;
    }
    setSelectedPet(p.petId);
  };

  // ✅ 카드 클릭 핸들러
  const handleClick = (step: number) => {
    if (!pet) {
      setModalMessage("먼저 펫을 선택해주세요 🐶");
      setShowModal(true);
      return;
    }
    if (step !== pet.walkGrade) {
      setModalMessage(`아직 이용할 수 없는 상품입니다\n${pet.name}의 등급을 올려주세요!`);
      setShowModal(true);
      return;
    }
    // ✅ 정상 가입
    router.push(`/account/open/saving/stage${step}`);
  };

  return (
    <div className="pt-14">
      <Header />

      <div className="p-4 space-y-8">
        {/* 🐶 펫 선택 */}
        <section className="space-y-2">
          <p className="text-sm font-semibold">적금에 가입할 반려견을 선택해주세요</p>
          <div className="flex space-x-2 overflow-x-auto">
            {petList.length > 0 ? (
              petList.map((p) => (
                <div
                  key={p.petId}
                  onClick={() => handleSelectPet(p)}
                  className={`min-w-[80px] p-2 rounded-xl border text-center cursor-pointer ${
                    selectedPet === p.petId
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <img
                    src={p.profileImage ?? "/icons/default-pet.png"}
                    alt={p.name}
                    className="w-12 h-12 rounded-full mx-auto mb-1 object-cover"
                  />
                  <p className="text-xs">{p.name}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400">등록된 반려견이 없습니다</p>
            )}
          </div>
        </section>

        {/* 💰 적금 상품 카드 */}
        <section className="space-y-3">
          <h2 className="text-base font-semibold">가입 가능한 적금 상품</h2>

          {[1, 2, 3].map((step) => {
            const stepKey = step as SavingStep;

            const isAvailable = pet && step === pet.walkGrade && pet.savingId === 0;
            const isUnderStep = pet && step < pet.walkGrade; // 하위 단계
            const isOverStep = pet && step > pet.walkGrade; // 상위 단계

            return (
              <div
                key={step}
                onClick={() => {
                  if (!pet) return setModalMessage("먼저 펫을 선택해주세요 🐶"), setShowModal(true);
                  if (isAvailable) return router.push(`/account/open/saving/stage${step}`);
                  if (isOverStep)
                    return (
                      setModalMessage("아직 이용할 수 없는 상품입니다\n등급을 올려주세요!"),
                      setShowModal(true)
                    );
                  // 하위 단계 클릭 무시
                }}
                className={`p-5 rounded-2xl border 
                ${isAvailable ? "border-blue-500 bg-blue-50 cursor-pointer" : "border-gray-200 bg-gray-100"} 
                ${!isAvailable && !isUnderStep ? "cursor-not-allowed" : ""}
                transition hover:shadow-md`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-base">
                      {step}단계 {savingNameMap[stepKey]} 적금
                    </p>
                    <p className="text-xs text-gray-500">
                      가입기간: {step + 2}개월 | 월 20회 이상 산책
                    </p>
                  </div>

                  {/* ✅ 표시 로직 */}
                  {isAvailable && (
                    <span className="text-xs text-blue-600 font-semibold">가입 가능</span>
                  )}
                  {isOverStep && (
                    <span className="text-xs text-gray-400 font-medium">등급 미달</span>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {/* ✅ 모달 */}
        {showModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl w-72 text-center shadow-xl space-y-2">
              <p className="text-xs whitespace-pre-line">{modalMessage}</p>
              <button
                className="mt-2 px-3 py-1 rounded bg-blue-500 text-white text-sm"
                onClick={() => setShowModal(false)}
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
