"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";

const SignupPolicyPage = () => {
  return (
    <>
      <CommonTopBar title="약관 상세" />
      <div className="w-full mt-14 h-full overflow-y-auto my-5">
        <div className=" flex flex-col items-center justify-center gap-y-3">
          {/* 개인 정보 수집 및 이용 동의 */}
          <div className="w-[90%] flex p-4 flex-col items-center justify-center bg-gray-100">
            <h2>개인정보 수집 및 이용 동의</h2>
            <div className="text-sm mt-2 p-2 flex flex-col items-center justify-center gap-y-1 border border-gray-300">
              <p className="text-center">
                {" "}
                당사는 회원가입 및 서비스 제공을 위해 다음과 같은 개인정보를 수집 및 이용합니다.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  수집 항목 <br />
                  <span>이름, 생년월일, 휴대전화번호, 이메일</span>
                </li>
                <li>
                  수집 목적 <br />
                  <span>본인 확인, 계좌 개설, 적금 개설, 인증 용도</span>
                </li>
                <li>
                  보유 및 이용 기간 <br />
                  <span>회원 탈퇴 시까지 (관련 법령에 따라 일정 기간 보관될 수 있음) </span>
                </li>
              </ul>
            </div>
          </div>
          {/* 서비스 이용약관 동의 */}
          <div className="w-[90%] flex p-4 flex-col items-center justify-center bg-gray-100">
            <h2>서비스 이용약관 동의</h2>
            <div className="text-sm mt-2 p-2 flex flex-col items-center justify-center gap-y-1 border border-gray-300">
              <p className="text-center">
                당사의 서비스 이용과 관련된 권리, 의무 및 책임사항은 별도의{" "}
                <span className="text-blue-600 underline"> 서비스 이용약관</span>에 따릅니다.
              </p>
              <p>귀하는 본 약관을 충분히 이해하고 동의한 후 회원가입을 진행해주시기 바랍니다.</p>
            </div>
          </div>
          {/* 카메라 권한 이용 동의 */}
          <div className="w-[90%] flex p-4 flex-col items-center justify-center bg-gray-100">
            <h2>카메라 권한 이용 동의</h2>
            <div className="text-sm mt-2 p-2 flex flex-col items-center justify-center gap-y-1 border border-gray-300">
              <p className="text-center">
                {" "}
                본 서비스는 반려견 산책 인증 및 본인 확인 등을 위해 카메라 기능을 이용합니다.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  사용 목적
                  <br />
                  <span>산책 인증 사진 촬영</span>
                </li>
                <li>촬영된 데이터는 사용자의 동의 없이 외부로 제공되지 않습니다.</li>
              </ul>
            </div>
          </div>
          {/* 위치 정보 수집 권한 이용 동의 */}
          <div className="w-[90%] flex p-4 flex-col items-center justify-center bg-gray-100">
            <h2>위치 정보 수집 권한 이용 동의 및 활용 동의</h2>
            <div className="text-sm mt-2 p-2 flex flex-col items-center justify-center gap-y-1 border border-gray-300">
              <p className="text-center">
                {" "}
                서비스 이용 중 위치 기반 기능 제공을 위해 사용자의 위치 정보가 수집될 수 있습니다.{" "}
                <br />
                수집된 위치 정보는 다음과 같은 목적을 위해 활용됩니다.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  수집 정보
                  <br />
                  <span>GPS 기반 실시간 위치 좌표</span>
                </li>
                <li>
                  수집 목적 <br />
                  <span>산책 거리 측정, 산책 인증, 이동 경로 확인</span>
                  <br />
                  <span>산책 기록 저장 및 이력 제공</span>
                </li>
                <li>
                  보유 및 이용 기간 <br />
                  <span>서비스 이용 중 또는 관련 법령에 따른 기간</span>
                </li>
              </ul>
              <p>
                위치 정보는 외부에 제공되지 않으며, 이용자의 동의 없이 타 용도로 사용되지 않습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPolicyPage;
