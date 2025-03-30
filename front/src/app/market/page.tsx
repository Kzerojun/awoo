"use client";

import { useState, useEffect } from "react";
import { MarketItem, MarketTab } from "./types/market";
import MarketHeader from "./components/MarketHeader";
import MarketListItem from "./components/MarketListItem";
import SearchBar from "./components/SearchBar";
import ChatList from "./components/ChatList";
import Button from "@/common/ui/Button";
import { useRouter } from "next/navigation";
import { getProductList } from "@/api/market/read/getList"; 

export default function MarketPage() {
  const [currentTab, setCurrentTab] = useState<MarketTab>("상품");
  const [items, setItems] = useState<MarketItem[]>([]);
  const router = useRouter();

  // ✅ 목록 API 연동
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductList();
        setItems(res.usedProducts); // 백엔드에서 받아온 response 적용
      } catch (error) {
        console.error("중고거래 목록 로딩 실패", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <MarketHeader currentTab={currentTab} onTabChange={setCurrentTab} />
      <div className="mt-14 px-4 py-2 flex-1 space-y-4">
        <div className="mb-4">
          <SearchBar />
        </div>

        {/* 상품탭 */}
        {currentTab === "상품" ? (
          items.length > 0 ? (
            items.map((item) => (
              <MarketListItem
                key={item.productId}
                {...item}
                // ✅ 상세 페이지로 연결 준비
                onClick={() => router.push(`/market/${item.productId}`)}
              />
            ))
          ) : (
            <p>등록된 상품이 없습니다.</p>
          )
        ) : (
          <ChatList />
        )}
      </div>

      <Button
        text="+ 글쓰기"
        textSize="medium"
        fontBold="base"
        width="short"
        className="fixed bottom-16 right-3 shadow-lg z-50"
        backgroundColor="aqua"
        fontColor="custom-white"
        onClick={() => router.push("/market/article/write")}
      />
    </div>
  );
}
