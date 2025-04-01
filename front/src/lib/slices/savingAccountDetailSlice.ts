import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SavingAccountDetailState {
  selectedSavingId: number | null;
  selectedSavingAccountNo: string | null;
  selectedDepositAccountNo: string | null;
  clickedAccount: string;
}

const initialState: SavingAccountDetailState = {
  selectedSavingId: null,
  selectedSavingAccountNo: null,
  selectedDepositAccountNo: null,
  clickedAccount: "",
};

const savingAccountDetailSlice = createSlice({
  name: "savingAccountDetail",
  initialState,
  reducers: {
    setSelectedSavingId(state, action: PayloadAction<number>) {
      state.selectedSavingId = action.payload;
    },
    changeSelectedSavingAccountNo(state, action: PayloadAction<string>) {
      state.selectedSavingAccountNo = action.payload;
    },
    changeSelectedDepositAccountNo(state, action: PayloadAction<string>) {
      state.selectedDepositAccountNo = action.payload;
    },
    changeClickedAccount: (state, action: PayloadAction<string>) => {
      state.clickedAccount = action.payload;
    },
    resetSavingAccountDetailSlice(state) {
      state.selectedSavingId = null;
      state.selectedSavingAccountNo = null;
      state.selectedDepositAccountNo = null;
      state.clickedAccount = "";
    },
  },
});

export const {
  setSelectedSavingId,
  changeSelectedSavingAccountNo,
  changeSelectedDepositAccountNo,
  changeClickedAccount,
  resetSavingAccountDetailSlice,
} = savingAccountDetailSlice.actions;
export default savingAccountDetailSlice.reducer;
