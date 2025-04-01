"use client"; // 중요: 클라이언트 컴포넌트로 지정

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/lib/store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
