import axiosInstance from "../axiosInstance";

// 멍페이 핸드폰 인증 interface
interface PhoneAuthPayload {
  name: string;
  phone: string;
}

// 멍페이 핸드폰 인증번호 검증 interface
interface PhoneVerificationPayload {
  phone: string;
  authCode: string;
}

// 멍페이 등록/비밀번호 설정 interface
interface PaymentPasswordPayload {
  password: string;
}

// 멍페이 충전 interface
interface ChargePaymentPayload {
  amount: number;
}

// 멍페이 1원 송금 요청 interface
interface OneWonTransferPayload {
  accountNo: string;
}

// 멍페이 1원 송금 검증 interface
interface OneWonVerificationPayload {
  accountNo: string;
  authCode: string;
}

// 멍페이 계좌 조회 interface 수정
interface PaymentAccountsResponse {
  success?: boolean;
  response?: {
    accountNo: string;
    [key: string]: any; // 추가 필드가 있을 경우 대비
  };
  error?: any;
}

// 멍페이 비밀번호 검증 interface
interface VerifyPasswordPayload {
  password: string;
}

// 멍페이 핸드폰 인증 요청
export const requestPhoneAuth = async ({ name, phone }: PhoneAuthPayload) => {
  console.log("멍페이 핸드폰 인증 요청", { name, phone });
  try {
    const res = await axiosInstance.post("/payments/auth/phone-send", { name, phone });
    console.log("멍페이 핸드폰 인증 요청 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("멍페이 핸드폰 인증 요청 실패:", err);
    throw err;
  }
};

// 멍페이 핸드폰 인증번호 검증
export const verifyPhoneAuth = async ({ phone, authCode }: PhoneVerificationPayload) => {
  console.log("멍페이 핸드폰 인증번호 검증 요청", { phone, authCode });
  try {
    const res = await axiosInstance.post("/payments/auth/phone-verifications", { phone, authCode });
    console.log("멍페이 핸드폰 인증번호 검증 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("멍페이 핸드폰 인증번호 검증 실패:", err);
    throw err;
  }
};

// 멍페이 등록
export const registerPayment = async ({ password }: PaymentPasswordPayload) => {
  console.log("멍페이 등록 요청");
  try {
    const res = await axiosInstance.post("/payments/register", { password });
    console.log("멍페이 등록 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("멍페이 등록 실패:", err);
    throw err;
  }
};

// 멍페이 비밀번호 설정
export const setPaymentPassword = async ({ password }: PaymentPasswordPayload) => {
  console.log("멍페이 비밀번호 설정 요청");

  // 저장된 인증 토큰 가져오기
  const authToken = sessionStorage.getItem("phone_auth_token");

  if (!authToken) {
    console.error("인증 토큰이 없습니다. 인증을 먼저 완료해주세요.");
    throw new Error("인증 토큰이 없습니다");
  }

  try {
    // auth-token 헤더 추가
    const res = await axiosInstance.post(
      "/payments/register",
      { password },
      {
        headers: {
          "auth-token": authToken,
        },
      }
    );

    console.log("멍페이 비밀번호 설정 성공:", res.data);

    // 성공 후 인증 관련 세션 스토리지 정리
    sessionStorage.removeItem("phone_auth_token");
    sessionStorage.removeItem("phone_verified");
    sessionStorage.removeItem("verification_phone");

    return res.data;
  } catch (err) {
    console.error("멍페이 비밀번호 설정 실패:", err);
    throw err;
  }
};

// 멍페이 잔액 조회
export const getPaymentBalance = async (): Promise<{
  [x: string]: any;
  amount: number;
}> => {
  console.log("멍페이 잔액 조회 요청");

  // UUID v4 형식의 Idempotency-Key 생성
  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const idempotencyKey = generateUUID();

  try {
    // Idempotency-Key 헤더 추가 (UUID 형식)
    const res = await axiosInstance.get("/payments/balance", {
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
    });

    console.log("멍페이 잔액 조회 성공:", res.data);

    // API 응답 구조에 맞게 반환 형식 조정
    return {
      amount: res.data?.response?.amount || 0,
    };
  } catch (err) {
    console.error("멍페이 잔액 조회 실패:", err);
    // 오류 발생 시 기본값 반환
    return {
      amount: 0,
    };
  }
};

// 멍페이 충전
export const chargePayment = async (amount: number) => {
  console.log("멍페이 충전 요청", { amount });

  try {
    // 정확한 형식의 request body 구성
    const payload: ChargePaymentPayload = {
      amount: amount,
    };

    const res = await axiosInstance.post("/payments/charges", payload);
    console.log("멍페이 충전 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("멍페이 충전 실패:", err);
    throw err;
  }
};

// 멍페이 1원 송금 요청
export const requestOneWonTransfer = async ({ accountNo }: OneWonTransferPayload) => {
  console.log("멍페이 1원 송금 요청", { accountNo });
  try {
    const res = await axiosInstance.post("/payments/one-won", { accountNo });
    console.log("멍페이 1원 송금 요청 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("멍페이 1원 송금 요청 실패:", err);
    throw err;
  }
};

// 멍페이 1원 송금 검증
export const verifyOneWonTransfer = async ({ accountNo, authCode }: OneWonVerificationPayload) => {
  console.log("멍페이 1원 송금 검증 요청", { accountNo, authCode });
  try {
    const res = await axiosInstance.post("/payments/one-won/verifications", {
      accountNo,
      authCode,
    });
    console.log("멍페이 1원 송금 검증 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("멍페이 1원 송금 검증 실패:", err);
    throw err;
  }
};

// 멍페이 결제
export const makePayment = async (data: any) => {
  console.log("멍페이 결제 요청", data);
  try {
    const res = await axiosInstance.post("/payments", data);
    console.log("멍페이 결제 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("멍페이 결제 실패:", err);
    throw err;
  }
};

// 멍페이 비밀번호 재설정
export const resetPaymentPassword = async (data: any) => {
  console.log("멍페이 비밀번호 재설정 요청");
  try {
    const res = await axiosInstance.patch("/payments/password", data);
    console.log("멍페이 비밀번호 재설정 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("멍페이 비밀번호 재설정 실패:", err);
    throw err;
  }
};

// 멍페이 계좌 조회 (연결된 계좌 정보 가져오기)
export const getPaymentAccounts = async (): Promise<PaymentAccountsResponse> => {
  console.log("멍페이 계좌 조회 요청");
  try {
    const res = await axiosInstance.get("/payments/accounts");
    console.log("멍페이 계좌 조회 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("멍페이 계좌 조회 실패:", err);
    return { success: false, response: { accountNo: "" }, error: err };
  }
};

// 멍페이 비밀번호 검증
export const verifyPaymentPassword = async ({
  password,
}: VerifyPasswordPayload): Promise<boolean> => {
  console.log("멍페이 비밀번호 검증 요청");
  try {
    const res = await axiosInstance.post("/payments/auth/password-verifications", { password });
    console.log("멍페이 비밀번호 검증 성공:", res.data);

    // API 응답 구조에 맞게 처리
    if (res.data && res.data.success && res.data.response) {
      return res.data.response.isPasswordMatched === true;
    }
    return false;
  } catch (err) {
    console.error("멍페이 비밀번호 검증 실패:", err);
    return false;
  }
};
