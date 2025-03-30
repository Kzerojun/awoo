import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PetInterface } from "./petSlice";
interface WalkState {
  startTime: string | null;
  endTime: string | null;
  totalTime: string | null;
  distance: number | null;
  currentWalkingDog: PetInterface | null;
  photo?: string | null;
}

const initialState: WalkState = {
  startTime: null,
  endTime: null,
  totalTime: null,
  distance: null,
  currentWalkingDog: null,
  photo: null,
};

const walkSlice = createSlice({
  name: "walk",
  initialState,
  reducers: {
    setWalkData: (state, action: PayloadAction<Partial<WalkState>>) => {
      return { ...state, ...action.payload };
    },
    updateCurrentWalkingDog: (state, action: PayloadAction<PetInterface>) => {
      state.currentWalkingDog = action.payload;
    },
    clearWalkData: () => initialState,
  },
});

export const { setWalkData, clearWalkData, updateCurrentWalkingDog } = walkSlice.actions;
export default walkSlice.reducer;
