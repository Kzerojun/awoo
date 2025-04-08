import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PaymentMethod = "NONE" | "PAYMENT" | "SAFE";

type ChatSystemStatus = "IDLE" | "STARTED" | "FINISHED" | "SHIPPING" | "DELIVERED" | "CONFIRMED";

interface ChatSystemState {
  paymentMethod: PaymentMethod;
  status: ChatSystemStatus;
}

const initialState: ChatSystemState = {
  paymentMethod: "NONE",
  status: "IDLE",
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
    resetChatSystem: () => initialState,
  },
});

export const { setPaymentMethod, setChatStatus, resetChatSystem } = chatSystemSlice.actions;
export const isPaymentFinished = (state: ChatSystemState) =>
  state.status === "FINISHED" &&
  (state.paymentMethod === "PAYMENT" || state.paymentMethod === "SAFE");

export default chatSystemSlice.reducer;
