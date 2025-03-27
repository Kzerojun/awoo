import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  password: string;
  conditionsAgreement: boolean;
  isPhoneVerified: boolean;
  isAccountVerified: boolean;
}

const initialState: AccountState = {
  password: "",
  conditionsAgreement: false,
  isPhoneVerified: false,
  isAccountVerified: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConditionsAgreement: (state, action: PayloadAction<boolean>) => {
      state.conditionsAgreement = action.payload;
    },
    setPhoneVerified: (state, action: PayloadAction<boolean>) => {
      state.isPhoneVerified = action.payload;
    },
    setAccountVerified: (state, action: PayloadAction<boolean>) => {
      state.isAccountVerified = action.payload;
    },
    resetAccountState: () => initialState,
  },
});
export const {
  setPassword,
  setConditionsAgreement,
  setPhoneVerified,
  setAccountVerified,
  resetAccountState,
} = accountSlice.actions;

export default accountSlice.reducer;
