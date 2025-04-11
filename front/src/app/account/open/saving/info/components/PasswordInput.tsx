"use client";

import { useAppSelector } from "@/lib/store";

interface Props {
  onOpenPasswordKeypad: () => void;
  onOpenConfirmPasswordKeypad: () => void;
}

export default function SavingPasswordInput({
  onOpenPasswordKeypad,
  onOpenConfirmPasswordKeypad,
}: Props) {
  const { password, confirmPassword } = useAppSelector((state) => state.savingPassword);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-sm mb-1">통장 비밀번호 만들기</p>
        <input
          type="password"
          readOnly
          value={password}
          onClick={onOpenPasswordKeypad}
          className="border rounded-md px-2 py-1 w-full cursor-pointer"
          placeholder="숫자 4자리"
        />
      </div>

      <div>
        <p className="text-sm mb-1">통장 비밀번호 확인</p>
        <input
          type="password"
          readOnly
          value={confirmPassword}
          onClick={onOpenConfirmPasswordKeypad}
          className="border rounded-md px-2 py-1 w-full cursor-pointer"
          placeholder="숫자 4자리"
        />
      </div>

      {password && confirmPassword && password !== confirmPassword && (
        <p className="text-xs text-red-500">비밀번호가 일치하지 않습니다.</p>
      )}
    </div>
  );
}
