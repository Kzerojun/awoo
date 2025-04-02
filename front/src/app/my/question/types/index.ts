// 문의 아이템 타입 정의
export interface QuestionItemType {
  id: number;
  title: string;
  author: string;
  date: string;
  isLocked: boolean;
  hasAnswer: boolean;
}

// API 응답 내 문의 항목 타입
export interface QuestionApiItem {
  questionId: number;
  subject: string;
  category: string;
  isPublic: boolean;
  memberId: number;
  name: string;
  email: string;
  isAnswer: boolean;
}

// 문의 목록 응답 타입
export interface QuestionListResponse {
  success: boolean;
  response: QuestionApiItem[];
  error: any;
}

export interface QuestionDetailApiResponse {
  subject: string;
  name: string;
  email: string;
  content: string;
  answer: string | null;
}

// 문의 상세 응답 타입
export interface QuestionDetailResponse {
  success: boolean;
  response: QuestionDetailApiResponse;
  error: any;
}

// 문의 생성 요청 타입
export interface CreateQuestionRequest {
  subject: string;
  content: string;
  category: string;
  isPublic: boolean;
  password: string;
}

// 문의 생성 응답 타입
export interface CreateQuestionResponse {
  success: boolean;
  response: string;
  error: any;
}
