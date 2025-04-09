import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PaymentMethod = "NONE" | "PAYMENT" | "SAFE";

type ChatSystemStatus = "IDLE" | "STARTED" | "FINISHED" | "SHIPPING" | "DELIVERED" | "CONFIRMED";

interface ChatSystemState {
  paymentMethod: PaymentMethod;
  status: ChatSystemStatus;
  paymentAmount: number;
}

const initialState: ChatSystemState = {
  paymentMethod: "NONE",
  status: "IDLE",
  paymentAmount: 0,
};
const chatSystemSlice = createSlice({
  name: "chatSystem",
  initialState,
  reducers: {
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
    },
    setChatStatus: (state, action: PayloadAction<ChatSystemStatus>) => {
      state.status = action.payload;
    },
    setPaymentAmount: (state, action: PayloadAction<number>) => {
      state.paymentAmount = action.payload; // 💸 금액 저장 액션
    },
    resetChatSystem: () => initialState,
  },
});

export const { setPaymentMethod, setChatStatus, resetChatSystem, setPaymentAmount } =
  chatSystemSlice.actions;
export const isPaymentFinished = (state: ChatSystemState) =>
  state.status === "FINISHED" &&
  (state.paymentMethod === "PAYMENT" || state.paymentMethod === "SAFE");

export default chatSystemSlice.reducer;
