"use client"; // 중요: 클라이언트 컴포넌트로 지정

import { Provider } from "react-redux";
import { store } from "@/lib/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
