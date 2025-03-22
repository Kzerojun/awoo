"use client";
import { useRouter } from "next/navigation";

const ProductDocs = () => {
  const router = useRouter();

  // 상품설명서 및 약관 페이지 이동 함수
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">상품설명서 및 약관</h3>

      {/* 설명서 및 약관 버튼 리스트 */}
      <div className="space-y-3">
        <button
          onClick={() => handleNavigate("/account/open/deposit/docs/product")}
          className="w-full p-3 border rounded-lg bg-white text-left"
        >
          상품설명서
        </button>
        <button
          onClick={() => handleNavigate("/account/open/deposit/docs/terms")}
          className="w-full p-3 border rounded-lg bg-white text-left "
        >
          이용 약관
        </button>
        <button
          onClick={() => handleNavigate("/account/open/deposit/docs/privacy")}
          className="w-full p-3 border rounded-lg bg-white text-left "
        >
          개인정보 처리방침
        </button>
      </div>
    </div>
  );
};
export default ProductDocs;
