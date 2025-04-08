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

// 신고 관련 인터페이스
export interface Report {
  reportId: number;
  reporterName: string;
  reporterEmail: string;
  reportedUserName: string;
  reportedUserEmail: string;
  usedProductId: number;
  reportedAt: string;
  reason: string;
  process: string;
  reportCount: number;
}

interface ReportListResponse {
  success: boolean;
  response: Report[];
  error: null | string;
}

interface ReportDetailResponse {
  success: boolean;
  response: Report;
  error: null | string;
}

interface ReportProcessRequest {
  reportId: number;
  process: string; // 'P' | 'W' | 'O'
}

interface ReportProcessResponse {
  success: boolean;
  response: string;
  error: null | string;
}

// 유저 계좌 정보 interface
export interface UserAccount {
  memberName: string;
  email: string;
  nickname: string;
  memberCreatedAt: string;
  bankCode: string; // 999: 싸피은행(awoo)
  accountNo: string;
  accountType: string; // INTERNAL: 내부계좌 | SAVING: 적금
  accountCreatedAt: string;
  isDelete: boolean; // 해지여부, true: 해지 | false: 사용중
  petName: string | null; // 없으면 null
}

// 페이지네이션 관련 인터페이스
export interface PageInfo {
  pageNumber: number;
  pageSize: number;
  sort: any[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PageResponse<T> {
  content: T[];
  pageable: PageInfo;
  totalElements: number;
  last: boolean;
  totalPages: number;
  size: number;
  number: number;
  sort: any[];
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface UserAccountResponse {
  success: boolean;
  response: PageResponse<UserAccount>;
  error: null | string;
}

// 페이지네이션 파라미터 인터페이스
export interface PaginationParams {
  page?: number;
  size?: number;
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
  const response = await axiosInstance.post("/admin/questions/answer", answerData);
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

// 신고 목록 조회
export const getReportList = async (): Promise<ReportListResponse> => {
  const response = await axiosInstance.get("/admin/reports");
  return response.data;
};

// 신고 상세 조회
export const getReportDetail = async (reportId: number): Promise<ReportDetailResponse> => {
  const response = await axiosInstance.get(`/admin/reports/${reportId}`);
  return response.data;
};

// 신고 처리
export const processReport = async (data: ReportProcessRequest): Promise<ReportProcessResponse> => {
  const response = await axiosInstance.patch("/admin/reports", data);
  return response.data;
};

// 유저 내부 계좌 목록 조회
export const getUserAccount = async (params?: PaginationParams): Promise<UserAccountResponse> => {
  const { page = 0, size = 10 } = params || {};
  const response = await axiosInstance.get("/admin/accounts", {
    params: { page, size },
  });
  return response.data;
};
