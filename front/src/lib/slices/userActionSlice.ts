import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PetInterface } from "./petSlice";

// 스택 구조를 기반으로 한 뒤로가기 구현
interface UserActionState {
  historyStack: string[];
  currentWalkingSelectView: number;
  currentMyPetView: number;
  // currentWalkingDog: PetInterface | null;
  isGoingBack: boolean;
}

const initialState: UserActionState = {
  historyStack: [],
  currentWalkingSelectView: 0,
  currentMyPetView: 0,
  // currentWalkingDog: null,
  isGoingBack: false,
};

const userActionSlice = createSlice({
  name: "userAction",
  initialState,
  reducers: {
    pushPath: (state, action: PayloadAction<string>) => {
      if (!state.isGoingBack) {
        state.historyStack.push(action.payload);
      }
    },
    popPath: (state) => {
      state.historyStack.pop();
    },
    clearHistory: (state) => {
      state.historyStack = [];
    },
    changeMyPetView: (state, action: PayloadAction<number>) => {
      state.currentMyPetView = action.payload;
    },
    changeWalkingSelectView: (state, action: PayloadAction<number>) => {
      state.currentWalkingSelectView = action.payload;
    },
    // setCurrentWalkingDog: (state, action: PayloadAction<PetInterface>) => {
    //   state.currentWalkingDog = action.payload;
    // },
    markGoingBack: (state, action: PayloadAction<boolean>) => {
      state.isGoingBack = action.payload;
    },
  },
});

export const {
  pushPath,
  popPath,
  clearHistory,
  changeMyPetView,
  changeWalkingSelectView,
  // setCurrentWalkingDog,
  markGoingBack,
} = userActionSlice.actions;
export default userActionSlice.reducer;
