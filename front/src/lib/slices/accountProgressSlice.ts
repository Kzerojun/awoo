import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountProgressState {
  accountType: "deposit" | "saving" | null; // 입출금 | 적금 | 미선택
  savingStage: 1 | 2 | 3 | null; // 적금일 때만 사용
}

const initialState: AccountProgressState = {
  accountType: null,
  savingStage: null,
};

const accountProgressSlice = createSlice({
  name: "accountProgress",
  initialState,
  reducers: {
    // 가입 타입 선택 (입출금 or 적금)
    setAccountType: (state, action: PayloadAction<"deposit" | "saving">) => {
      state.accountType = action.payload;
      if (action.payload === "deposit") {
        state.savingStage = null; // 입출금이면 스테이지는 null
      }
    },
    // 적금 스테이지 설정
    setSavingStage: (state, action: PayloadAction<1 | 2 | 3>) => {
      if (state.accountType === "saving") {
        state.savingStage = action.payload;
      }
    },
    // 초기화
    resetAccountProgress: () => initialState,
  },
});

export const { setAccountType, setSavingStage, resetAccountProgress } =
  accountProgressSlice.actions;
export default accountProgressSlice.reducer;
