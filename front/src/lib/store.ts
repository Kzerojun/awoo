import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// 슬라이스 리듀서
import counterReducer from "./slices/counterSlice";
import walkReducer from "./slices/walkSlice";
import registerReducer from "./slices/registerSlice";
import userActionReducer from "./slices/userActionSlice";
import userReducer from "./slices/userSlice";
import passwordReducer from "./slices/passwordSlice";
import accountReducer from "./slices/accountSlice";
import paymentReducer from "./slices/paymentSlice";
import savingReducer from "./slices/savingSlice";
import savingPasswordReducer from "./slices/savingPasswordSlice";
import accountProgressReducer from "./slices/accountProgressSlice";
import profileReducer from "./slices/profileSlice";
import petReducer from "./slices/petSlice";
import myDepositSavingReducer from "./slices/myDepositSavingSlice";
import savingAccountDetailReducer from "./slices/savingAccountDetailSlice";
import chatReducer from "./slices/chatSlice";
import transferReducer from "./slices/transferSlice";
import memberIdReducer from "./slices/memberIdSlice";
import accountStatusReducer from "./slices/accountStatusSlice";
import transfercheckReducer from "./slices/transfercheckSlice";
import chatSystemReducer from "./slices/chatSystemSlice";

// === ✅ Step 3 : persist 설정 ===
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "saving",
    "savingPassword",
    "accountProgress",
    "account",
    "user",
    "pet",
    "savingAccountDetail",
    "memberId",
    "accountStatus",
  ], // persist로 값을 관리할 필요가 있는 경우에 추가
};

const rootReducer = combineReducers({
  counter: counterReducer,
  walk: walkReducer,
  register: registerReducer,
  userAction: userActionReducer,
  user: userReducer,
  password: passwordReducer,
  account: accountReducer,
  payment: paymentReducer,
  saving: savingReducer,
  savingPassword: savingPasswordReducer,
  accountProgress: accountProgressReducer,
  profile: profileReducer,
  pet: petReducer,
  myDepositSaving: myDepositSavingReducer,
  savingAccountDetail: savingAccountDetailReducer,
  transfer: transferReducer,
  chat: chatReducer,
  memberId: memberIdReducer,
  accountStatus: accountStatusReducer,
  transfercheck: transfercheckReducer,
  chatSystem: chatSystemReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// === ✅ Step 4 : store, persistor export ===
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // persist 관련 액션은 검사에서 제외
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// === ✅ Step 5 : 타입 ===
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
