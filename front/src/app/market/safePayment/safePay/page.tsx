"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import money from "../../../../../public/images/market/money.svg";
import CommonTopBar from "@/common/ui/CommonTopBar";
import SafeSendConfirmPassword from "./components/SafeSendConfirmPassword";
import { makeSafePayment } from "@/api/payment/payment";
import { RootState } from "@/lib/store";
import { getUserInfo } from "@/api/user/auth";
import { toast } from "react-toastify";

export default function SafePay() {
  const router = useRouter();
  const [nickname, setNickname] = useState<string>("");
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userState = useSelector((state: RootState) => state.user);

  // 상품 가격 (실제로는 props나 URL 파라미터로 받아올 수 있음)
  const amount = 15000;
  const fee = Math.round(amount * 0.015); // 1.5% 수수료

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Redux store에 닉네임이 이미 있으면 API 호출 건너뛰기
        if (userState.nickname) {
          setNickname(userState.nickname);
          return;
        }

        // Redux store에 닉네임이 없으면 API 호출
        const userInfo = await getUserInfo();
        setNickname(userInfo.nickname);
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        setNickname("사용자"); // 에러 시 기본값
      }
    };

    fetchUserInfo();
  }, [userState]);

  // 확인 버튼 처리
  const handleConfirm = () => {
    setShowPasswordModal(true);
  };

  // 비밀번호 확인 성공 시 처리
  const handlePasswordConfirmed = async (password: string) => {
    setIsLoading(true);

    try {
      // 안심 결제 API 호출
      const response = await makeSafePayment(amount);

      if (response.success) {
        toast.success("안심 결제가 완료되었습니다.");
        // 거래 성공 페이지로 이동 또는 다른 처리
        router.push("/market/safePayment/safePayDone");
      } else {
        toast.error(response.error?.message || "안심 결제에 실패했습니다.");
      }
    } catch (error) {
      console.error("안심 결제 처리 중 오류 발생:", error);
      toast.error("결제 처리 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
      setShowPasswordModal(false);
    }
  };

  return (
    <div className="flex flex-col inset-0 bg-white my-10">
      <CommonTopBar title="안심 결제" />

      <div className="flex-1 px-6 py-8 flex flex-col">
        {/* 상단 메시지 */}
        <div className="mb-10 mt-4">
          <h1 className="text-[22px] font-bold leading-tight">
            <span className="text-teal-500">{nickname}</span>님께 송금할
            <br />
            {amount.toLocaleString()} 원을 안심결제로
            <br />
            보관합니다.
          </h1>
        </div>

        {/* 코인 이미지 */}
        <div className="flex justify-center mb-10">
          <Image
            src={money}
            alt="금화 이미지"
            width={180}
            height={180}
            className="object-contain transform rotate-340"
            unoptimized // Next.js 이미지 최적화 비활성화 (외부 이미지 사용 시)
          />
        </div>

        {/* 수수료 정보 */}
        <div className="bg-teal-50 rounded-lg p-3 mb-10">
          <h2 className="text-lg font-bold mb-2 text-center">구매자 부담 수수료 내역 안내</h2>
          <ul className="space-y-1 ml-5">
            <li className="flex items-center">
              <span className="text-gray-700 mr-2">•</span>
              <span className="flex-1">총 금액 : {amount.toLocaleString()}원</span>
            </li>
            <li className="flex items-center">
              <span className="text-gray-700 mr-2">•</span>
              <span className="flex-1">수수료: {fee.toLocaleString()}원 (총금액 X 1.5%)</span>
            </li>
          </ul>
        </div>

        {/* 빈 공간 */}
        <div className="flex-grow"></div>

        {/* 확인 버튼 */}
        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className="w-full py-2 bg-teal-500 text-white text-xl font-medium rounded-lg hover:bg-teal-600 transition-colors mb-6"
        >
          {isLoading ? "처리 중..." : "확인"}
        </button>
      </div>

      {/* 비밀번호 확인 모달 */}
      <SafeSendConfirmPassword
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onConfirm={handlePasswordConfirmed}
        amount={amount}
        fee={fee}
      />
    </div>
  );
}
