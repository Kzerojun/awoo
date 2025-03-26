import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  nickname: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  birthDate: string | null;
  profileImage: string | null;
  petList: string[] | null;
  accessToken: string[] | null;
}

const initialState: UserState = {
  nickname: null,
  name: null,
  email: null,
  phone: null,
  birthDate: null,
  profileImage: null,
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
