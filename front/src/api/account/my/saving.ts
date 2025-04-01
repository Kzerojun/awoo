import axiosInstance from "@/api/axiosInstance";

// API 응답 형태
interface ApiResponse<T> {
  success: boolean;
  response: T;
  error: any;
}

// 적금 응답
export interface SavingResponse {
  bankCode: string;
  bankName: string;
  userName: string;
  accountNo: string;
  accountName: string;
  accountDescription: string;
  withdrawalBankCode: string;
  withdrawalBankName: string;
  withdrawalAccountNo: string;
  subscriptionPeriod: string;
  depositBalance: string;
  interestRate: string;
  installmentNumber: string;
  totalBalance: string;
  accountCreateDate: string;
  accountExpiryDate: string;
  petId: number;
}

// 적금 단건 조회시 Payload
interface GetSavingPayload {
  savingId: string;
}

// 적금 납입 회차 조회시, 만기이자 조회시, 중도해지 이자 조회시 Payload
interface AccountNoPayload {
  accountNo: string;
}

// 적금 납입 회차 조회시 paymentInfo
export interface PaymentInfoResponse {
  depositInstallment: string;
  paymentBalance: string;
  paymentDate: string;
  paymentTime: string;
  status: string;
  failureReason: string;
}

// 적금 납입 내역 조회 시 Response
export interface InquirePaymentResponse {
  bankCode: string;
  bankName: string;
  accountNo: string;
  accountName: string;
  interestRate: string;
  depositBalance: string;
  totalBalance: string;
  accountCreateDate: string;
  accountExpiryDate: string;
  paymentInfo: PaymentInfoResponse[];
}

// 적금 만기 이자 조회 시 Response
export interface SavingTermination {
  bankCode: string;
  bankName: string;
  accountNo: string;
  accountName: string;
  interestRate: string;
  accountCreateDate: string;
  accountExpiryDate: string;
  expiryBalance: string;
  expiryInterest: string;
  expiryTotalBalance: string;
}

// 적금 중도 해지 시 만기 이자 조회 Response
export interface EarlySavingTermination {
  bankCode: string;
  bankName: string;
  accountNo: string;
  accountName: string;
  interestRate: string;
  accountCreateDate: string;
  earlyTerminationDate: string;
  totalBalance: string;
  earlyTerminationInterest: string;
  earlyTerminationBalance: string;
}

// 적금 목록 조회
export const getSavingAccountList = async (): Promise<SavingResponse[]> => {
  try {
    const res = await axiosInstance.get<ApiResponse<SavingResponse[]>>(`/savings`);
    console.log("적금 목록 조회 성공:", res.data);
    return res.data.response;
  } catch (err) {
    console.error("적금 목록 조회 실패:", err);
    throw err;
  }
};

// 적금 계좌 조회 (단건)
export const getSavingAccount = async ({ savingId }: GetSavingPayload): Promise<SavingResponse> => {
  try {
    const res = await axiosInstance.get<ApiResponse<SavingResponse>>(
      `/savings?savingId=${savingId}`
    );
    console.log("적금 계좌 단건 조회 성공:", res.data);
    return res.data.response;
  } catch (err) {
    console.error("적금 계좌 단건 조회 실패:", err);
    throw err;
  }
};

// 적금 납입 회차 조회 (납입 내역 조회)
export const getSavingInquirePayment = async ({
  accountNo,
}: AccountNoPayload): Promise<InquirePaymentResponse> => {
  try {
    const res = await axiosInstance.post<ApiResponse<InquirePaymentResponse>>(
      `/savings/inquirePayment`,
      { accountNo },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("적금 납입 회차 조회 성공:", res.data);
    return res.data.response;
  } catch (err) {
    console.error("적금 납입 회차 조회 실패:", err);
    throw err;
  }
};

// 적금 만기 이자 조회
export const getSavingTerminationInterest = async ({
  accountNo,
}: AccountNoPayload): Promise<SavingTermination> => {
  try {
    const res = await axiosInstance.post<ApiResponse<SavingTermination>>(
      `/savings/termination`,
      { accountNo },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("적금 만기 이자 조회 성공:", res.data);
    return res.data.response;
  } catch (err) {
    console.error("적금 만기 이자 조회 실패:", err);
    throw err;
  }
};

// 적금 중도 해지 이자 조회
export const getSavingEarlyTerminationInterest = async ({
  accountNo,
}: AccountNoPayload): Promise<EarlySavingTermination> => {
  try {
    const res = await axiosInstance.post<ApiResponse<EarlySavingTermination>>(
      `/savings/termination-early`,
      { accountNo },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("적금 중도 해지 이자 조회 성공:", res.data);
    return res.data.response;
  } catch (err) {
    console.error("적금 중도 해지 이자 조회 실패:", err);
    throw err;
  }
};

// 적금 계좌 해지
export const deleteSavingAccount = async ({ accountNo }: AccountNoPayload) => {
  try {
    const res = await axiosInstance.delete(`/savings`, { data: accountNo });
    console.log("적금 계좌 해지 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("적금 계좌 해지 실패:", err);
    throw err;
  }
};
