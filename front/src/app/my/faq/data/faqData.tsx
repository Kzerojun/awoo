// FAQ 아이템 타입 정의
export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

// FAQ 데이터
export const faqData: FaqItem[] = [
  {
    id: 1,
    question: "이 서비스는 어떤 서비스인가요?",
    answer: "답변을 준비 중 입니다.",
    category: "서비스 관련",
  },
  {
    id: 2,
    question: "어떻게 가입하나요?",
    answer: "답변을 준비 중 입니다.",
    category: "서비스 관련",
  },
  {
    id: 3,
    question: "어떻게 산책 거리를 측정하나요?",
    answer: "답변을 준비 중 입니다.",
    category: "산책 관련",
  },
  {
    id: 4,
    question: "한 달에 몇 번 산책해야 혜택을 받나요?",
    answer: "답변을 준비 중 입니다.",
    category: "산책 관련",
  },
  {
    id: 5,
    question: "산책 기록이 잘못 측정되었어요.",
    answer: "답변을 준비 중 입니다.",
    category: "산책 관련",
  },
  {
    id: 6,
    question: "적금 가입 기간은 어떻게 되나요?",
    answer: "답변을 준비 중 입니다.",
    category: "적금 혜택 관련",
  },
  {
    id: 7,
    question: "적금 최대 가입 금액은 얼마인가요?",
    answer: "답변을 준비 중 입니다.",
    category: "적금 혜택 관련",
  },
  {
    id: 8,
    question: "어떤 용품을 거래할 수 있나요?",
    answer: "답변을 준비 중 입니다.",
    category: "중고거래 관련",
  },
  {
    id: 9,
    question: "거래 시 수수료가 있나요?",
    answer: "답변을 준비 중 입니다.",
    category: "중고거래 관련",
  },
];
