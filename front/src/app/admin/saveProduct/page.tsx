"use client";

import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import { getSavingsProducts, createSavingsProduct } from "@/api/admin/admin";

// admin.ts에서 가져온 타입 정의 사용
import { SavingsProduct, SavingsProductRequest } from "@/api/admin/admin";

export default function SaveProduct() {
  const [products, setProducts] = useState<SavingsProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // 적금 상품 목록 조회
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getSavingsProducts();
      if (response.success) {
        setProducts(response.response);
      } else {
        console.error("적금 상품 목록 조회 실패:", response.error);
      }
    } catch (error) {
      console.error("적금 상품 목록 요청 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchProducts();
  }, []);

  // 페이지네이션 처리
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 새 적금 상품 등록 핸들러
  const handleAddProduct = async (formData: any) => {
    try {
      // API 요청 데이터 변환
      const savingsProductData: SavingsProductRequest = {
        bankCode: "999", // 기본값으로 설정
        accountName: formData.name,
        accountDescription: formData.description,
        subscriptionPeriod: formData.period.replace(/[^0-9]/g, ""), // 숫자만 추출 (예: "120일" -> "120")
        minSubscriptionBalance: formData.minAmount * 10000, // 만원 단위를 원 단위로 변환
        maxSubscriptionBalance: formData.maxAmount * 10000, // 만원 단위를 원 단위로 변환
        interestRate: formData.maxRate, // 최대 이율 사용
        rateDescription: formData.rateDescription,
      };

      const response = await createSavingsProduct(savingsProductData);

      if (response.success) {
        alert("적금 상품이 등록되었습니다.");
        fetchProducts(); // 목록 새로고침
        closeModal();
      } else {
        alert(`상품 등록 실패: ${response.error}`);
      }
    } catch (error) {
      console.error("적금 상품 등록 오류:", error);
      alert("적금 상품 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mx-auto relative pb-20">
      {/* 로딩 표시 */}
      {loading ? (
        <div className="text-center p-8">
          <p className="text-gray-500">적금 상품 목록을 불러오는 중입니다...</p>
        </div>
      ) : (
        <>
          {/* 적금 상품이 없는 경우 */}
          {products.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-gray-500">등록된 적금 상품이 없습니다.</p>
            </div>
          ) : (
            <>
              {/* 상품 카드 그리드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.accountTypeUniqueNo}
                    product={product}
                    onProductUpdated={fetchProducts}
                  />
                ))}
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
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
                </div>
              )}
            </>
          )}
        </>
      )}

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
