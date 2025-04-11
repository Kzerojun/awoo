"use client";

const ProductManualPage = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">상품설명서</h2>
      <p className="text-gray-600 mb-4">
        본 상품설명서는 산책 리워드 적금 상품에 대한 기본 정보를 제공합니다.
      </p>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md max-h-[60vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2">📌 상품 개요</h3>
        <p className="text-gray-700 mb-3 text-sm">
          산책 리워드 적금은 반려견과 함께 걷는 즐거움을 금융 혜택으로 연결하는 일일 적금
          상품입니다. 일정 조건의 산책을 달성할 경우, 더 높은 금리를 가진 상품을 가입할 권한이
          생깁니다.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">📌 주요 혜택</h3>
        <ul className="list-disc ml-4 text-gray-700 space-y-1 text-sm">
          <li>월 20회 산책 시 다음 단계 진입 가능</li>
          <li>
            단계별 적금 기간:
            <br />
            3개월 → 4개월 → 5개월
          </li>
        </ul>
      </div>

      <p className="mt-4 text-gray-500 text-xs">
        본 상품설명서는 정책 및 운영방식에 따라 사전 고지 없이 변경될 수 있습니다.
      </p>
    </div>
  );
};

export default ProductManualPage;
