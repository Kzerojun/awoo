"use client";

import { useRouter } from "next/navigation";
import TopBar from "@/common/ui/TopBar";
import { BellIcon } from "@heroicons/react/24/outline";
import checkmark from "../../../../../public/icons/mypage/checkmark.svg";
import Image from "next/image";

export default function SignUpDone() {
  const router = useRouter();

  // 계좌 연결 페이지로 이동
  const handleLinkAccount = () => {
    router.push("/my");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopBar title="멍Pay" rightAction={<BellIcon className="h-6 w-6 text-gray-500 mt-1" />} />

      <div className="flex flex-col items-center px-4 pt-14">
        {/* 메인 컨텐츠 - 고정된 간격을 사용하여 위치 조정 */}
        <div className="mt-[110px] mb-[150px] flex flex-col items-center">
          {/* 체크 아이콘 */}
          <div className="flex items-center justify-center mb-3">
            <Image src={checkmark} alt="체크" height={95} width={95} />
          </div>

          {/* 축하 메시지 */}
          <h2 className="text-[23px] font-bold text-center mb-2">노리 아빠님</h2>
          <p className="text-[23px] font-bold text-center">멍페이 가입을 완료했어요</p>
        </div>

        {/* 하단 버튼 - 이제 메인 컨텐츠 바로 아래에 위치 */}
        <div className="w-[270px] max-w-md">
          <button
            onClick={handleLinkAccount}
            className="w-full py-3 bg-[#0DCFAA] rounded-lg text-white font-medium text-lg"
          >
            계좌 연결하기
          </button>
        </div>
      </div>
    </div>
  );
}
