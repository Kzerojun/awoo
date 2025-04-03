import { productData } from "@/app/admin/saveProduct/data/mockData";
import axiosInstance from "../axiosInstance";

// 적금 상품 인터페이스
export interface SavingsProduct {
  accountTypeUniqueNo: string;
  bankCode: string;
  bankName: string;
  accountTypeCode: string;
  accountTypeName: string;
  accountName: string;
  accountDescription: string;
  subscriptionPeriod: string;
  minSubscriptionBalance: number;
  maxSubscriptionBalance: number;
  interestRate: number;
  rateDescription: string;
}

// 적금 상품 등록 요청 인터페이스
export interface SavingsProductRequest {
  bankCode: string;
  accountName: string;
  accountDescription: string;
  subscriptionPeriod: string;
  minSubscriptionBalance: number;
  maxSubscriptionBalance: number;
  interestRate: number;
  rateDescription: string;
}

interface SavingsProductsResponse {
  success: boolean;
  response: SavingsProduct[];
  error: null | string;
}

interface CreateSavingsProductResponse {
  success: boolean;
  response: string;
  error: null | string;
}

// admin 로그인 interface
interface AdminLoginRequest {
  adminId: string;
  adminPassword: string;
}

interface AdminLoginResponse {
  success: boolean;
  response: "S" | "M"; // S or M response
  error: null | string;
}

// 문의 사항 답변 interface
interface AnswerQuestionRequest {
  questionId: number;
  answer: string;
}

interface AnswerQuestionResponse {
  success: boolean;
  response: string;
  error: null | string;
}

// 문의 사항 전체 조회 interface
interface QuestionListItem {
  questionId: number;
  name: string;
  email: string;
  subject: string;
  createdAt: string;
  isAnswer: boolean;
}

interface QuestionListResponse {
  success: boolean;
  response: QuestionListItem[];
  error: null | string;
}

// 문의 사항 상세 조회 interface
interface QuestionDetailResponse {
  success: boolean;
  response: {
    subject: string;
    name: string;
    content: string;
    answer: string;
  };
  error: null | string;
}

// admin 로그인
export const adminLogin = async (credentials: AdminLoginRequest): Promise<AdminLoginResponse> => {
  const response = await axiosInstance.post("/admin/login", credentials);
  return response.data;
};

// 문의 사항 답변
export const answerQuestion = async (
  answerData: AnswerQuestionRequest
): Promise<AnswerQuestionResponse> => {
  const response = await axiosInstance.post("/admin/answer", answerData);
  return response.data;
};

// 문의 사항 전체 조회
export const getQuestionList = async (): Promise<QuestionListResponse> => {
  const response = await axiosInstance.get("/admin/questions");
  return response.data;
};

// 문의 사항 상세 조회
export const getQuestionDetail = async (questionId: number): Promise<QuestionDetailResponse> => {
  const response = await axiosInstance.get(`/admin/questions/${questionId}`);
  return response.data;
};

// 적금 상품 전체 조회
export const getSavingsProducts = async (): Promise<SavingsProductsResponse> => {
  const response = await axiosInstance.get("/admin/savings");
  return response.data;
};

// 적금 상품 등록
export const createSavingsProduct = async (
  formData: SavingsProductRequest
): Promise<CreateSavingsProductResponse> => {
  const response = await axiosInstance.post("/admin/savings", formData);
  return response.data;
};
