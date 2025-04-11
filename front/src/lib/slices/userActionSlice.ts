import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PetInterface } from "./petSlice";

interface UserActionState {
  // 스택 구조를 기반으로 한 뒤로가기 구현
  historyStack: string[];
  currentWalkingSelectView: number;
  currentMyPetView: number;
  currentPetDetailView: number;
  currentManageDepositView: number;
  currentManageSavingView: number;
  isGoingBack: boolean;
  checkPassword: boolean;
}

const initialState: UserActionState = {
  historyStack: [],
  currentWalkingSelectView: 0,
  currentMyPetView: 0,
  currentManageDepositView: 1,
  currentManageSavingView: 1,
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
    changeCurrentPetDetailView: (state, action: PayloadAction<number>) => {
      state.currentPetDetailView = action.payload;
    },
    changeCurrentManageDepositView: (state, action: PayloadAction<number>) => {
      state.currentManageDepositView = action.payload;
    },
    changeCurrentManageSavingView: (state, action: PayloadAction<number>) => {
      state.currentManageSavingView = action.payload;
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
  changeCurrentManageDepositView,
  changeCurrentManageSavingView,
  changeCurrentPetDetailView,
  checkPasswordConfirm,

  markGoingBack,
} = userActionSlice.actions;
export default userActionSlice.reducer;
