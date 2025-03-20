"use client";
import my from "../../../../public/icons/bottombar/deactive/my.svg";
import Image from "next/image";
import vector from "../../../../public/icons/mypage/vector.svg";

export default function MyProfile() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <div className="rounded-full mr-3 overflow-hidden">
          <Image src={my} alt="프로필 이미지" width={60} height={60} className="object-cover" />
        </div>
        <div>
          <div className="flex items-center">
            <span className="text-teal-400 text-xl font-bold">노리 아빠</span>
            <span className="ml-1 text-lg">님,</span>
          </div>
          <div className="text-lg">반가워요!</div>
        </div>
      </div>
      <div className="text-gray-400 mr-2">
        <Image src={vector} width={10} height={10} alt="화살표" />
      </div>
    </div>
  );
}
