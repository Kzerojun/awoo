import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 스택 구조를 기반으로 한 뒤로가기 구현
interface UserActionState {
  historyStack: string[];
  currentView: number;
  isGoingBack: boolean;
}

const initialState: UserActionState = {
  historyStack: [],
  currentView: 0,
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
    changeView: (state, action: PayloadAction<number>) => {
      state.currentView = action.payload;
    },
    markGoingBack: (state, action: PayloadAction<boolean>) => {
      state.isGoingBack = action.payload;
    },
  },
});

export const { pushPath, popPath, clearHistory, changeView, markGoingBack } =
  userActionSlice.actions;
export default userActionSlice.reducer;
