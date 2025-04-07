"use client";

import { useEffect, useState } from "react";
import { getUserInfo } from "@/api/user/auth";
import CustomerSupport from "./components/CustomerSupport";
import MyPayment from "./components/MyPayment";
import RegisteredMyPayment from "./components/RegisteredMyPayment";
import MyPet from "./components/MyPet";
import MyProfile from "./components/MyProfile";
import MyTrade from "./components/MyTrade";
import TopBarLogo from "@/common/ui/TopBarLogo";

export default function Home() {
  const [userInfo, setUserInfo] = useState({
    paymentRegister: false,
    // 필요한 경우 다른 사용자 정보도 추가할 수 있습니다
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const data = await getUserInfo();
        console.log("유저 정보 조회 성공:", data);
        setUserInfo({
          paymentRegister: data.paymentRegister,
          // 필요한 다른 사용자 정보도 여기에 추가
        });
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100dvh-7rem)] bg-gray-50 mt-4">
      <TopBarLogo />
      <div className="flex flex-col items-center w-full h-full max-w-md mx-auto px-8 py-6 bg-[#FCFCFC] pt-14">
        <div className="w-full mb-4">
          <MyProfile />
        </div>
        <div className="w-full mb-4 bg-white border border-gray-200 rounded-xl px-3 py-1">
          {isLoading ? (
            <div className="p-4 text-center">멍페이 정보 로딩 중...</div>
          ) : userInfo.paymentRegister ? (
            <RegisteredMyPayment />
          ) : (
            <MyPayment />
          )}
        </div>
        <div className="w-full mb-4 bg-white border border-gray-200 rounded-xl p-3">
          <MyPet />
        </div>
        <div className="w-full mb-4 bg-white border border-gray-200 rounded-xl p-3">
          <MyTrade />
        </div>
        <div className="w-full mb-4 bg-white border border-gray-200 rounded-xl p-3">
          <CustomerSupport />
        </div>
      </div>
    </div>
  );
}
