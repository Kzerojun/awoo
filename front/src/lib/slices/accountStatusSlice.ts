import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountStatusState {
  hasDepositAccount: boolean;
  hasSavingAccount: boolean;
}

const initialState: AccountStatusState = {
  hasDepositAccount: false,
  hasSavingAccount: false,
};

const accountStatusSlice = createSlice({
  name: "accountStatus",
  initialState,
  reducers: {
    setHasDepositAccount: (state, action: PayloadAction<boolean>) => {
      state.hasDepositAccount = action.payload;
    },
    setHasSavingAccount: (state, action: PayloadAction<boolean>) => {
      state.hasSavingAccount = action.payload;
    },
    resetAccountStatus: () => initialState,
  },
});

export const { setHasDepositAccount, setHasSavingAccount, resetAccountStatus } =
  accountStatusSlice.actions;

export default accountStatusSlice.reducer;
