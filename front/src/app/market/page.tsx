"use client";

import { useState } from "react";
import { MarketItem, MarketTab } from "./types/market";
import MarketHeader from "./components/MarketHeader";
import MarketListItem from "./components/MarketListItem";
import SearchBar from "./components/SearchBar";
import ChatList from "./components/ChatList";

export default function MarketPage() {
  const [currentTab, setCurrentTab] = useState<MarketTab>("상품");

  const dummyData: MarketItem[] = [
    {
      id: 1,
      image: "/images/market-dummy/dog-1.jpg",
      title: "검정색 겨울 패딩 팔아요",
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
    {
      id: 3,
      image: "/images/market-dummy/dog-1.jpg",
      title: "사료 미개봉 팝니당",
      time: "2시간 전",
      price: "10,000원",
      views: 200,
      chat: 1,
    },
    {
      id: 4,
      image: "/images/market-dummy/dog-1.jpg",
      title: "개모차 중고로 내놔용",
      time: "2시간 전",
      price: "50,000원",
      views: 450,
      chat: 10,
    },
    {
      id: 5,
      image: "/images/market-dummy/dog-1.jpg",
      title: "귀여운 인형 장난감^^",
      time: "2시간 전",
      price: "50,000원",
      views: 220,
      chat: 5,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <MarketHeader currentTab={currentTab} onTabChange={setCurrentTab} />
      <div className="mt-14 px-4 py-2 flex-1 space-y-4">
        <div className="mb-4">
          <SearchBar />
        </div>
        {currentTab === "상품" ? (
          dummyData.map((item) => <MarketListItem key={item.id} {...item} />)
        ) : (
          <ChatList />
        )}
      </div>
    </div>
  );
}
