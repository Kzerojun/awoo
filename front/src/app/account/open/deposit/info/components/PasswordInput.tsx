"use client";

import { useKeypad } from "@/contexts/KeypadContent";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setActiveField, appendDigit, deleteLastDigit } from "@/lib/slices/passwordSlice";
interface PasswordInputProps {
  password: string;
  confirmPassword: string;
  setPassword: (val: string) => void;
  setConfirmPassword: (val: string) => void;
}

export default function PasswordInput() {
  const dispatch = useAppDispatch();
  const { password, confirmPassword, activeField } = useAppSelector((state) => state.password);
  const { openKeypad } = useKeypad();

  const handleFieldClick = (field: "password" | "confirm") => {
    dispatch(setActiveField(field));

    openKeypad(
      (digit) => dispatch(appendDigit(digit)),
      () => dispatch(deleteLastDigit()),
      () => {
        console.log("✅ 확인 버튼 클릭됨");
        dispatch(setActiveField(null));
      }
    );
  };

  return (
    <div className="flex flex-col gap-4 mb-6 px-4">
      {/* 🔐 비밀번호 만들기 */}
      <div onClick={() => handleFieldClick("password")}>
        <label className="text-sm font-medium mb-1 block">통장 비밀번호 만들기</label>
        <input
          type="password"
          value={password.replace(/./g, "●")}
          readOnly
          placeholder="●●●●"
          className={`w-full border rounded-md px-4 py-2 text-lg text-center tracking-widest bg-gray-50
            placeholder:text-lg ${
              activeField === "password" ? "border-teal-500" : "border-gray-300"
            }`}
        />
      </div>

      {/* 🔐 비밀번호 확인 */}
      <div onClick={() => handleFieldClick("confirm")}>
        <label className="text-sm font-medium mb-1 block">통장 비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword.replace(/./g, "●")}
          readOnly
          placeholder="●●●●"
          className={`w-full border rounded-md px-4 py-2 text-lg text-center tracking-widest bg-gray-50
            placeholder:text-lg ${
              activeField === "confirm" ? "border-teal-500" : "border-gray-300"
            }`}
        />
      </div>
    </div>
  );
}
