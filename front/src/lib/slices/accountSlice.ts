import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ 계좌 개설 관련 상태 정의
interface AccountState {
  password: string; // 사용자가 입력한 계좌 비밀번호
  conditionsAgreement: boolean; // 약관 동의 여부
  isPhoneVerified: boolean; // 휴대폰 인증 완료 여부
}

// ✅ 초기 상태 설정
const initialState: AccountState = {
  password: "",
  conditionsAgreement: false,
  isPhoneVerified: false,
};

// ✅ Redux Slice 생성: account 관련 상태 관리
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // 👉 계좌 비밀번호 설정
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    // 👉 약관 동의 여부 설정
    setConditionsAgreement: (state, action: PayloadAction<boolean>) => {
      state.conditionsAgreement = action.payload;
    },
    // 👉 휴대폰 인증 여부 설정
    setPhoneVerified: (state, action: PayloadAction<boolean>) => {
      state.isPhoneVerified = action.payload;
    },
    // 👉 상태 초기화 (계좌 개설 완료 후 등에서 사용)
    resetAccountState: () => initialState,
  },
});
export const { setPassword, setConditionsAgreement, setPhoneVerified, resetAccountState } =
  accountSlice.actions;

export default accountSlice.reducer;
