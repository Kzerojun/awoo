import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransferCheckState {
  fromChat: boolean;
  chatRoomId?: number;
  usedProductId?: number;
}

const initialState: TransferCheckState = {
  fromChat: false,
  chatRoomId: undefined,
  usedProductId: undefined,
};

export const transferCheckSlice = createSlice({
  name: "transferCheck",
  initialState,
  reducers: {
    setTransferInfo: (state, action: PayloadAction<TransferCheckState>) => {
      state.fromChat = action.payload.fromChat;
      state.chatRoomId = action.payload.chatRoomId;
      state.usedProductId = action.payload.usedProductId;
    },
    resetTransferInfo: () => initialState,
  },
});

// 액션과 리듀서 export
export const { setTransferInfo, resetTransferInfo } = transferCheckSlice.actions;
export default transferCheckSlice.reducer;
