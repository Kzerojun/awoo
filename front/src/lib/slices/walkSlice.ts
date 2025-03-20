import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalkState {
  startTime: string | null;
  endTime: string | null;
  totalTime: string | null;
  distance: number | null;
  photo?: string | null;
}

const initialState: WalkState = {
  startTime: null,
  endTime: null,
  totalTime: null,
  distance: null,
  photo: null,
};

const walkSlice = createSlice({
  name: "walk",
  initialState,
  reducers: {
    setWalkData: (state, action: PayloadAction<Partial<WalkState>>) => {
      return { ...state, ...action.payload };
    },
    clearWalkData: () => initialState,
  },
});

export const { setWalkData, clearWalkData } = walkSlice.actions;
export default walkSlice.reducer;
