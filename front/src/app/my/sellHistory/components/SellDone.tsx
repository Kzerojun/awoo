"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface SaleItem {
  usedProductId: number;
  imageUrl: string;
  price: number;
  createdAt: string;
  status: string;
  title?: string; // API에 없을 수 있는 필드이므로 옵션으로 추가
}

interface SellDoneProps {
  salesData: SaleItem[];
  loading: boolean;
}

export default function SellDone({ salesData, loading }: SellDoneProps) {
  const router = useRouter();

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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {salesData.length === 0 ? (
        <div className="flex justify-center items-center p-10">
          <p className="text-gray-500">거래 완료된 상품이 없습니다.</p>
        </div>
      ) : (
        <div>
          {salesData.map((item) => (
            <div key={item.usedProductId} className="border-b pb-4 mb-4 border-gray-200">
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
                  <div className="flex items-center mt-4">
                    <span className="bg-gray-200 text-gray-700 text-xs rounded px-2 py-0.5 mr-2">
                      거래완료
                    </span>
                    <p className="text-lg font-bold">{item.price.toLocaleString()}원</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
