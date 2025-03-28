"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/api/user/auth";

// 사용자 정보 인터페이스
interface UserInfoData {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  walkGrade: number;
}

export default function UserInformation() {
  // Redux 스토어에서 사용자 정보 가져오기
  const userState = useSelector((state: RootState) => state.user);

  // 로컬 상태 관리
  const [userInfo, setUserInfo] = useState<UserInfoData>({
    name: userState.name || "",
    email: userState.email || "",
    phone: userState.phone || "",
    birthDate: userState.birthDate || "",
    walkGrade: userState.walkGrade || 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Redux 스토어에 필수 정보가 모두 있으면 API 호출 건너뛰기
    if (userState.name && userState.email) {
      setUserInfo({
        name: userState.name || "",
        email: userState.email || "",
        phone: userState.phone || "",
        birthDate: userState.birthDate || "",
        walkGrade: userState.walkGrade || 0,
      });
      setIsLoading(false);
      return;
    }

    // Redux 스토어에 필수 정보가 없으면 API 호출
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const response = await getUserInfo();
        // API 응답 구조에 맞게 데이터 추출
        setUserInfo({
          name: response.name || "",
          email: response.email || "",
          phone: response.phone || "",
          birthDate: response.birthDate || "",
          walkGrade: response.walkGrade || 0,
        });
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [userState]);

  // 전화번호 포맷팅 함수 (마스킹 없이 하이픈만 추가)
  const formatPhoneNumber = (phone: string): string => {
    if (!phone) return "";

    // 전화번호 형식이 맞지 않을 경우 그대로 반환
    if (!/^\d{10,11}$/.test(phone.replace(/[^0-9]/g, ""))) {
      return phone;
    }

    const digitsOnly = phone.replace(/[^0-9]/g, "");

    // 11자리 전화번호(01012345678)인 경우 010-1234-5678 형식으로 반환
    if (digitsOnly.length === 11) {
      return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 7)}-${digitsOnly.slice(7)}`;
    }
    // 10자리 전화번호(0101234567)인 경우 010-123-4567 형식으로 반환
    else if (digitsOnly.length === 10) {
      return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
    }

    return phone;
  };

  return (
    <div className="w-full border border-gray-200 rounded-2xl p-4 bg-white">
      <div className="border-b border-gray-200 py-3">
        <div className="flex justify-between items-center">
          <div className="text-[#828282]">이름</div>
          {isLoading ? (
            <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
          ) : (
            <div className="text-md">{userInfo.name || "-"}</div>
          )}
        </div>
      </div>

      <div className="border-b border-gray-200 py-3">
        <div className="flex justify-between items-center">
          <div className="text-[#828282]">이메일</div>
          {isLoading ? (
            <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
          ) : (
            <div className="text-md">{userInfo.email || "-"}</div>
          )}
        </div>
      </div>

      <div className="border-b border-gray-200 py-3">
        <div className="flex justify-between items-center">
          <div className="text-[#828282]">전화번호</div>
          {isLoading ? (
            <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
          ) : (
            <div className="text-md">{formatPhoneNumber(userInfo.phone) || "-"}</div>
          )}
        </div>
      </div>

      <div className="py-3">
        <div className="flex justify-between items-center">
          <div className="text-[#828282]">생년월일</div>
          {isLoading ? (
            <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
          ) : (
            <div className="text-md">{userInfo.birthDate || "-"}</div>
          )}
        </div>
      </div>
    </div>
  );
}
