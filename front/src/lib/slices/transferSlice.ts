import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DepositResponse } from "@/api/account/my/deposit";

interface TransferState {
  depositAccountNo: string;
  depositTransactionSummary: string;
  transactionBalance: number;
  withdrawalAccountNo: string;
  withdrawalTransactionSummary: string;
  transactionMemo: string;
  transactionUniqueNo: string;
  transferStep: number;
  myDeposit?: DepositResponse;
}

const initialState: TransferState = {
  depositAccountNo: "",
  depositTransactionSummary: "",
  transactionBalance: 0,
  withdrawalAccountNo: "",
  withdrawalTransactionSummary: "",
  transactionMemo: "",
  transactionUniqueNo: "",
  transferStep: 1,
};

const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    changeTransferData: (state, action: PayloadAction<Partial<TransferState>>) => {
      return { ...state, ...action.payload };
    },
    clearTransferData: () => initialState,
  },
});

export const { changeTransferData, clearTransferData } = transferSlice.actions;
export default transferSlice.reducer;
