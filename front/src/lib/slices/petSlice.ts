import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PetInterface {
  petId: number;
  memberId: number;
  name: string;
  age: number;
  breed: string;
  profileImage: string;
  savingId: number;
  walkInMonth: number;
  savingGrade: string;
}

interface PetState {
  petList: PetInterface[];
}

const initialState: PetState = {
  petList: [],
};

const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    // 전체 반려견 조회
    setPetList: (state, action: PayloadAction<PetInterface[]>) => {
      state.petList = action.payload;
    },
    // 한 마리 추가
    addPet: (state, action: PayloadAction<PetInterface>) => {
      state.petList.push(action.payload);
    },
  },
});

export const { setPetList, addPet } = petSlice.actions;
export default petSlice.reducer;
