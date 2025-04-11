"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../../public/logos/AwOO_logo.svg";
import { BellIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

interface TopBarLogoProps {
  rightAction?: React.ReactNode; // 선택적 우측 액션 (필요한 경우 사용)
}

const TopBarLogo: React.FC<TopBarLogoProps> = ({ rightAction }) => {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-[#FCFCFC] flex items-center px-4 justify-between z-50">
      {/* 왼쪽 로고 */}
      <Link href="/home">
        <div className="flex items-center cursor-pointer mt-3" onClick={() => router.push("/home")}>
          <Image src={logo} alt="AwOO Logo" width={120} height={120} />
        </div>
      </Link>
      {/* <BellIcon className="h-7 w-7 text-gray-500 mt-4 mr-4" /> */}
      <CalendarDaysIcon
        className="h-7 w-7 text-gray-500 mt-4 mr-4"
        onClick={() => router.push("/my/pet/calendar")}
      />

      {/* 우측 액션 (옵션) */}
      {rightAction && <div>{rightAction}</div>}
    </header>
  );
};

export default TopBarLogo;
