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
import MoungpayJoinModal from "@/app/market/components/MoungpayJoinModel";
import { useAppSelector } from "@/lib/store";

export default function MarketPage() {
  const [currentTab, setCurrentTab] = useState<MarketTab>("상품");
  const [items, setItems] = useState<MarketItem[]>([]);
  const [originalItems, setOriginalItems] = useState<MarketItem[]>([]);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const isPaymentUser = useAppSelector((state) => state.user.paymentRegister);

  const handleWriteClick = () => {
    if (!isPaymentUser) {
      setShowModal(true); // 모달 띄우기
      return;
    }
    router.push("/market/article/write"); // 멍페이 가입자만 진입
  };
  // ✅ 목록 API 연동
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductList();
        const fetchedItems = res.usedProducts;
        setItems(fetchedItems);
        setOriginalItems(fetchedItems);
      } catch (error) {
        console.error("중고거래 목록 로딩 실패", error);
      }
    };
    fetchData();
  }, []);

  // 검색 결과 처리 핸들러
  const handleSearchResults = (searchResults: MarketItem[]) => {
    // 검색 결과가 없으면 빈 배열로, 있으면 검색 결과로 설정
    setItems(searchResults.length > 0 ? searchResults : []);
  };

  // 탭이 변경되면 원래 아이템으로 복원
  const handleTabChange = (tab: MarketTab) => {
    setCurrentTab(tab);
    if (tab === "상품") {
      setItems(originalItems);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MarketHeader currentTab={currentTab} onTabChange={handleTabChange} />
      <div className="mt-14 px-4 py-2 flex-1 space-y-4">
        <div className="mb-4">
          <SearchBar onSearchResults={handleSearchResults} />
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
        onClick={handleWriteClick}
      />
      <MoungpayJoinModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
