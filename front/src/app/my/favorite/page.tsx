"use client";
import { useEffect, useState } from "react";
import CommonTopBar from "@/common/ui/CommonTopBar";
import { getMyFavorites, FavoriteProductItem } from "@/api/my/favorite/favorite";
import { toggleLike } from "@/api/market/like/toggleLike";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface ProductItemProps {
  product: FavoriteProductItem;
  onToggleLike: (productId: number) => void;
}

// 상품 아이템 컴포넌트
const ProductItem = ({ product, onToggleLike }: ProductItemProps) => {
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
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      return createdAt.toLocaleDateString();
    }
  };

  return (
    <div className="flex border-b border-gray-100 py-4 relative">
      <div
        className="cursor-pointer"
        onClick={() => router.push(`/market/detail/${product.productId}`)}
      >
        <div className="relative w-24 h-24 rounded-md overflow-hidden">
          <Image
            src={product.imageUrl || "/images/no-image.jpg"}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>

      <div
        className="flex-1 ml-4 cursor-pointer mt-1"
        onClick={() => router.push(`/market/${product.productId}`)}
      >
        <h3 className="text-md text-gray-900 mb-1">{product.title}</h3>
        <p className="text-xs text-gray-500 mb-1">{formatDate(product.createdAt)}</p>
        <p className="text-lg font-bold mt-4">{product.price.toLocaleString()}원</p>
      </div>

      <button
        className="absolute top-4 right-2 p-2 mt-7"
        onClick={() => onToggleLike(product.productId)}
      >
        <HeartIcon className="w-6 h-6 text-teal-500" />
      </button>
    </div>
  );
};

export default function Favorite() {
  const [favorites, setFavorites] = useState<FavoriteProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 찜한 상품 목록 가져오기
  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await getMyFavorites();
      if (response.success) {
        setFavorites(response.response.usedProducts);
      }
    } catch (error) {
      console.error("찜한 상품 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 찜하기 토글 핸들러
  const handleToggleLike = async (productId: number) => {
    try {
      await toggleLike(productId);
      // 찜 해제 후 목록에서 제거
      setFavorites(favorites.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("찜하기 토글 실패:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <>
      <CommonTopBar title="관심 상품" />

      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <p>로딩 중...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <p className="text-gray-500 mb-4">찜한 상품이 없습니다.</p>
            <Link href="/market">
              <span className="text-teal-500 font-medium">상품 둘러보기</span>
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-500 mt-11">총 {favorites.length}개의 상품</p>
            <div className="divide-y divide-gray-200">
              {favorites.map((product) => (
                <ProductItem
                  key={product.productId}
                  product={product}
                  onToggleLike={handleToggleLike}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
