"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../../../public/logos/AwOO_logo.png";
import { BellIcon } from "@heroicons/react/24/outline";
import { MarketTab } from "../types/market";

interface MarketHeaderProps {
  currentTab: MarketTab;
  onTabChange: (tab: MarketTab) => void;
}

export default function MarketHeader({ currentTab, onTabChange }: MarketHeaderProps) {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-white z-50 flex items-center justify-between px-4">
      <div>
        {/* 왼쪽 로고 */}
        <Link href="/home">
          <div onClick={() => router.push("/market")}>
            <Image src={logo} alt="AwOO Logo" width={100} height={28} />
          </div>
        </Link>
      </div>
      <div className="flex space-x-4">
        {(["상품", "내 채팅"] as MarketTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={` ${currentTab === tab ? "text-black" : "text-gray-400"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 오른쪽 알림 아이콘 */}
      <BellIcon className="h-6 w-6 text-gray-500" />
    </header>
  );
}
