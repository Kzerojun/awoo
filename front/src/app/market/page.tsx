"use client";

import { useState } from "react";
import { MarketItem, MarketTab } from "./types/market";
import MarketHeader from "./components/MarketHeader";
import MarketListItem from "./components/MarketListItem";

export default function MarketPage() {
  const [currentTab, setCurrentTab] = useState<MarketTab>("상품");

  const dummyData: MarketItem[] = [
    {
      id: 1,
      image: "/images/market-dummy/dog-1.jpg",
      title: "말티즈 겨울 패딩 팔아요",
      time: "7분 전",
      price: "15,000원",
      views: 22,
      chat: 2,
    },
    {
      id: 2,
      image: "/images/market-dummy/dog-2.jpg",
      title: "강아지 양말!!!",
      time: "30분 전",
      price: "3,000원",
      views: 10,
      chat: 0,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <MarketHeader currentTab={currentTab} onTabChange={setCurrentTab} />
      <div className="mt-14 px-4 py-2 flex-1 space-y-4">
        {currentTab === "상품" ? (
          dummyData.map((item) => <MarketListItem key={item.id} {...item} />)
        ) : (
          <p className="text-center text-gray-400 py-20">채팅 목록이 없습니다 🐶</p>
        )}
      </div>
    </div>
  );
}
