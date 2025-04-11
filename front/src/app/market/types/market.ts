export interface MarketItem {
  productId: number;
  imageUrl: string;
  title: string;
  price: number;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  status?: "SA" | "RE" | "SO"; // SA: 판매중, RE: 예약중, SO: 거래완료
}

export type MarketTab = "상품" | "내 채팅";
