import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DepositResponse } from "@/api/account/my/deposit";

interface DepositState {
  deposit: DepositResponse | null;
}

const initialState: DepositState = {
  deposit: null,
};

const myDepositSlice = createSlice({
  name: "myDeposit",
  initialState,
  reducers: {
    getMyDeposit: (state, action: PayloadAction<DepositResponse>) => {
      state.deposit = action.payload;
    },
  },
});

export const { getMyDeposit } = myDepositSlice.actions;
export default myDepositSlice.reducer;
