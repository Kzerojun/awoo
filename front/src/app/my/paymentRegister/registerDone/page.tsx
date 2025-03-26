"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import TopBar from "@/common/ui/TopBar";
import { BellIcon } from "@heroicons/react/24/outline";
import check from "../../../../../public/icons/mypage/checkmark.svg";

export default function RegisterDone() {
  const router = useRouter();

  // 마이페이지로 이동
  const handleGoToMyPage = () => {
    router.push("/my");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopBar title="멍Pay" rightAction={<BellIcon className="h-6 w-6 text-gray-500 mt-1" />} />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* 체크 아이콘 */}
        <div className="mb-6">
          <Image src={check} alt="성공" width={90} height={90} className="mx-auto" />
        </div>

        {/* 성공 메시지 - 이름과 성공 메시지를 더 가깝게 배치 */}
        <h2 className="text-2xl font-bold text-center mb-1">노리 아빠님</h2>
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
