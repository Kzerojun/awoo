import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// 슬라이스 리듀서 가져오기
import counterReducer from "./slices/counterSlice";
import walkReducer from "./slices/walkSlice";
import registerReducer from "./slices/registerSlice";
import userActionReducer from "./slices/userActionSlice"; // 유저가 들어가는 페이지 추적
import userReducer from "./slices/userSlice"; // 유저 정보
import passwordReducer from "./slices/passwordSlice";
import accountReducer from "./slices/accountSlice";
import paymentReducer from "./slices/paymentSlice";
import savingReducer from "./slices/savingSlice";
import savingPasswordReducer from "./slices/savingPasswordSlice";
import accountProgressReducer from "./slices/accountProgressSlice";
import profileReducer from "./slices/profileSlice";
import petReducer from "./slices/petSlice";

// Redux 스토어 생성
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // 여기에 추가 리듀서들을 넣을 수 있습니다
    walk: walkReducer, // 산책 관련 리듀서
    register: registerReducer,
    userAction: userActionReducer, // 유저 액션 관련 리듀서
    user: userReducer,
    password: passwordReducer, // 보안 키패드 관련 리듀서
    account: accountReducer, // 입출금 계좌 개설 관련 리듀서
    payment: paymentReducer, // 멍페이 관련 리듀서
    saving: savingReducer, // 적금 개설 관련 리듀서
    savingPassword: savingPasswordReducer, // 적금 password 관련 리듀서
    accountProgress: accountProgressReducer, // 계좌 개설 관련 리듀서 (사용자가 정확히 상품에 가입중인지 상태 분기)
    profile: profileReducer,
    pet: petReducer, // 반려견 관련 리듀서
  },
  devTools: process.env.NODE_ENV !== "production",
});

// 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 타입이 적용된 커스텀 훅 생성
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
