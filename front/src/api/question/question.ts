import axiosInstance from "../axiosInstance";

// 문의사항 등록 interface
interface CreateQuestionPayload {
  subject: string;
  content: string;
  category: string;
  isPublic: boolean; // true: 공개 || false: 비공개
  password: string; // 없으면 빈 문자열
}

// 문의사항 상세 조회 interface
interface GetQuestionDetailPayload {
  questionId: number;
  password: string; // 공개글이면 빈 문자열로 전달
}

// 문의사항 목록 조회 응답 interface (필요에 따라 조정)
interface QuestionListResponse {
  success: boolean;
  response: {
    map(
      arg0: (question: {
        questionId: any;
        subject: any;
        name: any;
        isPublic: any;
        isAnswer: any;
      }) => { id: any; title: any; author: any; date: string; isLocked: boolean; hasAnswer: any }
    ): unknown;
    questions: QuestionItem[];
    // 페이지네이션 정보 등이 있을 수 있음
  };
  error: any;
}

// 문의사항 상세 조회 응답 interface (필요에 따라 조정)
interface QuestionDetailResponse {
  success: boolean;
  response: QuestionDetail;
  error: any;
}

// 문의사항 목록 아이템 interface (API 응답에 맞게 조정 필요)
interface QuestionItem {
  id: number;
  subject: string;
  category: string;
  createdAt: string;
  isPublic: boolean;
  // 기타 필요한 필드
}

// 문의사항 상세 interface (API 응답에 맞게 조정 필요)
interface QuestionDetail {
  answer: any;
  name: string;
  id: number;
  subject: string;
  content: string;
  category: string;
  createdAt: string;
  isPublic: boolean;
  // 기타 필요한 필드
}

// 문의사항 등록
export const createQuestion = async (payload: CreateQuestionPayload) => {
  console.log("문의사항 등록 요청", payload);
  try {
    const res = await axiosInstance.post("/members/questions", payload);
    console.log("문의사항 등록 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("문의사항 등록 실패:", err);
    throw err;
  }
};

// 문의사항 목록 조회
export const getQuestionList = async (): Promise<QuestionListResponse> => {
  console.log("문의사항 목록 조회 요청");
  try {
    const res = await axiosInstance.get("/members/questions");
    console.log("문의사항 목록 조회 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("문의사항 목록 조회 실패:", err);
    throw err;
  }
};

// 문의사항 상세 조회
export const getQuestionDetail = async (
  payload: GetQuestionDetailPayload
): Promise<QuestionDetailResponse> => {
  console.log("문의사항 상세 조회 요청", payload);
  try {
    const res = await axiosInstance.post("/members/questions-detail", payload);
    console.log("문의사항 상세 조회 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("문의사항 상세 조회 실패:", err);
    throw err;
  }
};
