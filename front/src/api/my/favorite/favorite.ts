import axiosInstance from "@/api/axiosInstance";

// 찜한 상품 아이템 인터페이스
export interface FavoriteProductItem {
  productId: number;
  title: string;
  content: string;
  price: number;
  usedProductStatus: "SA" | "RE" | "SO"; // 거래중, 예약중, 거래완료
  viewCount: number;
  likeCount: number;
  imageUrl: string;
  createdAt: string;
}

// 찜한 상품 응답 인터페이스
interface MyFavoritesResponse {
  success: boolean;
  response: {
    usedProducts: FavoriteProductItem[];
  };
  error: null | string;
}

// 찜한 상품 목록 조회
export const getMyFavorites = async (): Promise<MyFavoritesResponse> => {
  const response = await axiosInstance.get("/used-products/likes");
  return response.data;
};
