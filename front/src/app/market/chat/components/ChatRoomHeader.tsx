import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";

interface ChatRoomHeaderProps {
  usedProductId: number | null;
}

interface ProductDetail {
  usedProductId: number;
  title: string;
  content: string;
  price: number;
  imageUrls: string[];
}

export default function ChatRoomHeader({ usedProductId }: ChatRoomHeaderProps) {
  const [product, setProduct] = useState<ProductDetail | null>(null);

  useEffect(() => {
    if (!usedProductId) return;

    const fetchProductDetail = async () => {
      try {
        const res = await axiosInstance.get(`/used-products/${usedProductId}`);
        setProduct(res.data.response);
      } catch (error) {
        console.error("상품 상세 조회 실패", error);
      }
    };

    fetchProductDetail();
  }, [usedProductId]);

  if (!product) return null;

  return (
    <div className="flex sticky top-0 z-10 items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center space-x-2">
        <img
          src={product.imageUrls[0]}
          alt="product"
          className="w-10 h-10 rounded-md object-cover"
        />
        <div>
          <div className="text-sm font-semibold truncate w-32">{product.title}</div>
          <div className="text-xs text-gray-400">{product.price.toLocaleString()}원</div>
        </div>
      </div>
      <button className="text-gray-400 text-xl">⋮</button>
    </div>
  );
}
