"use client";

import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface SignupPolicyProps {
  privacyAgreed: boolean;
  setPrivacyAgreed: (v: boolean) => void;
}

const SignupPolicy = ({ privacyAgreed, setPrivacyAgreed }: SignupPolicyProps) => {
  const router = useRouter();

  const [isPersonalAgree, setIsPersonalAgree] = useState<boolean>(false);
  const [isServiceAgree, setIsServiceAgree] = useState<boolean>(false);
  const [isCameraAgree, setIsCameraAgree] = useState<boolean>(false);
  const [isLocationCollectAgree, setIsLocationCollectAgree] = useState<boolean>(false);
  const [isLocationUseAgree, setIsLocationUseAgree] = useState<boolean>(false);

  // ✔ 모든 필수 항목이 체크됐는지 여부 계산
  const isAllAgree =
    isPersonalAgree &&
    isServiceAgree &&
    isCameraAgree &&
    isLocationCollectAgree &&
    isLocationUseAgree;

  // 👉 개별 상태 변경 시 privacyAgreed 동기화
  useEffect(() => {
    setPrivacyAgreed(isAllAgree);
  }, [isAllAgree, setPrivacyAgreed]);

  // 전체 동의/해제 토글
  const handleAllAgreeToggle = () => {
    const next = !isAllAgree;
    setIsPersonalAgree(next);
    setIsServiceAgree(next);
    setIsCameraAgree(next);
    setIsLocationCollectAgree(next);
    setIsLocationUseAgree(next);
  };

  // 약관 보기 페이지 이동
  const seeSignupPolicy = () => {
    router.push("/signup/policy");
  };

  return (
    <div className="w-72 flex flex-col gap-y-3">
      <div className="border-b-1 border-b-aqua py-1 w-72 text-center font-bold">
        AwOO 이용약관 동의
      </div>

      {/* 전체 동의 */}
      <div className="flex items-center justify-between w-full">
        <span className="flex items-center text-sm gap-x-2">
          <CheckCircleIcon
            className={`w-5 h-5 cursor-pointer ${
              isAllAgree ? "text-light-aqua" : "text-custom-gray"
            }`}
            onClick={handleAllAgreeToggle}
          />
          <p className="font-semibold">약관 전체 동의</p>
        </span>
        <button
          type="button"
          onClick={seeSignupPolicy}
          className="text-sm text-custom-gray border-b border-b-custom-gray"
        >
          약관 보기
        </button>
      </div>

      {/* 개별 항목 동의 */}
      <div className="w-full rounded-lg border-2 border-aqua flex flex-col justify-center items-start gap-y-3 p-2">
        <CheckboxItem
          checked={isPersonalAgree}
          onToggle={() => setIsPersonalAgree((prev) => !prev)}
          label="(필수) 개인정보 수집 및 이용 동의"
        />
        <CheckboxItem
          checked={isServiceAgree}
          onToggle={() => setIsServiceAgree((prev) => !prev)}
          label="(필수) 서비스 이용약관 동의"
        />
        <CheckboxItem
          checked={isCameraAgree}
          onToggle={() => setIsCameraAgree((prev) => !prev)}
          label="(필수) 카메라 권한 이용 동의"
        />
        <CheckboxItem
          checked={isLocationCollectAgree}
          onToggle={() => setIsLocationCollectAgree((prev) => !prev)}
          label="(필수) 위치 정보 수집 권한 이용 및 동의"
        />
        <CheckboxItem
          checked={isLocationUseAgree}
          onToggle={() => setIsLocationUseAgree((prev) => !prev)}
          label="(필수) 위치 정보 활용 동의"
        />
      </div>
    </div>
  );
};

// 🔹 재사용 가능한 체크박스 항목 컴포넌트
const CheckboxItem = ({
  checked,
  onToggle,
  label,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
}) => {
  return (
    <div className="flex items-center justify-center text-sm gap-2">
      <CheckCircleIcon
        className={`w-5 h-5 cursor-pointer ${checked ? "text-light-aqua" : "text-custom-gray"}`}
        onClick={onToggle}
      />
      <p>{label}</p>
    </div>
  );
};

export default SignupPolicy;
