"use client";

const ProductManualPage = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">상품설명서</h2>
      <p className="text-gray-600 mb-4 text-xs">
        AwoO 올원e통장의 상품설명서입니다. 계좌 개설 및 이용 방법을 확인하세요.
      </p>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md overflow-y-auto h-[280px]">
        <h3 className="text-m font-semibold mb-2">📌 상품 개요</h3>
        <p className="text-gray-700 mb-3 text-sm">
          AwoO 올원e통장은 모바일에서 자유롭게 개설할 수 있는 입출금 계좌로, 간편결제, 자동이체,
          AwoO 내 금융서비스 연계 기능을 제공합니다.
        </p>

        <h3 className="text-m font-semibold mt-4 mb-2">📌 주요 기능</h3>
        <ul className="list-disc ml-4 text-gray-700 space-y-1 text-sm">
          <li>입출금이 자유로운 모바일 계좌</li>
          <li>멍페이 및 자동이체 연동</li>
          <li>AwoO 내부 계좌 간 수수료 면제</li>
        </ul>
      </div>

      <p className="mt-4 text-gray-500 text-xs">본 상품설명서는 정책 변경에 따라 수정될 수 있음</p>
    </div>
  );
};

export default ProductManualPage;
