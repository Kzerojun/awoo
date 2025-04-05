"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { patchProductStatus } from "@/api/market/update/patchStatus";
import { motion } from "framer-motion";
import StatusChange from "./StatusChange";

interface SaleItem {
  usedProductId: number;
  imageUrl: string;
  price: number;
  createdAt: string;
  status: string;
  title: string;
}

interface SellingProps {
  salesData: SaleItem[];
  loading: boolean;
  onRefresh: () => void;
}

export default function Selling({ salesData, loading, onRefresh }: SellingProps) {
  const router = useRouter();
  const [statusChangeItem, setStatusChangeItem] = useState<number | null>(null);
  const [updating, setUpdating] = useState(false);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string): string => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes}분 전`;
      }
      return `${diffHours}시간 전`;
    } else {
      return `${diffDays}일 전`;
    }
  };

  // 상태 변경 처리 함수
  const handleStatusChange = async (productId: number, newStatus: "SA" | "RE" | "SO") => {
    if (updating) return;

    try {
      setUpdating(true);
      // API 호출 - 일반거래로 상태 변경
      await patchProductStatus(productId, newStatus, "COMMON");

      // 성공 메시지
      if (newStatus === "SO") {
        alert("거래가 완료되었습니다.");
      } else if (newStatus === "RE") {
        alert("상품이 예약중으로 변경되었습니다.");
      } else {
        alert("상품이 판매중으로 변경되었습니다.");
      }

      // 모달 닫기
      setStatusChangeItem(null);

      // 데이터 새로고침
      onRefresh();
    } catch (error) {
      console.error("상태 변경 실패:", error);
      alert("상태 변경 중 오류가 발생했습니다.");
    } finally {
      setUpdating(false);
    }
  };

  // 상태 변경 모달 토글
  const toggleStatusChange = (productId: number | null) => {
    setStatusChangeItem(productId === statusChangeItem ? null : productId);
  };

  // 모달 닫기
  const closeModal = () => {
    setStatusChangeItem(null);
  };

  // 모달 위치 계산 함수 - 화면 하단에 가까운 아이템은 위로 표시
  const getModalPosition = (index: number, totalItems: number) => {
    // 마지막 2개 아이템은 모달이 위로 뜨도록 설정
    return index >= totalItems - 2 ? "up" : "down";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="p-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {salesData.length === 0 ? (
        <div className="flex justify-center items-center p-10">
          <p className="text-gray-500">판매 중인 상품이 없습니다.</p>
        </div>
      ) : (
        <div>
          {salesData.map((item, index) => (
            <div key={item.usedProductId} className="border-b mb-4 relative border-gray-200">
              <div className="flex">
                {/* 상품 이미지 */}
                <div
                  className="relative w-24 h-24 rounded-md overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/market/${item.usedProductId}`)}
                >
                  <Image
                    src={item.imageUrl || "/images/no-image.jpg"}
                    alt="상품 이미지"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* 상품 정보 */}
                <div
                  className="ml-4 flex-1 cursor-pointer"
                  onClick={() => router.push(`/market/${item.usedProductId}`)}
                >
                  <h3 className="font-medium mt-1">
                    {item.title || `상품 #${item.usedProductId}`}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(item.createdAt)}</p>
                  <div className="flex mt-3">
                    {/* 상태 표시 */}
                    <div className="mt-[6px]">
                      <span
                        className={`text-xs px-2 py-1 rounded-sm ${
                          item.status === "RE"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-teal-100 text-teal-700"
                        }`}
                      >
                        {item.status === "RE" ? "예약중" : "판매중"}
                      </span>
                    </div>
                    <p className="text-lg font-bold mt-1 ml-2">{item.price.toLocaleString()}원</p>
                  </div>
                </div>
              </div>

              {/* 상태 변경 버튼 영역 */}
              <div className="flex justify-between mt-3 border-t border-gray-200">
                <div className="flex-1 relative">
                  <button
                    className="w-full py-3 text-center text-sm border-r border-gray-200"
                    onClick={() => toggleStatusChange(item.usedProductId)}
                    disabled={updating}
                  >
                    {item.status === "RE" ? "판매중으로 변경" : "예약중으로 변경"}
                  </button>

                  {/* 상태 변경 모달 - StatusChangeModal 컴포넌트 사용 */}
                  <StatusChange
                    isOpen={statusChangeItem === item.usedProductId}
                    onClose={closeModal}
                    onStatusChange={(status) => handleStatusChange(item.usedProductId, status)}
                    currentStatus={item.status}
                    position={getModalPosition(index, salesData.length)}
                  />
                </div>

                <button
                  className="flex-1 py-3 text-center text-sm"
                  onClick={() => handleStatusChange(item.usedProductId, "SO")}
                  disabled={updating}
                >
                  거래완료로 변경
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
