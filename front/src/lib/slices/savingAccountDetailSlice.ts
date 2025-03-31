import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SavingAccountDetailState {
  selectedSavingAccountNo: string | null; // 선택된 적금 계좌번호
}

const initialState: SavingAccountDetailState = {
  selectedSavingAccountNo: null,
};

const savingAccountDetailSlice = createSlice({
  name: "savingAccountDetail",
  initialState,
  reducers: {
    setSelectedSavingAccountNo(state, action: PayloadAction<string>) {
      state.selectedSavingAccountNo = action.payload;
    },
    resetSelectedSavingAccountNo(state) {
      state.selectedSavingAccountNo = null;
    },
  },
});

export const { setSelectedSavingAccountNo, resetSelectedSavingAccountNo } =
  savingAccountDetailSlice.actions;
export default savingAccountDetailSlice.reducer;
