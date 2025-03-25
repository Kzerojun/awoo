// 적금 상품 데이터 타입 정의
export interface ProductData {
  id: number;
  name: string;
  description?: string;
  period: string;
  minAmount: number;
  maxAmount: number;
  minRate: number;
  maxRate: number;
  rateDescription?: string;
  isActive: boolean;
}

// 적금 상품 목 데이터
export const productData: ProductData[] = [
  {
    id: 1,
    name: "AW우리펫 정기적금",
    description:
      "반려동물과 함께하는 모든 보호자님들을 위한 특별한 적금상품입니다. 높은 금리와 함께 반려동물 용품 할인 혜택을 제공합니다.",
    period: "6개월",
    minAmount: 1,
    maxAmount: 100,
    minRate: 0.1,
    maxRate: 2.0,
    rateDescription: "기본금리 0.1%에 추가 우대금리 최대 1.9%를 더해 총 2.0%까지 제공됩니다.",
    isActive: true,
  },
  {
    id: 2,
    name: "AW우리펫 자유적금",
    description:
      "원하는 때에 자유롭게 납입하는 자유적금 상품으로, 반려동물 관련 지출에 대한 계획적인 저축이 가능합니다.",
    period: "12개월",
    minAmount: 1,
    maxAmount: 200,
    minRate: 0.1,
    maxRate: 2.0,
    rateDescription: "기본금리 0.1%에 반려동물 관련 앱 이용 시 우대금리 최대 1.9%를 제공합니다.",
    isActive: true,
  },
  {
    id: 3,
    name: "AW우리펫 목표적금",
    description:
      "반려동물을 위한 특별한 목표가 있으신가요? 목표 금액 설정과 함께 체계적인 저축을 도와드립니다.",
    period: "24개월",
    minAmount: 5,
    maxAmount: 300,
    minRate: 0.1,
    maxRate: 2.0,
    rateDescription: "목표 달성 시 추가 보너스 금리 0.5%를 제공합니다.",
    isActive: true,
  },
  {
    id: 4,
    name: "AW우리펫 쿠폰적금",
    description: "매월 적금과 함께 반려동물 용품 쿠폰을 받을 수 있는 혜택 가득한 적금 상품입니다.",
    period: "12개월",
    minAmount: 1,
    maxAmount: 150,
    minRate: 0.1,
    maxRate: 2.0,
    rateDescription: "쿠폰 사용 실적에 따라 우대금리가 차등 적용됩니다.",
    isActive: true,
  },
  {
    id: 5,
    name: "AW우리펫 교육적금",
    description: "반려동물의 교육과 훈련을 위한 비용을 계획적으로 모을 수 있는 특화 상품입니다.",
    period: "18개월",
    minAmount: 3,
    maxAmount: 200,
    minRate: 0.1,
    maxRate: 2.0,
    rateDescription: "제휴된 교육기관 이용 시 추가 금리 혜택을 받을 수 있습니다.",
    isActive: true,
  },
  {
    id: 6,
    name: "AW우리펫 의료적금",
    description: "예상치 못한 반려동물의 의료비를 대비할 수 있는 안심 적금 상품입니다.",
    period: "24개월",
    minAmount: 5,
    maxAmount: 250,
    minRate: 0.1,
    maxRate: 2.0,
    rateDescription: "제휴 동물병원 이용 시 할인 혜택과 함께 우대금리를 제공합니다.",
    isActive: true,
  },
  {
    id: 7,
    name: "AW우리펫 여행적금",
    description: "반려동물과 함께하는 여행을 위한 자금을 모을 수 있는 여행 특화 적금입니다.",
    period: "12개월",
    minAmount: 1,
    maxAmount: 150,
    minRate: 0.1,
    maxRate: 2.0,
    rateDescription: "여행 관련 앱 제휴 이용 시 추가 혜택이 제공됩니다.",
    isActive: true,
  },
  {
    id: 8,
    name: "AW우리펫 푸드적금",
    description: "반려동물의 건강한 식단을 위한 사료 및 간식 구매 자금을 모을 수 있는 적금입니다.",
    period: "6개월",
    minAmount: 1,
    maxAmount: 100,
    minRate: 0.1,
    maxRate: 2.0,
    rateDescription: "제휴 사료 브랜드 구매 시 캐시백과 추가 금리 혜택을 제공합니다.",
    isActive: true,
  },
  {
    id: 9,
    name: "AW우리펫 시니어적금",
    description: "노령 반려동물을 위한 특별 케어 비용을 준비할 수 있는 적금 상품입니다.",
    period: "24개월",
    minAmount: 3,
    maxAmount: 200,
    minRate: 0.1,
    maxRate: 2.0,
    rateDescription: "7세 이상 반려동물 등록 시 우대금리를 제공합니다.",
    isActive: true,
  },
  {
    id: 10,
    name: "AW우리펫 입양적금",
    description: "새로운 가족이 될 반려동물의 입양을 준비하는 예비 보호자를 위한 적금입니다.",
    period: "12개월",
    minAmount: 1,
    maxAmount: 150,
    minRate: 0.1,
    maxRate: 2.0,
    rateDescription: "입양 후 인증 시 축하 보너스 금리를 제공합니다.",
    isActive: true,
  },
];

// 적금 상품 가입 기간 옵션
export const periodOptions = ["3개월", "6개월", "12개월", "18개월", "24개월", "36개월"];
