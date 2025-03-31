import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SavingState {
  accountTypeUniqueNo: string; // 적금 고유번호
  depositBalance: number; // 가입 금액
  withdrawalAccountNo: string; // 출금 계좌 번호
  withdrawalBankName: string; // 출금 계좌 은행명
  withdrawalAccountName: string; // 출금 계좌 이름
  conditionsAgreement: boolean; // 동의 여부
  password: string; // 비밀번호
  savingStage: number; // 1|2|3 단계 구분
  petId: number;
}

const initialState: SavingState = {
  accountTypeUniqueNo: "",
  depositBalance: 0,
  withdrawalAccountNo: "",
  conditionsAgreement: false,
  password: "",
  withdrawalAccountName: "",
  withdrawalBankName: "",
  savingStage: 0,
  petId: 0,
};

const savingSlice = createSlice({
  name: "saving",
  initialState,
  reducers: {
    setDepositBalance(state, action: PayloadAction<number>) {
      state.depositBalance = action.payload;
    },
    setWithdrawalAccountNo(state, action: PayloadAction<string>) {
      state.withdrawalAccountNo = action.payload;
    },
    setConditionsAgreement(state, action: PayloadAction<boolean>) {
      state.conditionsAgreement = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    resetSaving(state) {
      Object.assign(state, initialState);
    },
    setLinkedAccount(
      state,
      action: PayloadAction<{ accountNo: string; bankName: string; accountName: string }>
    ) {
      state.withdrawalAccountNo = action.payload.accountNo;
      state.withdrawalBankName = action.payload.bankName;
      state.withdrawalAccountName = action.payload.accountName;
    },
    setSavingStage(state, action: PayloadAction<number>) {
      state.savingStage = action.payload;
    },
    setAccountTypeUniqueNo(state, action: PayloadAction<string>) {
      state.accountTypeUniqueNo = action.payload;
    },
    setPetId(state, action: PayloadAction<number>) {
      state.petId = action.payload;
    },
  },
});

export const {
  setDepositBalance,
  setWithdrawalAccountNo,
  setConditionsAgreement,
  setPassword,
  setLinkedAccount,
  resetSaving,
  setAccountTypeUniqueNo,
  setSavingStage,
  setPetId,
} = savingSlice.actions;

export default savingSlice.reducer;
