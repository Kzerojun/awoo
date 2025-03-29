"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store";

export default function AccountVerifyConfirmPage() {
  const router = useRouter();

  // accountProgress 가져오기
  const { accountType, savingStage } = useAppSelector((state) => state.accountProgress);

  const [values, setValues] = useState(["", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    // 다음 input으로 포커스
    if (value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // ✅ 인증 확인
  const handleConfirm = () => {
    const inputNumber = values.join("");
    if (inputNumber !== "123") {
      alert("인증번호가 올바르지 않습니다.");
      return;
    }

    // ✅ 라우팅 분기
    if (accountType === "deposit") {
      router.push("/account/open/deposit/complete");
    } else if (accountType === "saving") {
      if (savingStage === 1) {
        router.push("/account/verify/success/saving");
      } else if (savingStage === 2) {
        router.push("/account/verify/success/saving");
      } else if (savingStage === 3) {
        router.push("/account/verify/success/saving");
      } else {
        alert("잘못된 스테이지입니다.");
      }
    } else {
      alert("가입 정보를 찾을 수 없습니다.");
    }
  };

  return (
    <div>
      <CommonTopBar title="계좌인증" leftAction="back" rightAction="cancel" />

      <div className="pt-16 px-6 flex flex-col items-start gap-4 text-left">
        <h2 className="text-xl font-semibold">계좌 인증을 해주세요</h2>
        <p className="text-sm text-gray-500">
          입력하신 계좌로 1원을 보냈습니다.
          <br />
          입금자명 뒤 세자리 숫자를 입력해주세요.
        </p>

        <div className="flex gap-4 mt-6 mb-4">
          {values.map((value, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(i, e.target.value)}
              style={{ caretColor: "transparent" }}
              className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-aqua focus:border-aqua"
            />
          ))}
        </div>

        <button className="w-full bg-aqua text-white py-2 rounded-md" onClick={handleConfirm}>
          인증 완료
        </button>
      </div>
    </div>
  );
}
