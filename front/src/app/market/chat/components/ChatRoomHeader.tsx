import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";

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
  const router = useRouter();

  const searchParams = useSearchParams();
  const from = searchParams.get("from");

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
    <div className="sticky top-0 z-10 flex items-center justify-between px-3 py-3 bg-white">
      <div className="flex items-center space-x-2">
        <button
          onClick={() =>
            from === "mychat"
              ? router.push("/market?tab=mychat")
              : router.push(`/market/${product.usedProductId}`)
          }
          className="text-gray-700 -ml-1"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <img src={product.imageUrls[0]} alt="product" className="w-9 h-9 rounded-md object-cover" />
        <div className="ml-1">
          <div className="text-m font-semibold truncate w-32">{product.title}</div>
          <div className="text-xs text-gray-400">{product.price.toLocaleString()}원</div>
        </div>
      </div>

      <button className="text-gray-400 text-xl">⋮</button>
    </div>
  );
}
