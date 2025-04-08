import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSize: number;
  totalElements: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
  pageSize,
  totalElements,
}: PaginationProps) {
  // 페이지 번호 생성
  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    let pages = [];

    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 maxVisiblePages 이하면 모든 페이지 표시
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 현재 페이지 기준으로 앞뒤로 표시할 페이지 수 계산
      const sidePages = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(currentPage - sidePages, 0);
      let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

      // endPage가 최대치에 도달했을 때 startPage 조정
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 0);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="mb-4 md:mb-0 text-sm text-gray-500">
        전체 {totalElements}개 계좌 중 {currentPage * pageSize + 1}-
        {Math.min((currentPage + 1) * pageSize, totalElements)}개 표시
      </div>

      <div className="flex items-center">
        {/* 페이지 크기 선택 */}
        <div className="mr-4">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value={10}>10개씩 보기</option>
            <option value={20}>20개씩 보기</option>
            <option value={50}>50개씩 보기</option>
          </select>
        </div>

        {/* 이전 페이지 버튼 */}
        <button
          onClick={() => onPageChange(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className={`px-3 py-1 rounded-md mr-1 ${
            currentPage === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          이전
        </button>

        {/* 페이지 번호 */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md mx-1 ${
              currentPage === page ? "bg-teal-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page + 1}
          </button>
        ))}

        {/* 다음 페이지 버튼 */}
        <button
          onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
          disabled={currentPage === totalPages - 1}
          className={`px-3 py-1 rounded-md ml-1 ${
            currentPage === totalPages - 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
