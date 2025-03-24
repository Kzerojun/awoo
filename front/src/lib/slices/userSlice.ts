import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  nickname: string | null;
  email: string | null;
  petList: string[] | null;
  accessToken: string[] | null;
}

const initialState: UserState = {
  nickname: null,
  email: null,
  petList: [],
  accessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    clearUserData: () => initialState,
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
