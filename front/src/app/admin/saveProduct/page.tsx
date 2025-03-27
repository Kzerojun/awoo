"use client";

import { useState } from "react";
import Image from "next/image";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import { productData } from "./data/mockData";

export default function SaveProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // 페이지네이션 처리
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productData.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productData.length / productsPerPage);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddProduct = (product: any) => {
    // 실제로는 API 호출을 통해 상품을 추가하는 로직이 필요
    console.log("새 상품 추가:", product);
    closeModal();
  };

  return (
    <div className="container mx-auto relative pb-20">
      {/* 상품 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8">
        {totalPages > 1 && (
          <div className="pagination flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-btn w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition-colors duration-150"
            >
              &lt;
            </button>

            {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
              // 현재 페이지를 중심으로 표시할 페이지 번호 계산
              let pageNum = currentPage;
              if (currentPage <= 3) {
                pageNum = index + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + index;
              } else {
                pageNum = currentPage - 2 + index;
              }

              // 페이지 범위 체크
              if (pageNum <= 0 || pageNum > totalPages) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-150
                    ${
                      currentPage === pageNum
                        ? "bg-teal-500 text-white border border-teal-500"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="pagination-btn w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition-colors duration-150"
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 right-4">
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition shadow-sm"
        >
          <span className="text-xl">+</span>
          <span>상품 등록하기</span>
        </button>
      </div>

      {/* 상품 등록 모달 */}
      {isModalOpen && <ProductModal onClose={closeModal} onSave={handleAddProduct} />}
    </div>
  );
}
