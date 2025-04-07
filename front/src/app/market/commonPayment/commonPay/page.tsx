"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import money from "../../../../../public/images/market/money.svg";
import CommonTopBar from "@/common/ui/CommonTopBar";
import CommonSendPasswordConfirm from "./components/CommonSendPasswordConfirm";
import { commonPayment } from "@/api/payment/payment";
import { RootState } from "@/lib/store";
import { getUserInfo } from "@/api/user/auth";
import { toast } from "react-toastify";
import axiosInstance from "@/api/axiosInstance";

interface ProductDetail {
  usedProductId: number;
  title: string;
  content: string;
  price: number;
  imageUrls: string[];
}

export default function CommonPay() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const usedProductId = searchParams.get("usedProductId");

  const [nickname, setNickname] = useState<string>("");
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userState = useSelector((state: RootState) => state.user);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [amount, setAmount] = useState<number>(0);

  // 일반 결제는 수수료가 없음
  const fee = 0;

  // 상품 정보 가져오기
  useEffect(() => {
    if (!usedProductId) return;

    const fetchProductDetail = async () => {
      try {
        const res = await axiosInstance.get(`/used-products/${usedProductId}`);
        const productData = res.data.response;
        console.log("qkqkqkkqkqkqkqkq");
        setProduct(productData);
        setAmount(productData.price);
      } catch (error) {
        console.error("상품 상세 조회 실패", error);
        toast.error("상품 정보를 불러오는데 실패했습니다.");
      }
    };

    fetchProductDetail();
  }, [usedProductId]);

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
    if (!usedProductId || !product) {
      toast.error("상품 정보가 없습니다.");
      return;
    }

    setIsLoading(true);

    try {
      // 일반 결제 API 호출
      const productId = parseInt(usedProductId, 10);
      const response = await commonPayment(productId);

      if (response.success) {
        toast.success("일반 결제가 완료되었습니다.");
        // 성공 시 결제완료 페이지로 이동하면서 금액 정보 전달
        router.push(`/market/commonPayment/commonPayDone?amount=${amount}`);
      } else {
        toast.error(response.error?.message || "일반 결제에 실패했습니다.");
      }
    } catch (error) {
      console.error("일반 결제 처리 중 오류 발생:", error);
      toast.error("결제 처리 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
      setShowPasswordModal(false);
    }
  };

  return (
    <div className="flex flex-col inset-0 bg-white my-10">
      <CommonTopBar title="일반 결제" />

      <div className="flex-1 px-6 py-8 flex flex-col">
        {/* 상단 메시지 */}
        <div className="mb-10 mt-4">
          <h1 className="text-[22px] font-bold leading-tight">
            <span className="text-teal-500">{nickname}</span>님께 송금할
            <br />
            {amount.toLocaleString()} 원을 일반결제로
            <br />
            전송합니다.
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

        {/* 결제 정보 */}
        <div className="bg-teal-50 rounded-lg p-3 mb-10">
          <h2 className="text-lg font-bold mb-2 text-center">결제 금액 안내</h2>
          <ul className="space-y-1 ml-5">
            <li className="flex items-center">
              <span className="text-gray-700 mr-2">•</span>
              <span className="flex-1">총 금액 : {amount.toLocaleString()}원</span>
            </li>
            <li className="flex items-center">
              <span className="text-gray-700 mr-2">•</span>
              <span className="flex-1">수수료: 없음</span>
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
      <CommonSendPasswordConfirm
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onConfirm={handlePasswordConfirmed}
        amount={amount}
        fee={fee}
      />
    </div>
  );
}
