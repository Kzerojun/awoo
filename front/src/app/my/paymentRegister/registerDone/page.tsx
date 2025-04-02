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
    <div className="flex flex-col h-screen bg-white">
      <CommonTopBar title="멍Pay" rightAction="bell" />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* 체크 아이콘 */}
        <div className="mb-6">
          <Image src={check} alt="성공" width={90} height={90} className="mx-auto" />
        </div>

        {/* 성공 메시지 - 이름과 성공 메시지를 더 가깝게 배치 */}
        <h2 className="text-2xl font-bold text-center mb-1">
          {isLoading ? "로딩 중..." : `${nickname}님`}
        </h2>
        <p className="text-xl font-bold text-center text-teal-600 mb-8">계좌 인증을 성공했어요</p>

        {/* 안내 메시지 - 여백 조정 및 텍스트 스타일 개선 */}
        <div className="bg-gray-50 rounded-xl p-5 w-full max-w-xs mb-18">
          <p className="text-gray-700 text-center leading-relaxed text-[15px]">
            <span className="text-teal-600">멍Pay</span>와 함께 하는{" "}
            <span className="text-teal-600">안심 거래</span> !
            <br />
            안전하고 편리한 결제 서비스를 누려보세요 !
          </p>
        </div>

        {/* 마이페이지 이동 버튼 - 여백 및 크기 조정 */}
        <button
          onClick={handleGoToMyPage}
          className="w-full max-w-xs py-4 bg-teal-500 text-white font-medium rounded-full transition-colors hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
        >
          마이페이지로 이동
        </button>
      </div>
    </div>
  );
}
