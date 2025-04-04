"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import CommonTopBar from "@/common/ui/CommonTopBar";
import { BellIcon } from "@heroicons/react/24/outline";
import check from "../../../../../public/icons/mypage/checkmark.svg";
import { RootState } from "@/lib/store";
import { getUserInfo } from "@/api/user/auth";

export default function RegisterDone() {
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

  // 마이페이지로 이동
  const handleGoToMyPage = () => {
    router.push("/my");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonTopBar title="멍Pay" rightAction="bell" />

      <div className="flex flex-col items-center px-4 pt-14">
        {/* 메인 컨텐츠 - 고정된 간격 사용 */}
        <div className="mt-[110px] mb-[100px] flex flex-col items-center">
          {/* 체크 아이콘 */}
          <div className="flex items-center justify-center mb-3 p-3 bg-teal-50 rounded-full">
            <Image src={check} alt="성공" width={95} height={95} />
          </div>

          {/* 성공 메시지 */}
          <h2 className="text-[23px] font-bold text-center mb-2">
            {isLoading ? "로딩 중..." : `${nickname}님`}
          </h2>
          <p className="text-[23px] font-bold text-center text-teal-600">계좌 인증을 성공했어요</p>

          {/* 안내 메시지 */}
          <div className="mt-6 bg-gray-50 rounded-xl p-5 w-full max-w-xs">
            <p className="text-gray-700 text-center leading-relaxed text-[15px]">
              <span className="text-teal-600">멍Pay</span>와 함께 하는{" "}
              <span className="text-teal-600">안심 거래</span> !
              <br />
              안전하고 편리한 결제 서비스를 누려보세요 !
            </p>
          </div>
        </div>

        {/* 마이페이지 이동 버튼 */}
        <div className="w-[270px] max-w-md">
          <button
            onClick={handleGoToMyPage}
            className="w-full py-3 bg-[#0DCFAA] rounded-lg text-white font-medium text-lg"
          >
            마이페이지로 이동
          </button>
        </div>
      </div>
    </div>
  );
}
