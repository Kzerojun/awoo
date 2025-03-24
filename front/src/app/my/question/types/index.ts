// 문의 아이템의 기본 타입 정의
export interface QuestionItemType {
  id: number;
  title: string;
  author: string;
  date: string;
  isLocked: boolean;
  hasAnswer: boolean;
}

// 문의 상세 데이터 타입 (기본 문의 데이터 + 상세 내용)
export interface QuestionDetailType extends QuestionItemType {
  content: string;
  answer?: string;
}

// 문의 목록 응답 타입
export interface QuestionsResponse {
  questions: QuestionItemType[];
  totalCount: number;
  hasMore: boolean;
}

// 문의 생성 요청 타입
export interface CreateQuestionRequest {
  title: string;
  content: string;
  isLocked: boolean;
}

// API 응답 기본 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
