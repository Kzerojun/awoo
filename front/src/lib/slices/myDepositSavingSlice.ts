import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DepositResponse } from "@/api/account/my/deposit";
import { SavingResponse } from "@/api/account/my/saving";

interface DepositState {
  deposit: DepositResponse | null;
  saving: SavingResponse | null;
}

const initialState: DepositState = {
  deposit: null,
  saving: null,
};

const myDepositSavingSlice = createSlice({
  name: "myDepositSaving",
  initialState,
  reducers: {
    getMyDeposit: (state, action: PayloadAction<DepositResponse>) => {
      state.deposit = action.payload;
    },
    getMySaving: (state, action: PayloadAction<SavingResponse>) => {
      state.saving = action.payload;
    },
  },
});

export const { getMyDeposit, getMySaving } = myDepositSavingSlice.actions;
export default myDepositSavingSlice.reducer;
