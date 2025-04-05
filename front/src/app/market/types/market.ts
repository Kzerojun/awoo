export interface MarketItem {
  productId: number;
  imageUrl: string;
  title: string;
  time: string;
  price: string;
  viewCount: number;
  likeCount: number;
}

export type MarketTab = "상품" | "내 채팅";
