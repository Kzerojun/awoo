"use client";

import Image from "next/image";
import puppy from "../../../../../../public/icons/home/home-dog-2.png"; // 강아지 이미지 경로에 맞게 수정해주세요

export default function WalkReportPreview() {
  return (
    <div className="w-full max-w-sm bg-[#E0F7F3] rounded-lg shadow-sm flex justify-between items-end relative overflow-hidden">
      {/* 말풍선 */}
      <div className="absolute top-4 left-5 bg-white px-4 py-2 rounded-xl shadow-sm text-sm text-gray-700 z-10">
        곧 여기에서 산책 <br />
        리포트를 볼 수 있어요 !
        <div className="absolute -bottom-1 left-28 w-4 h-4 bg-white rotate-45 transform origin-center shadow"></div>
      </div>

      {/* 강아지 이미지 */}
      <div className="ml-auto -mt-6 ">
        <Image src={puppy} alt="강아지 이미지" width={200} height={200} />
      </div>
    </div>
  );
}
