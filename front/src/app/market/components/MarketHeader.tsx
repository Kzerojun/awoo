"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../../../public/logos/AwOO_logo.svg";
import { BellIcon } from "@heroicons/react/24/outline";
import { MarketTab } from "../types/market";

interface MarketHeaderProps {
  currentTab: MarketTab;
  onTabChange: (tab: MarketTab) => void;
}

export default function MarketHeader({ currentTab, onTabChange }: MarketHeaderProps) {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-[#FCFCFC] flex items-center px-4 justify-between z-50">
      {/* 왼쪽 로고 */}
      <Link href="/home">
        <div className="flex items-center cursor-pointer" onClick={() => router.push("/home")}>
          <Image src={logo} alt="AwOO Logo" width={120} height={120} />
        </div>
      </Link>
      <div className="flex space-x-4 ml-7 mr-2">
        {(["상품", "내 채팅"] as MarketTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`${currentTab === tab ? "text-black" : "text-gray-400"}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </header>
  );
}
