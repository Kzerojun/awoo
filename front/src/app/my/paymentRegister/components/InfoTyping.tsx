"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/api/user/auth";
import { requestPhoneAuth } from "@/api/payment/payment";
import { toast } from "react-toastify";

interface InfoTypingFormProps {
  initialStep?: number;
  onComplete?: (data: { name: string; phoneNumber: string }) => void;
}

export default function InfoTyping({ initialStep = 1, onComplete }: InfoTypingFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(initialStep);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 사용자 정보 저장
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
  });

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo({
          name: data.name,
          phone: data.phone,
        });
        console.log("사용자 정보 로드 완료:", data);
      } catch (error) {
        console.error("사용자 정보 로드 실패:", error);
        toast.error("사용자 정보를 불러오는데 실패했습니다.");
      }
    };

    fetchUserInfo();
  }, []);

  // 키보드 표시 여부 감지
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const threshold = window.innerWidth < 768 ? 550 : 700;
      setIsKeyboardVisible(windowHeight < threshold);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 다음 단계로 이동 또는 인증 요청
  const handleAction = async () => {
    if (step === 1 && name.trim()) {
      setStep(2);
    } else if (step === 2 && phoneNumber.trim()) {
      setIsSubmitting(true);

      try {
        // 입력값과 사용자 정보 비교
        if (name.trim() !== userInfo.name) {
          toast.error("입력한 이름이 회원 정보와 일치하지 않습니다.");
          setIsSubmitting(false);
          return;
        }

        // 전화번호 형식 통일 (하이픈 제거)
        const cleanedInputPhone = phoneNumber.replace(/-/g, "");
        const cleanedUserPhone = userInfo.phone.replace(/-/g, "");

        if (cleanedInputPhone !== cleanedUserPhone) {
          toast.error("입력한 전화번호가 회원 정보와 일치하지 않습니다.");
          setIsSubmitting(false);
          return;
        }

        // 인증 요청 API a호출
        await requestPhoneAuth({
          name: name.trim(),
          phone: phoneNumber.trim(),
        });

        // 세션 스토리지에 전화번호 저장 (인증번호 검증에 필요)
        sessionStorage.setItem("verification_phone", phoneNumber.trim());

        console.log("인증 요청 성공:", { name, phoneNumber });
        toast.success("인증번호가 발송되었습니다.");

        // 완료 콜백이 있으면 호출
        if (onComplete) {
          onComplete({ name, phoneNumber });
        }

        // 인증번호 입력 페이지로 이동
        router.push("/my/paymentRegister/certificateNumber");
      } catch (error) {
        console.error("인증 요청 오류:", error);
        toast.error("인증번호 발송에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // 이름 입력 처리
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // 전화번호 입력 처리
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자와 하이픈만 허용
    const cleaned = e.target.value.replace(/[^0-9-]/g, "");
    setPhoneNumber(cleaned);
  };

  return (
    <div className="flex flex-col min-h-[calc(60vh-56px)] mt-[40px]">
      {/* 입력 폼 - 상단 고정 */}
      <div className="p-6">
        {step === 1 ? (
          <div className="w-full">
            <h2 className="text-lg font-bold mb-3">이름을 입력해 주세요</h2>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="이름을 입력해 주세요"
              autoFocus
            />
          </div>
        ) : (
          <div className="w-full">
            <h2 className="text-lg font-bold mb-3">휴대폰 정보를 입력해 주세요</h2>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="w-full p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="01012345678"
              autoFocus
            />
            <div className="mt-4">
              <input
                type="text"
                value={name}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                placeholder="이름"
              />
            </div>
          </div>
        )}
      </div>

      {/* 버튼 영역 - 키보드에 따라 유동적 위치 */}
      <div
        className={`p-4 ${isKeyboardVisible ? "mt-auto" : "flex-grow flex items-center justify-center"}`}
      >
        <button
          onClick={handleAction}
          disabled={(step === 1 ? !name.trim() : !phoneNumber.trim()) || isSubmitting}
          className={`w-[180px] py-3 rounded-full ${
            ((step === 1 && name.trim()) || (step === 2 && phoneNumber.trim())) && !isSubmitting
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-500"
          } font-medium transition-colors`}
        >
          {isSubmitting ? "처리 중..." : step === 1 ? "다음" : "인증 요청"}
        </button>
      </div>
    </div>
  );
}
