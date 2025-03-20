"use client";
import vector from "../../../../public/icons/mypage/vector.svg";
import Image from "next/image";
import my from "../../../../public/icons/bottombar/deactive/my.svg";

export default function MyPet() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="text-xs text-[#828282] ml-1">나의 반려동물 보러 가기</div>
        </div>
        <div className="mr-3 mt-2">
          <div className="flex space-x-4 ml-1">
            <Image src={my} alt="반려동물 아이콘" width={43} height={43} />
            <Image src={my} alt="반려동물 아이콘" width={43} height={43} />
            <Image src={my} alt="반려동물 아이콘" width={43} height={43} />
          </div>
        </div>
      </div>
      <div className="text-gray-400">
        <Image src={vector} alt="화살표" />
      </div>
    </div>
  );
}
