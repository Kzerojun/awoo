"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import Button from "@/common/ui/Button";
import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function AccountVerifyPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [showBankSelector, setShowBankSelector] = useState(false);
  const [modalPosition, setModalPosition] = useState(100);
  const startYRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();
  const banks = [
    "한국",
    "산업",
    "IBK기업",
    "국민",
    "농협",
    "우리",
    "SC제일",
    "시티",
    "대구",
    "광주",
    "제주",
    "전북",
    "경남",
    "새마을금고",
    "KEB하나",
    "신한",
    "카카오",
    "싸피",
  ];

  useEffect(() => {
    if (showBankSelector) {
      setModalPosition(100);
      setTimeout(() => setModalPosition(0), 10);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showBankSelector]);

  const handleTouchStart = (e: any) => {
    setIsDragging(true);
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startYRef.current = clientY;
  };

  const handleTouchMove = (e: any) => {
    if (!isDragging) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - startYRef.current;
    if (deltaY > 0) setModalPosition(deltaY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (modalPosition > 150) closeModal();
    else setModalPosition(0);
  };

  const closeModal = () => {
    setModalPosition(100);
    setTimeout(() => setShowBankSelector(false), 300);
  };

  return (
    <div>
      <CommonTopBar title="계좌인증" leftAction="back" rightAction="cancel" />

      <div className="pt-16 px-6 flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold">1원 송금 계좌 입력</h2>
          <p className="text-sm text-gray-500 mt-1">
            본인 명의로 개설된
            <br />
            타행 계좌번호를 입력해주세요.
          </p>
        </div>

        {/* 은행 + 계좌 입력 */}
        <div className="bg-white rounded-lg border border-gray-200 p-0.5 w-full max-w-sm shadow-sm">
          <div
            className="border-b border-gray-200 px-6 py-4 text-sm text-gray-900 flex items-center justify-between cursor-pointer"
            onClick={() => setShowBankSelector(true)}
          >
            {selectedBank || <span className="text-gray-400">은행</span>}
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          </div>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="계좌번호"
            className="px-6 py-4 text-sm text-gray-900 placeholder-gray-400 w-full focus:outline-none"
            value={accountNumber}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, "");
              setAccountNumber(onlyNums);
            }}
          />
        </div>

        <p className="text-xs text-gray-400 mt-2">가상 계좌번호는 지정할 수 없습니다.</p>
      </div>

      <div className="mt-10 flex justify-center">
        {selectedBank && accountNumber.length >= 8 && (
          <div className="mt-10 flex justify-center">
            <Button
              text="인증요청"
              width="long"
              onClick={() => {
                console.log("은행:", selectedBank);
                console.log("계좌번호:", accountNumber);
                router.push("/account/verify/confirm");
              }}
            />
          </div>
        )}
      </div>

      {/* 바텀시트 모달 */}
      {showBankSelector && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] flex flex-col justify-end"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-t-3xl p-4"
            style={{
              transform: `translateY(${modalPosition}%)`,
              transition: "transform 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <h3 className="text-lg font-medium text-center mb-4">은행 선택</h3>
            <div className="grid grid-cols-3 gap-2">
              {banks.map((bank) => (
                <button
                  key={bank}
                  className="border border-gray-300 rounded-md py-3 text-sm"
                  onClick={() => {
                    setSelectedBank(bank);
                    closeModal();
                  }}
                >
                  {bank}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
