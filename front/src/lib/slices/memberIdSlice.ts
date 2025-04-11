import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 멤버 id 관련 상태 정의
interface MemberIdState {
  memberId: number;
}

// 초기 상태 설정
const initialState: MemberIdState = {
  memberId: 0,
};

const MemberIdSlice = createSlice({
  name: "memberId",
  initialState,
  reducers: {
    // 멤버 ID 설정
    setMemberId: (state, action: PayloadAction<number>) => {
      state.memberId = action.payload;
    },
    // 멤버 ID 리셋
    resetMemberId: () => initialState,
  },
});
export const { setMemberId, resetMemberId } = MemberIdSlice.actions;

export default MemberIdSlice.reducer;
