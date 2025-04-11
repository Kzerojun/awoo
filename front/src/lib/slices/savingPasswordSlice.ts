import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SavingPasswordState {
  password: string;
  confirmPassword: string;
  activeField: "password" | "confirmPassword" | null;
}

const initialState: SavingPasswordState = {
  password: "",
  confirmPassword: "",
  activeField: null,
};

const savingPasswordSlice = createSlice({
  name: "savingPassword",
  initialState,
  reducers: {
    setActiveField: (state, action: PayloadAction<"password" | "confirmPassword" | null>) => {
      state.activeField = action.payload;
    },
    appendDigit: (state, action: PayloadAction<string>) => {
      if (!state.activeField) return;
      const target = state[state.activeField];
      if (target.length < 4) {
        state[state.activeField] += action.payload;
      }
    },
    deleteLastDigit: (state) => {
      if (!state.activeField) return;
      state[state.activeField] = state[state.activeField].slice(0, -1);
    },
    resetSavingPasswordState: () => initialState,
  },
});

export const { setActiveField, appendDigit, deleteLastDigit, resetSavingPasswordState } =
  savingPasswordSlice.actions;

export default savingPasswordSlice.reducer;
