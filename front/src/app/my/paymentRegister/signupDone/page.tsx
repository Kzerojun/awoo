"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommonTopBar from "@/common/ui/CommonTopBar";
import { BellIcon } from "@heroicons/react/24/outline";
import checkmark from "../../../../../public/icons/mypage/checkmark.svg";
import Image from "next/image";
import { RootState } from "@/lib/store";
import { getUserInfo } from "@/api/user/auth";

export default function SignUpDone() {
  const router = useRouter();
  const userState = useSelector((state: RootState) => state.user);
  const [nickname, setNickname] = useState<string>(userState.nickname || "");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 유저 정보 가져오기
  useEffect(() => {
    // Redux store에 닉네임이 이미 있으면 API 호출 건너뛰기
    if (userState.nickname) {
      setNickname(userState.nickname);
      setIsLoading(false);
      return;
    }

    // Redux store에 닉네임이 없으면 API 호출
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const userInfo = await getUserInfo();
        setNickname(userInfo.nickname);
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        setNickname("사용자"); // 에러 시 기본값
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [userState]);

  // 계좌 연결 페이지로 이동
  const handleLinkAccount = () => {
    router.push("/my/paymentRegister/accountConnect");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonTopBar title="멍Pay" rightAction="bell" />

      <div className="flex flex-col items-center px-4 pt-14">
        {/* 메인 컨텐츠 - 고정된 간격 사용 */}
        <div className="mt-[110px] mb-[100px] flex flex-col items-center">
          {/* 체크 아이콘 */}
          <div className="flex items-center justify-center mb-3 p-3 bg-teal-50 rounded-full">
            <Image src={checkmark} alt="체크" width={95} height={95} />
          </div>

          {/* 성공 메시지 */}
          <h2 className="text-[23px] font-bold text-center mb-2">
            {isLoading ? "로딩 중..." : `${nickname}님`}
          </h2>
          <p className="text-[23px] font-bold text-center text-teal-600">
            멍페이 가입을 완료했어요
          </p>

          {/* 안내 메시지 추가 */}
          <div className="mt-6 bg-gray-50 rounded-xl p-5 w-full max-w-xs">
            <p className="text-gray-700 text-center leading-relaxed text-[15px]">
              이제 <span className="text-teal-600">계좌를 연결</span>하고
              <br />
              다양한 서비스를 이용해보세요!
            </p>
          </div>
        </div>

        {/* 계좌 연결 버튼 */}
        <div className="w-[270px] max-w-md">
          <button
            onClick={handleLinkAccount}
            className="w-full py-3 bg-[#0DCFAA] rounded-lg text-white font-medium text-lg"
          >
            계좌 연결하기
          </button>
        </div>
      </div>
    </div>
  );
}
