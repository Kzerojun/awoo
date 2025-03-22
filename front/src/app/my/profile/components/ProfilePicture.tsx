"use client";
import my from "../../../../../public/icons/bottombar/active/my_aqua.svg";
import Image from "next/image";

export default function ProfilePicture() {
  return (
    <div className="flex flex-col items-center my-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
          <Image src={my} alt="프로필 이미지" width={80} height={80} className="object-cover" />
        </div>
      </div>
      <div className="mt-1 text-xl font-bold">노리 아빠</div>
    </div>
  );
}
