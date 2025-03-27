import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  requestPhoneAuth,
  verifyPhoneAuth,
  registerPayment,
  getPaymentBalance,
  requestOneWonTransfer,
  verifyOneWonTransfer,
} from "@/api/payment/payment";

// 멍페이 상태 타입 정의
interface PaymentState {
  // 멍페이 등록 상태
  isRegistered: boolean;

  // 계좌 연동 상태
  isAccountLinked: boolean;
  accountNo: string | null;

  // 잔액 정보
  balance: number;

  // 핸드폰 인증 상태
  phoneVerification: {
    isVerifying: boolean;
    isVerified: boolean;
    phone: string | null;
    error: string | null;
  };

  // 1원 인증 상태
  oneWonVerification: {
    isVerifying: boolean;
    isVerified: boolean;
    error: string | null;
  };

  // 로딩 및 에러 상태
  loading: boolean;
  error: string | null;
}

// 초기 상태
const initialState: PaymentState = {
  isRegistered: false,
  isAccountLinked: false,
  accountNo: null,
  balance: 0,
  phoneVerification: {
    isVerifying: false,
    isVerified: false,
    phone: null,
    error: null,
  },
  oneWonVerification: {
    isVerifying: false,
    isVerified: false,
    error: null,
  },
  loading: false,
  error: null,
};

// 비동기 액션 정의
export const fetchPaymentBalance = createAsyncThunk(
  "payment/fetchBalance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPaymentBalance();
      return response;
    } catch (err) {
      return rejectWithValue("잔액 조회에 실패했습니다.");
    }
  }
);

export const sendPhoneVerification = createAsyncThunk(
  "payment/sendPhoneVerification",
  async (data: { name: string; phone: string }, { rejectWithValue }) => {
    try {
      const response = await requestPhoneAuth(data);
      return { phone: data.phone, ...response };
    } catch (err) {
      return rejectWithValue("인증번호 발송에 실패했습니다.");
    }
  }
);

export const confirmPhoneVerification = createAsyncThunk(
  "payment/confirmPhoneVerification",
  async (data: { phone: string; authCode: string }, { rejectWithValue }) => {
    try {
      const response = await verifyPhoneAuth(data);
      return response;
    } catch (err) {
      return rejectWithValue("인증번호 확인에 실패했습니다.");
    }
  }
);

export const registerPaymentAccount = createAsyncThunk(
  "payment/register",
  async (data: { password: string }, { rejectWithValue }) => {
    try {
      const response = await registerPayment(data);
      return response;
    } catch (err) {
      return rejectWithValue("멍페이 등록에 실패했습니다.");
    }
  }
);

export const requestAccountVerification = createAsyncThunk(
  "payment/requestAccountVerification",
  async (data: { accountNo: string }, { rejectWithValue }) => {
    try {
      await requestOneWonTransfer(data);
      return { accountNo: data.accountNo };
    } catch (err) {
      return rejectWithValue("1원 송금 요청에 실패했습니다.");
    }
  }
);

export const confirmAccountVerification = createAsyncThunk(
  "payment/confirmAccountVerification",
  async (data: { accountNo: string; authCode: string }, { rejectWithValue }) => {
    try {
      const response = await verifyOneWonTransfer(data);
      return response;
    } catch (err) {
      return rejectWithValue("계좌 인증에 실패했습니다.");
    }
  }
);

// 슬라이스 생성
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPhoneVerification: (state) => {
      state.phoneVerification = initialState.phoneVerification;
    },
    resetOneWonVerification: (state) => {
      state.oneWonVerification = initialState.oneWonVerification;
    },
    resetPaymentState: () => initialState,
  },
  extraReducers: (builder) => {
    // 잔액 조회
    builder
      .addCase(fetchPaymentBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.amount;
        state.isRegistered = true; // 잔액 조회가 성공하면 등록된 것으로 간주
      })
      .addCase(fetchPaymentBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 핸드폰 인증 요청
    builder
      .addCase(sendPhoneVerification.pending, (state) => {
        state.phoneVerification.isVerifying = true;
        state.phoneVerification.error = null;
      })
      .addCase(sendPhoneVerification.fulfilled, (state, action) => {
        state.phoneVerification.isVerifying = false;
        state.phoneVerification.phone = action.payload.phone;
      })
      .addCase(sendPhoneVerification.rejected, (state, action) => {
        state.phoneVerification.isVerifying = false;
        state.phoneVerification.error = action.payload as string;
      });

    // 핸드폰 인증번호 확인
    builder
      .addCase(confirmPhoneVerification.pending, (state) => {
        state.phoneVerification.isVerifying = true;
        state.phoneVerification.error = null;
      })
      .addCase(confirmPhoneVerification.fulfilled, (state) => {
        state.phoneVerification.isVerifying = false;
        state.phoneVerification.isVerified = true;
      })
      .addCase(confirmPhoneVerification.rejected, (state, action) => {
        state.phoneVerification.isVerifying = false;
        state.phoneVerification.error = action.payload as string;
      });

    // 멍페이 등록
    builder
      .addCase(registerPaymentAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerPaymentAccount.fulfilled, (state) => {
        state.loading = false;
        state.isRegistered = true;
      })
      .addCase(registerPaymentAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 계좌 인증 요청 (1원 송금)
    builder
      .addCase(requestAccountVerification.pending, (state) => {
        state.oneWonVerification.isVerifying = true;
        state.oneWonVerification.error = null;
      })
      .addCase(requestAccountVerification.fulfilled, (state, action) => {
        state.oneWonVerification.isVerifying = false;
        state.accountNo = action.payload.accountNo;
      })
      .addCase(requestAccountVerification.rejected, (state, action) => {
        state.oneWonVerification.isVerifying = false;
        state.oneWonVerification.error = action.payload as string;
      });

    // 계좌 인증 확인
    builder
      .addCase(confirmAccountVerification.pending, (state) => {
        state.oneWonVerification.isVerifying = true;
        state.oneWonVerification.error = null;
      })
      .addCase(confirmAccountVerification.fulfilled, (state) => {
        state.oneWonVerification.isVerifying = false;
        state.oneWonVerification.isVerified = true;
        state.isAccountLinked = true;
      })
      .addCase(confirmAccountVerification.rejected, (state, action) => {
        state.oneWonVerification.isVerifying = false;
        state.oneWonVerification.error = action.payload as string;
      });
  },
});

export const { resetPhoneVerification, resetOneWonVerification, resetPaymentState } =
  paymentSlice.actions;
export default paymentSlice.reducer;
