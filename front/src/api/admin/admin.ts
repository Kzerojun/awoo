import axiosInstance from "../axiosInstance";

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
  const response = await axiosInstance.post("/api/admin/login", credentials);
  return response.data;
};

// 문의 사항 답변
export const answerQuestion = async (
  answerData: AnswerQuestionRequest
): Promise<AnswerQuestionResponse> => {
  const response = await axiosInstance.post("/api/admin/question", answerData);
  return response.data;
};

// 문의 사항 전체 조회
export const getQuestionList = async (): Promise<QuestionListResponse> => {
  const response = await axiosInstance.get("/api/admin/questions");
  return response.data;
};

// 문의 사항 상세 조회
export const getQuestionDetail = async (questionId: number): Promise<QuestionDetailResponse> => {
  const response = await axiosInstance.get(`/api/admin/questions/${questionId}`);
  return response.data;
};
