"use client";

import { useRouter } from "next/navigation";

interface CommonPaymentProcessProps {
  chatRoomId: string | null;
  usedProductId: string | null;
}

export default function CommonPaymentProcess({
  chatRoomId,
  usedProductId,
}: CommonPaymentProcessProps) {
  const router = useRouter();

  const handleSkip = () => {
    router.push(
      `/market/commonPayment/commonPay?chatRoomId=${chatRoomId}&usedProductId=${usedProductId}`
    );
  };

  return (
    <div className="flex-1 px-6 py-8 flex flex-col">
      {/* 일반결제 프로세스 안내 섹션 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">일반결제 프로세스 안내 ✏️</h1>
        <p className="text-gray-700 mb-4">• 일반결제는 ONLY 멍 페이로 결제가능</p>

        <ol className="list-decimal pl-6 space-y-3 mb-4">
          <li className="text-gray-800">구매자가 물품 가격을 결제</li>
          <li className="text-gray-800">판매자에게 거래 금액이 바로 전달됩니다</li>
          <li className="text-gray-800">구매자와 판매자가 자유롭게 거래를 진행합니다</li>
        </ol>
      </div>

      {/* 일반결제 안내 섹션 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">일반결제 안내 📢</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li className="text-gray-800">AwOO페이 일반 결제는 수수료가 없습니다</li>
          <li className="text-gray-800">결제 금액이 판매자에게 즉시 전송됩니다</li>
        </ul>
      </div>

      {/* 빈 공간 */}
      <div className="flex-grow mb-20"></div>

      {/* 건너뛰기 버튼 */}
      <button
        onClick={handleSkip}
        className="w-full py-2 bg-teal-500 text-white text-lg font-medium rounded-lg hover:bg-teal-600 transition-colors"
      >
        건너뛰기
      </button>
    </div>
  );
}
