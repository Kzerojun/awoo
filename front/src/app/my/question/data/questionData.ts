// 문의 아이템 타입 정의
export interface QuestionItemType {
  id: number;
  title: string;
  author: string;
  date: string;
  isLocked: boolean;
  hasAnswer: boolean;
}

// 샘플 문의 데이터
export const sampleQuestions: QuestionItemType[] = [
  {
    id: 1,
    title: "측정 거리 오차 문의 드립니다.",
    author: "김홍범(rlag**)",
    date: "2025.03.12",
    isLocked: true,
    hasAnswer: false,
  },
  {
    id: 2,
    title: "가족 적금 가입 문의 드립니다.",
    author: "이다은(dlek**)",
    date: "2025.02.12",
    isLocked: true,
    hasAnswer: false,
  },
  {
    id: 3,
    title: "탈퇴 시 데이터 처리 문의 드립니다.",
    author: "김홍범(rlag**)",
    date: "2025.01.12",
    isLocked: false,
    hasAnswer: true,
  },
  {
    id: 4,
    title: "산책 거리 미기록 문의 드립니다.",
    author: "강은수(rkdd**)",
    date: "2024.12.12",
    isLocked: true,
    hasAnswer: true,
  },
];
