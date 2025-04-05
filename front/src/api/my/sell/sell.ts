import axiosInstance from "../../axiosInstance";

// 판매 상품 상태 타입
export type SaleStatus = "SA" | "RE" | "SO"; // 거래중, 예약중, 거래완료

// 판매 상품 아이템 인터페이스
interface SaleItem {
  title: string;
  usedProductId: number;
  imageUrl: string;
  price: number;
  createdAt: string;
  status: SaleStatus;
}

// 판매 상품 응답 인터페이스
interface MySalesResponse {
  success: boolean;
  response: {
    sales: SaleItem[];
  };
  error: null | string;
}

// 판매 목록 조회
export const getMySales = async (status?: SaleStatus): Promise<MySalesResponse> => {
  // 상태 파라미터가 있는 경우에만 추가
  const params = status ? { status } : {};

  const response = await axiosInstance.get("/used-products/my-sales", { params });
  return response.data;
};
