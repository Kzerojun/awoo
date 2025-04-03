"use client";

import { useState, useEffect, useRef } from "react";

interface BankSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBank: (bank: string) => void;
  banks?: string[]; // 선택적 prop으로 변경
}

export default function BankSelectorModal({
  isOpen,
  onClose,
  onSelectBank,
  banks: customBanks, // 외부에서 전달받은 은행 목록
}: BankSelectorModalProps) {
  const [modalPosition, setModalPosition] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startYRef = useRef<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // 기본 은행 목록 (컴포넌트 내부에 정의)
  const defaultBanks = [
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
    "AwOO",
  ];

  // 사용할 은행 목록 (외부에서 전달받은 목록 또는 기본 목록)
  const banks = customBanks || defaultBanks;

  // 모달이 표시될 때 애니메이션 효과
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

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
      onClose();
    }, 300);
  };

  // 은행 선택 처리
  const handleSelectBank = (bank: string) => {
    onSelectBank(bank);
    closeModal();
  };

  if (!isOpen) return null;

  return (
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
        <div className="grid grid-cols-3 gap-2 mb-4 max-h-[60vh] overflow-auto">
          {banks.map((bank) => (
            <button
              key={bank}
              className="border border-gray-300 rounded-md py-3 text-sm hover:bg-gray-50 transition-colors"
              onClick={() => handleSelectBank(bank)}
            >
              {bank}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
