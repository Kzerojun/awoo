import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// 슬라이스 리듀서 가져오기
import counterReducer from "./slices/counterSlice";
import walkReducer from "./slices/walkSlice";
import registerReducer from "./slices/registerSlice";
import userActionReducer from "./slices/userActionSlice"; // 유저가 들어가는 페이지 추적
import userReducer from "./slices/userSlice"; // 유저 정보
import passwordReducer from "./slices/passwordSlice";
import paymentReducer from "./slices/paymentSlice";

// Redux 스토어 생성
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // 여기에 추가 리듀서들을 넣을 수 있습니다
    walk: walkReducer, // 산책 관련 리듀서
    register: registerReducer,
    userAction: userActionReducer,
    user: userReducer,
    password: passwordReducer, // 보안 키패드 관련 리듀서
    payment: paymentReducer, // 멍페이 관련 리듀서
  },
  devTools: process.env.NODE_ENV !== "production",
});

// 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 타입이 적용된 커스텀 훅 생성
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
