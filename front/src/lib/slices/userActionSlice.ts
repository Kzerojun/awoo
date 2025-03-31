import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PetInterface } from "./petSlice";

// 스택 구조를 기반으로 한 뒤로가기 구현
interface UserActionState {
  historyStack: string[];
  currentWalkingSelectView: number;
  currentMyPetView: number;
  // currentWalkingDog: PetInterface | null;
  currentPetDetailView: number;
  isGoingBack: boolean;
  checkPassword: boolean;
}

const initialState: UserActionState = {
  historyStack: [],
  currentWalkingSelectView: 0,
  currentMyPetView: 0,
  // currentWalkingDog: null,
  currentPetDetailView: 1,
  isGoingBack: false,
  checkPassword: true,
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
    changeCurrentPetDetailView: (state, action: PayloadAction<number>) => {
      state.currentPetDetailView = action.payload;
    },
    checkPasswordConfirm: (state, action: PayloadAction<boolean>) => {
      state.checkPassword = action.payload;
    },
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
  changeCurrentPetDetailView,
  checkPasswordConfirm,
  markGoingBack,
} = userActionSlice.actions;
export default userActionSlice.reducer;
