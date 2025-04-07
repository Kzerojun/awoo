"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import logoIcon from "../../../../public/logos/AwOO_logo.svg"; // 로고 이미지 경로에 맞게 수정

export default function Header() {
  const pathname = usePathname();
  const userName = useSelector((state: RootState) => state.user.name);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 flex justify-between items-center px-4 py-4 ">
      {/* 왼쪽: 로고 */}
      <div className="flex items-center gap-2">
        <Image src={logoIcon} alt="AwOO 로고" width={100} height={100} />
      </div>

      {/* 오른쪽: 사용자 이름 */}
      <div className="text-m font-medium text-gray-700 mr-2">
        {userName ? `${userName}님` : "사용자님"}
      </div>
    </header>
  );
}
