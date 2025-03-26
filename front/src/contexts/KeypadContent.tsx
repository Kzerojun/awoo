"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import SecurityKeypad from "@/common/ui/SecurityKeypad";

interface KeypadContextType {
  openKeypad: (
    onInput: (digit: string) => void,
    onDelete: () => void,
    onConfirm?: () => void
  ) => void;
  closeKeypad: () => void;
  isVisible: boolean;
}

const KeypadContext = createContext<KeypadContextType | null>(null);

export const useKeypad = () => {
  const context = useContext(KeypadContext);
  if (!context) throw new Error("useKeypad must be used within a KeypadProvider");
  return context;
};

export const KeypadProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState(""); // ✅ 입력값 추적

  const [onInput, setOnInput] = useState<(digit: string) => void>(() => {});
  const [onDelete, setOnDelete] = useState<() => void>(() => {});
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const openKeypad = useCallback(
    (onInputFn: (digit: string) => void, onDeleteFn: () => void, onConfirmFn?: () => void) => {
      // ✅ 숫자 입력 시 입력값 추적 및 자동 닫힘
      setOnInput(() => (digit: string) => {
        setInputValue((prev) => {
          const next = prev + digit;
          if (next.length === 4) {
            setTimeout(() => setIsVisible(false), 150); // 부드럽게 닫힘
          }
          return next;
        });
        onInputFn(digit);
      });

      // ✅ 삭제 시 입력값도 제거
      setOnDelete(() => () => {
        setInputValue((prev) => prev.slice(0, -1));
        onDeleteFn();
      });

      // ✅ 확인 클릭 시 수동 닫힘
      setOnConfirm(() => () => {
        setIsVisible(false);
        onConfirmFn?.();
      });

      setInputValue("");
      setIsVisible(true);
    },
    []
  );

  const closeKeypad = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <KeypadContext.Provider value={{ openKeypad, closeKeypad, isVisible }}>
      {children}
      {isVisible && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <SecurityKeypad onInput={onInput} onDelete={onDelete} onConfirm={onConfirm} />
        </div>
      )}
    </KeypadContext.Provider>
  );
};
