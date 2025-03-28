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

// 멍페이 1원 송금 요청 interface
interface OneWonTransferPayload {
  accountNo: string;
}

// 멍페이 1원 송금 검증 interface
interface OneWonVerificationPayload {
  accountNo: string;
  authCode: string;
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
  try {
    const res = await axiosInstance.post("/payments/password", { password });
    console.log("멍페이 비밀번호 설정 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("멍페이 비밀번호 설정 실패:", err);
    throw err;
  }
};

// 멍페이 잔액 조회
export const getPaymentBalance = async () => {
  console.log("멍페이 잔액 조회 요청");
  try {
    const res = await axiosInstance.get("/payments/balance");
    console.log("멍페이 잔액 조회 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("멍페이 잔액 조회 실패:", err);
    throw err;
  }
};

// 멍페이 충전
export const chargePayment = async (amount: number) => {
  console.log("멍페이 충전 요청", { amount });
  try {
    const res = await axiosInstance.post("/payments/charges", {});
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
