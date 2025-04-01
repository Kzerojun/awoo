import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SavingAccountDetailState {
  selectedSavingId: number | null; // ✅ 변경
}

const initialState: SavingAccountDetailState = {
  selectedSavingId: null,
};

const savingAccountDetailSlice = createSlice({
  name: "savingAccountDetail",
  initialState,
  reducers: {
    setSelectedSavingId(state, action: PayloadAction<number>) {
      state.selectedSavingId = action.payload;
    },
    resetSelectedSavingId(state) {
      state.selectedSavingId = null;
    },
  },
});

export const { setSelectedSavingId, resetSelectedSavingId } = savingAccountDetailSlice.actions;
export default savingAccountDetailSlice.reducer;
