import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  email: string;
  password: string;
  name: string;
  birthDate: string;
  gender: "F" | "M";
  phone: string;
  privacyAgreed: boolean;
  nickname: string;
}

const initialState: RegisterState = {
  email: "",
  password: "",
  name: "",
  birthDate: "",
  gender: "F",
  phone: "",
  privacyAgreed: false,
  nickname: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterData: (state, action: PayloadAction<Partial<RegisterState>>) => {
      return { ...state, ...action.payload };
    },
    clearRegisterData: () => initialState,
  },
});

export const { setRegisterData, clearRegisterData } = registerSlice.actions;
export default registerSlice.reducer;
