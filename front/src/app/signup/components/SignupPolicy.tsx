"use client";

import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignupPolicyProps {
  privacyAgreed: boolean;
  setPrivacyAgreed: (v: boolean) => void;
}

const SignupPolicy = ({ privacyAgreed, setPrivacyAgreed }: SignupPolicyProps) => {
  const route = useRouter();
  const [isAllAgree, setIsAllAgree] = useState<boolean>(false);
  const [isPersonalAgree, setIsPersonalAgree] = useState<boolean>(false);
  const [isServiceAgree, setIsServiceAgree] = useState<boolean>(false);
  const [isCameraAgree, setIsCameraAgree] = useState<boolean>(false);
  const [isLocationCollectAgree, setIsLocationCollectAgree] = useState<boolean>(false);
  const [isLocationUseAgree, setIsLocationUseAgree] = useState<boolean>(false);

  // 약관보기 페이지로 이동
  const seeSignupPolicy = () => {
    route.push("/signup/policy");
  };

  // 전체 동의
  const allAgree = () => {
    setIsPersonalAgree(true);
    setIsServiceAgree(true);
    setIsCameraAgree(true);
    setIsLocationCollectAgree(true);
    setIsLocationUseAgree(true);
    setIsAllAgree(true);
    setPrivacyAgreed(true);
  };

  // 전체 동의 취소
  const cancelAllAgree = () => {
    setIsPersonalAgree(false);
    setIsServiceAgree(false);
    setIsCameraAgree(false);
    setIsLocationCollectAgree(false);
    setIsLocationUseAgree(false);
    setIsAllAgree(false);
    setPrivacyAgreed(false);
  };

  return (
    <div className="w-72 flex flex-col gap-y-3">
      <div className="border-b-1 border-b-aqua py-1 w-72 text-center font-bold">
        AwOO 이용약관 동의
      </div>
      <div className="flex items-center justify-between w-full">
        <span className="flex items-center text-sm gap-x-2">
          {isAllAgree ||
          (isPersonalAgree &&
            isServiceAgree &&
            isCameraAgree &&
            isLocationCollectAgree &&
            isLocationUseAgree) ? (
            <CheckCircleIcon
              className="w-5 h-5 text-light-aqua cursor-pointer"
              onClick={cancelAllAgree}
            />
          ) : (
            <CheckCircleIcon
              className="w-5 h-5 text-custom-gray cursor-pointer"
              onClick={allAgree}
            />
          )}
          <p className="font-semibold">약관 전체 동의</p>
        </span>
        <button
          type="button"
          onClick={seeSignupPolicy}
          className="text-sm text-custom-gray border-b-1 border-b-custom-gray cursor-pointer"
        >
          약관 보기
        </button>
      </div>

      {/* 약관 이름들 + 체크 */}

      <div className="w-full rounded-lg border-2 border-aqua flex flex-col justify-center items-start gap-y-3 p-2">
        {/* 개인정보 */}
        <div className="flex items-center justify-center text-sm gap-2">
          <span>
            {!isPersonalAgree ? (
              <CheckCircleIcon
                className="w-5 h-5 text-custom-gray cursor-pointer"
                onClick={() => setIsPersonalAgree(true)}
              />
            ) : (
              <CheckCircleIcon
                className="w-5 h-5 text-light-aqua cursor-pointer"
                onClick={() => setIsPersonalAgree(false)}
              />
            )}
          </span>
          <p>(필수) 개인정보 수집 및 이용 동의</p>
        </div>

        {/* 서비스 이용 */}
        <div className="flex items-center justify-center text-sm gap-2">
          <span>
            {!isServiceAgree ? (
              <CheckCircleIcon
                className="w-5 h-5 text-custom-gray cursor-pointer"
                onClick={() => setIsServiceAgree(true)}
              />
            ) : (
              <CheckCircleIcon
                className="w-5 h-5 text-light-aqua cursor-pointer"
                onClick={() => setIsServiceAgree(false)}
              />
            )}
          </span>
          <p>(필수) 서비스 이용약관 동의</p>
        </div>

        {/* 카메라 권한 */}
        <div className="flex items-center justify-center text-sm gap-2">
          <span>
            {!isCameraAgree ? (
              <CheckCircleIcon
                className="w-5 h-5 text-custom-gray cursor-pointer"
                onClick={() => setIsCameraAgree(true)}
              />
            ) : (
              <CheckCircleIcon
                className="w-5 h-5 text-light-aqua cursor-pointer"
                onClick={() => setIsCameraAgree(false)}
              />
            )}
          </span>
          <p>(필수) 카메라 권한 이용 동의</p>
        </div>

        {/* 위치 정보 수집*/}
        <div className="flex items-center justify-center text-sm gap-2">
          <span>
            {!isLocationCollectAgree ? (
              <CheckCircleIcon
                className="w-5 h-5 text-custom-gray cursor-pointer"
                onClick={() => setIsLocationCollectAgree(true)}
              />
            ) : (
              <CheckCircleIcon
                className="w-5 h-5 text-light-aqua cursor-pointer"
                onClick={() => setIsLocationCollectAgree(false)}
              />
            )}
          </span>
          <p>(필수) 위치 정보 수집 권한 이용 및 동의</p>
        </div>

        {/* 위치 정보 활용 */}
        <div className="flex items-center justify-center text-sm gap-2">
          <span>
            {!isLocationUseAgree ? (
              <CheckCircleIcon
                className="w-5 h-5 text-custom-gray cursor-pointer"
                onClick={() => setIsLocationUseAgree(true)}
              />
            ) : (
              <CheckCircleIcon
                className="w-5 h-5 text-light-aqua cursor-pointer"
                onClick={() => setIsLocationUseAgree(false)}
              />
            )}
          </span>
          <p>(필수) 위치 정보 활용 동의</p>
        </div>
      </div>
    </div>
  );
};

export default SignupPolicy;
