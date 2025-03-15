"use client"; // 중요: 클라이언트 컴포넌트로 지정

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { increment, decrement } from "@/lib/slices/counterSlice";

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">카운터: {count}</h2>
      <div className="flex gap-2">
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          감소
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          증가
        </button>
      </div>
    </div>
  );
}
