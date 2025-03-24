import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 스택 구조를 기반으로 한 뒤로가기 구현
interface UserActionState {
  historyStack: string[];
}

const initialState: UserActionState = {
  historyStack: [],
};

const userActionSlice = createSlice({
  name: "userAction",
  initialState,
  reducers: {
    pushPath: (state, action: PayloadAction<string>) => {
      state.historyStack.push(action.payload);
    },
    popPath: (state) => {
      state.historyStack.pop();
    },
    clearHistory: (state) => {
      state.historyStack = [];
    },
  },
});

export const { pushPath, popPath, clearHistory } = userActionSlice.actions;
export default userActionSlice.reducer;
