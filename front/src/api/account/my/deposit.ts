import axiosInstance from "@/api/axiosInstance";

// API 응답 형태
interface ApiResponse<T> {
  success: boolean;
  response: T;
  error: any;
}

// 비밀번호 일치 여부 확인
interface CheckPasswordPayload {
  accountNo: string;
  password: string;
}

// 내부계좌 응답
export interface DepositResponse {
  bankCode: string;
  bankName: string;
  userName: string;
  accountNo: string;
  accountName: string;
  accountTypeCode: string;
  accountTypeName: string;
  accountCreatedDate: string;
  accountExpiryDate: string;
  dailyTransferLimit: string;
  oneTimeTransferLimit: string;
  accountBalance: string;
  lastTransactionDate: string;
  currency: string;
}

// 거래내역 조회 (목록) payload
interface TransactionPayload {
  accountNo: string;
  startDate: string;
  endDate: string;
}

// 거래내역 목록 조회 응답
export interface TransactionResponse {
  transactionUniqueNo: string;
  transactionDate: string;
  transactionTime: string;
  transactionType: string;
  transactionTypeName: string;
  transactionAccountNo: string;
  transactionBalance: string;
  transactionAfterBalance: string;
  transactionSummary: string;
  transactionMemo: string;
}

// 계좌 이체 Payload
interface TransferPayload {
  depositAccountNo: string;
  depositTransactionSummary: string;
  transactionBalance: string;
  withdrawalAccountNo: string;
  withdrawalTransactionSummary: string;
}

// 계좌 이체 Response
export interface TransferResponse {
  transactionUniqueNo: string;
  accountNo: string;
  transactionDate: string;
  transactionType: string;
  transactionTypeName: string;
  transactionAccountNo: string;
}

// 거래 내역 메모 Payload
interface TransactionMemoPayload {
  accountNo: string;
  transactionUniqueNo: string;
  transactionMemo: string;
}

// 이체 한도 변경 Payload
interface ChangeLimitPayload {
  accountNo: string;
  oneTimeTransferLimit: Number;
  dailyTransferLimit: Number;
}

// 내부 계좌 해지 payload
interface DeleteDepositPayload {
  accountNo: string;
  refundAccountNo: string;
}

// 비밀번호 일치 여부 확인
export const checkPassword = async ({ accountNo, password }: CheckPasswordPayload) => {
  try {
    const res = await axiosInstance.post(
      `/accounts/password`,
      { accountNo, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("비밀번호 일치 여부 확인 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("비밀번호 일치 여부 확인 실패:", err);
    throw err;
  }
};

// 내부 계좌 목록 조회
export const getDepositAccountList = async (): Promise<DepositResponse[]> => {
  try {
    const res = await axiosInstance.get<ApiResponse<DepositResponse[]>>("/accounts");
    console.log("내부 계좌 목록 조회 성공:", res.data.response);
    return res.data.response;
  } catch (err) {
    console.error("내부 계좌 목록 조회 실패:", err);
    throw err;
  }
};

// 거래내역 목록 조회
export const getTransactionList = async ({
  accountNo,
  startDate,
  endDate,
}: TransactionPayload): Promise<TransactionResponse[]> => {
  try {
    const res = await axiosInstance.post<ApiResponse<TransactionResponse[]>>(
      `/accounts/transactions`,
      {
        accountNo,
        startDate,
        endDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("거래 내역 목록 조회 성공:", res.data.response);
    return res.data.response;
  } catch (err) {
    console.error("거래 내역 목록 조회 에러:", err);
    throw err;
  }
};

// 계좌 이체
export const accountTransfer = async ({
  depositAccountNo,
  depositTransactionSummary,
  transactionBalance,
  withdrawalAccountNo,
  withdrawalTransactionSummary,
}: TransferPayload): Promise<TransferResponse[]> => {
  try {
    const res = await axiosInstance.post<ApiResponse<TransferResponse[]>>(
      `/accounts/transfer`,
      {
        depositAccountNo,
        depositTransactionSummary,
        transactionBalance,
        withdrawalAccountNo,
        withdrawalTransactionSummary,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("계좌 이체 성공:", res.data.response);
    return res.data.response;
  } catch (err) {
    console.error("계좌 이체 실패:", err);
    throw err;
  }
};

// 거래 내역 메모
export const postTransactionMemo = async ({
  accountNo,
  transactionUniqueNo,
  transactionMemo,
}: TransactionMemoPayload) => {
  try {
    const res = await axiosInstance.post(
      `/accounts/memo`,
      {
        accountNo,
        transactionUniqueNo,
        transactionMemo,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("거래 메모 등록 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("거래 메모 등록 실패:", err);
    throw err;
  }
};

// 이체 한도 변경
export const changeDepositLimit = async ({
  accountNo,
  oneTimeTransferLimit,
  dailyTransferLimit,
}: ChangeLimitPayload) => {
  try {
    const res = await axiosInstance.post(
      `/accounts/change-limit`,
      { accountNo, oneTimeTransferLimit, dailyTransferLimit },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("이체 한도 변경 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("이체 한도 변경 실패:", err);
    throw err;
  }
};

// 내부 계좌 해지
export const deleteDeposit = async ({ accountNo, refundAccountNo }: DeleteDepositPayload) => {
  try {
    const res = await axiosInstance.delete(`/accounts`, { data: { accountNo, refundAccountNo } });
    console.log("내부 계좌 해지 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("내부 계좌 해지 실패:", err);
    throw err;
  }
};
