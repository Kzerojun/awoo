"use client";
import { useState } from "react";
import PrivacyPage from "@/app/account/open/deposit/docs/privacy/page";
import TermsPage from "@/app/account/open/deposit/docs/terms/page";
import ProductPage from "@/app/account/open/deposit/docs/product/page";

const ProductDocs = () => {
  const [modalType, setModalType] = useState<null | "product" | "terms" | "privacy">(null);

  // 모달 닫기
  const handleClose = () => {
    setModalType(null);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "product":
        return <ProductPage />;
      case "terms":
        return <TermsPage />;
      case "privacy":
        return <PrivacyPage />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">상품설명서 및 약관</h3>

      <div className="space-y-3">
        <button
          onClick={() => setModalType("product")}
          className="w-full p-3 border rounded-lg bg-white text-left"
        >
          상품설명서
        </button>
        <button
          onClick={() => setModalType("terms")}
          className="w-full p-3 border rounded-lg bg-white text-left"
        >
          이용 약관
        </button>
        <button
          onClick={() => setModalType("privacy")}
          className="w-full p-3 border rounded-lg bg-white text-left"
        >
          개인정보 처리방침
        </button>
      </div>

      {/* 모달 */}
      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white max-w-xl w-[90%] max-h-[90vh] overflow-y-auto rounded-lg shadow-lg relative p-6">
            <button
              onClick={handleClose}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-sm"
            >
              닫기 ✕
            </button>
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDocs;
