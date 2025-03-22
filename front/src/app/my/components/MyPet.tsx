"use client";
import vector from "../../../../public/icons/mypage/vector.svg";
import Image from "next/image";
import my from "../../../../public/icons/bottombar/deactive/my.svg";
import nori1 from "../../../../public/icons/mypage/nori-1.svg";
import nori2 from "../../../../public/icons/mypage/nori-2.svg";
import nori3 from "../../../../public/icons/mypage/nori-3.svg";
import Link from "next/link";

export default function MyPet() {
  return (
    <Link href="my/pet" className="w-full block">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="text-xs text-[#828282] ml-1">나의 반려동물 보러 가기</div>
          </div>
          <div className="mr-3 mt-2">
            <div className="flex space-x-4 ml-1">
              <Image src={nori1} alt="반려동물 아이콘" width={60} height={60} />
              <Image src={nori2} alt="반려동물 아이콘" width={60} height={60} />
              <Image src={nori3} alt="반려동물 아이콘" width={60} height={60} />
            </div>
          </div>
        </div>
        <div className="text-gray-400">
          <Image src={vector} alt="화살표" />
        </div>
      </div>
    </Link>
  );
}
