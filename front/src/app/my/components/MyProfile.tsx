"use client";
import my from "../../../../public/icons/bottombar/deactive/my.svg";
import Image from "next/image";
import vector from "../../../../public/icons/mypage/vector.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store"; // RootState 타입을 import (store 파일 경로에 맞게 수정해야 함)
import { getUserInfo } from "@/api/user/auth"; // API 함수 import

export default function MyProfile() {
  // Redux store에서 사용자 정보 가져오기
  const userState = useSelector((state: RootState) => state.user);

  // 로컬 상태 관리
  const [nickname, setNickname] = useState<string | null>(userState.nickname);
  const [profileImage, setProfileImage] = useState<string | null>(userState.profileImage);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);

  // 컴포넌트 마운트 시 사용자 정보 가져오기
  useEffect(() => {
    // Redux store에 닉네임이 이미 있으면 API 호출 건너뛰기
    if (userState.nickname) {
      setNickname(userState.nickname);
      setProfileImage(userState.profileImage);
      setIsLoading(false);
      return;
    }

    // Redux store에 닉네임이 없으면 API 호출
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const userInfo = await getUserInfo();
        setNickname(userInfo.nickname);
        setProfileImage(userInfo.profileImage);
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [userState]);

  // 이미지 오류 처리 함수
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link href="/my/profile" className="w-full block">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <div className="rounded-full mr-3 overflow-hidden w-[60px] h-[60px]">
            {isLoading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse"></div>
            ) : profileImage && !imageError ? (
              <img
                src={profileImage}
                alt="프로필 이미지"
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <Image src={my} alt="프로필 이미지" width={60} height={60} className="object-cover" />
            )}
          </div>
          <div>
            <div className="flex items-center">
              {isLoading ? (
                <span className="text-gray-400 text-xl font-bold">로딩 중...</span>
              ) : (
                <>
                  <span className="text-teal-400 text-xl font-bold">{nickname || "게스트"}</span>
                  <span className="ml-1 text-lg">님,</span>
                </>
              )}
            </div>
            <div className="text-lg">반가워요!</div>
          </div>
        </div>
        <div className="text-gray-400 mr-2">
          <Image src={vector} width={10} height={10} alt="화살표" />
        </div>
      </div>
    </Link>
  );
}
