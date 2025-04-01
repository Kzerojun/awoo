import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountProgressState {
  accountType: "deposit" | "saving" | null;
  savingStage: 1 | 2 | 3 | null;
}

const initialState: AccountProgressState = {
  accountType: null,
  savingStage: null,
};

const accountProgressSlice = createSlice({
  name: "accountProgress",
  initialState,
  reducers: {
    setAccountType: (state, action: PayloadAction<"deposit" | "saving">) => {
      state.accountType = action.payload;
      // 자동으로 초기화만
      if (action.payload === "deposit") {
        state.savingStage = null;
      }
    },
    setSavingStage: (state, action: PayloadAction<1 | 2 | 3>) => {
      state.savingStage = action.payload;
    },
    resetAccountProgress: () => initialState,
  },
});

export const { setAccountType, setSavingStage, resetAccountProgress } =
  accountProgressSlice.actions;
export default accountProgressSlice.reducer;
