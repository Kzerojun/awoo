import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PhotoState {
  image: string | null;
}

const initialState: PhotoState = {
  image: null,
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    setPhoto: (state, action: PayloadAction<string | null>) => {
      state.image = action.payload;
    },
    clearPhoto: (state) => {
      state.image = null;
    },
  },
});

export const { setPhoto, clearPhoto } = photoSlice.actions;
export default photoSlice.reducer;
