"use client";

import { useRouter } from "next/navigation";

export default function SafePaymentProcess() {
  const router = useRouter();

  const handleSkip = () => {
    router.push("/market/safePayment/safePay");
  };

  return (
    <div className="flex-1 px-6 py-8 flex flex-col">
      {/* 안심결제 프로세스 안내 섹션 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">안심결제 프로세스 안내 ✏️</h1>
        <p className="text-gray-700 mb-4">• 안심결제는 ONLY 멍 페이로 결제가능</p>

        <ol className="list-decimal pl-6 space-y-3 mb-4">
          <li className="text-gray-800">구매자가 물품 가격을 결제</li>
          <li className="text-gray-800">AwOO페이에서 돈을 안전하게 보관</li>
          <li className="text-gray-800">구매자가 물품을 안전하게 받고, 구매확정</li>
          <li className="text-gray-800">판매자에게 거래 금액을 전달</li>
        </ol>
      </div>

      {/* 안심결제 수수료 안내 섹션 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">안심결제 수수료 안내 📢</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li className="text-gray-800">AwOO페이 결제 시: 거래 금액의 1.5%</li>
          <li className="text-gray-800">수수료는 구매자가 부담해요</li>
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
