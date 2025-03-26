"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface BankInfoTypingProps {
  onComplete?: (data: { bank: string; accountNumber: string }) => void;
}

export default function BankInfoTyping({ onComplete }: BankInfoTypingProps) {
  const router = useRouter();
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [showBankSelector, setShowBankSelector] = useState<boolean>(false);
  const [modalPosition, setModalPosition] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startYRef = useRef<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // 은행 목록
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

  // 모달이 표시될 때 애니메이션 효과
  useEffect(() => {
    if (showBankSelector) {
      // 처음에는 화면 아래에서 시작
      setModalPosition(100);
      // 그 후 0으로 애니메이션 (위로 올라오는 효과)
      setTimeout(() => setModalPosition(0), 20);
      // 바디 스크롤 방지
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showBankSelector]);

  // 터치/마우스 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    // TouchEvent와 MouseEvent 모두 처리
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    startYRef.current = clientY;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;

    // TouchEvent와 MouseEvent 모두 처리
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const deltaY = clientY - startYRef.current;

    // 위로 드래그는 제한 (deltaY < 0인 경우)
    if (deltaY > 0) {
      setModalPosition(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // 일정 거리 이상 드래그하면 모달 닫기
    if (modalPosition > 150) {
      closeModal();
    } else {
      // 그렇지 않으면 원래 위치로
      setModalPosition(0);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    // 아래로 이동하는 애니메이션 후 닫기
    setModalPosition(100);
    setTimeout(() => {
      setShowBankSelector(false);
    }, 300);
  };

  // 계좌번호 형식화 (하이픈 추가 등)
  const formatAccountNumber = (value: string) => {
    // 숫자만 허용
    const numbers = value.replace(/[^0-9]/g, "");

    // 하이픈 추가 로직 (은행별로 다를 수 있음)
    // 여기서는 일반적인 형태로 적용
    let formatted = "";
    if (numbers.length <= 3) {
      formatted = numbers;
    } else if (numbers.length <= 6) {
      formatted = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      formatted = `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, numbers.length)}`;
    }

    return formatted;
  };

  // 계좌번호 입력 처리
  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAccountNumber(e.target.value);
    setAccountNumber(formatted);
  };

  // 계좌 인증 요청
  const handleVerifyAccount = () => {
    if (!selectedBank) {
      alert("은행을 선택해주세요.");
      return;
    }

    if (accountNumber.length < 10) {
      alert("올바른 계좌번호를 입력해주세요.");
      return;
    }

    // 완료 콜백 호출
    if (onComplete) {
      onComplete({ bank: selectedBank, accountNumber });
    } else {
      // 기본 동작
      console.log("계좌 정보:", { bank: selectedBank, accountNumber });
      alert("계좌 인증이 요청되었습니다.");
    }
  };

  return (
    <div className="flex flex-col p-4 bg-white h-full">
      {/* 은행 선택 영역 - 박스 스타일 */}
      <div className="mb-6 relative">
        <label className="block text-gray-500 mb-1 text-sm">은행</label>
        <div
          className="w-full border border-gray-300 rounded-md p-3 flex justify-between items-center cursor-pointer"
          onClick={() => setShowBankSelector(true)}
        >
          <span className={selectedBank ? "text-black font-medium" : "text-gray-400"}>
            {selectedBank || "은행을 선택해주세요"}
          </span>
          <div className="flex flex-col">
            <span className="h-3 text-[10px] text-gray-500">▲</span>
            <span className="h-3 text-[10px] text-gray-500">▼</span>
          </div>
        </div>
      </div>

      {/* 계좌번호 입력 영역 - 박스 스타일 */}
      <div className="mb-10">
        <label className="block text-gray-500 mb-1 text-sm">계좌번호</label>
        <input
          type="text"
          value={accountNumber}
          onChange={handleAccountNumberChange}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-teal-500"
          placeholder="계좌번호를 입력해주세요"
        />
      </div>

      {/* 버튼 영역 */}
      <div className="mt-[60px] flex justify-center">
        <button
          onClick={handleVerifyAccount}
          disabled={!selectedBank || accountNumber.length < 10}
          className={`w-[180px] py-3 rounded-full ${
            selectedBank && accountNumber.length >= 10
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-500"
          } font-medium transition-colors`}
        >
          계좌인증요청
        </button>
      </div>

      {/* 은행 선택 모달 */}
      {showBankSelector && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-[100] flex flex-col justify-end"
          onClick={() => closeModal()} // 배경 클릭 시 닫기
        >
          <div
            ref={modalRef}
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
            {/* 드래그 가능한 핸들 */}
            <div
              className="flex justify-center mb-4 relative cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onMouseDown={handleTouchStart}
            >
              <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
            </div>
            <h3 className="text-lg font-medium text-center mb-4">은행</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
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
