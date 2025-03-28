"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/api/user/auth";
import my from "../../../../../public/icons/bottombar/active/my_aqua.svg";
import Image from "next/image";

export default function ProfilePicture() {
  // Redux 스토어에서 사용자 정보 가져오기
  const userState = useSelector((state: RootState) => state.user);

  // 로컬 상태 관리
  const [profileImage, setProfileImage] = useState<string | null>(userState.profileImage);
  const [nickname, setNickname] = useState<string | null>(userState.nickname);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    // Redux 스토어에 필요한 정보가 이미 있으면 API 호출 건너뛰기
    if (userState.nickname) {
      setNickname(userState.nickname);
      setProfileImage(userState.profileImage);
      setIsLoading(false);
      return;
    }

    // Redux 스토어에 필요한 정보가 없으면 API 호출
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const userInfo = await getUserInfo();
        // response 객체 내부에 있는 정보 추출
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
    <div className="flex flex-col items-center my-6">
      <div className="relative mb-3">
        <div className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
          {isLoading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse"></div>
          ) : profileImage && !imageError ? (
            // S3 이미지를 직접 로드
            <img
              src={profileImage}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            // 기본 이미지는 Next.js Image 컴포넌트 사용 (로컬 이미지)
            <Image src={my} alt="프로필 이미지" width={80} height={80} className="object-cover" />
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="mt-1 w-20 h-7 bg-gray-200 rounded animate-pulse"></div>
      ) : (
        <div className="mt-1 text-xl font-bold">{nickname || "게스트"}</div>
      )}
    </div>
  );
}
