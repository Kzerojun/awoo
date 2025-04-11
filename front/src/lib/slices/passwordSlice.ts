import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 비밀번호 상태 타입 정의
interface PasswordState {
  password: string; // 비밀번호 만들기 입력값
  confirmPassword: string; // 비밀번호 확인 입력값
  activeField: "password" | "confirm" | null; // 현재 입력 대상 필드
}

// 초기 상태
const initialState: PasswordState = {
  password: "",
  confirmPassword: "",
  activeField: null,
};

// Redux slice 생성
const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    // 현재 입력 중인 필드를 변경
    setActiveField: (state, action: PayloadAction<"password" | "confirm" | null>) => {
      state.activeField = action.payload;
    },

    // 숫자 키패드 입력 처리 (최대 4자리까지 입력)
    appendDigit: (state, action: PayloadAction<string>) => {
      if (state.activeField === "password" && state.password.length < 4) {
        state.password += action.payload;
      } else if (state.activeField === "confirm" && state.confirmPassword.length < 4) {
        state.confirmPassword += action.payload;
      }
    },

    // 입력값에서 마지막 숫자 제거
    deleteLastDigit: (state) => {
      if (state.activeField === "password") {
        state.password = state.password.slice(0, -1);
      } else {
        state.confirmPassword = state.confirmPassword.slice(0, -1);
      }
    },

    // 모든 입력값 초기화
    resetPassword: (state) => {
      state.password = "";
      state.confirmPassword = "";
      state.activeField = "password";
    },
  },
});

export const { setActiveField, appendDigit, deleteLastDigit, resetPassword } =
  passwordSlice.actions;

export default passwordSlice.reducer;
