"use client";
import { useState, useEffect } from "react";
import CommonTopBar from "@/common/ui/TopBar";
import SelectTopBar from "./components/SelectTopBar";
import Selling from "./components/Selling";
import SellDone from "./components/SellDone";
import { getMySales, SaleStatus } from "@/api/my/sell/sell";
import { AnimatePresence } from "framer-motion";

export default function SellHistory() {
  const [activeTab, setActiveTab] = useState<"selling" | "completed">("selling");
  const [salesData, setSalesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 판매 상품 데이터 가져오기
  const fetchSalesData = async (status?: SaleStatus) => {
    try {
      setLoading(true);
      const response = await getMySales(status);
      if (response.success) {
        setSalesData(response.response.sales);
      }
    } catch (error) {
      console.error("판매 내역 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 탭 변경 핸들러
  const handleTabChange = (tab: "selling" | "completed") => {
    setActiveTab(tab);
    if (tab === "selling") {
      // 판매중, 예약중 상품 (SA, RE)
      fetchSalesData("SA");
    } else {
      // 판매완료 상품 (SO)
      fetchSalesData("SO");
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchSalesData("SA"); // 기본적으로 판매중 상품 로드
  }, []);

  return (
    <div className="h-screen bg-white">
      <CommonTopBar title="판매 내역" />

      {/* 탭 선택 */}
      <SelectTopBar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* 판매 내역 컨텐츠 */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "selling" ? (
            <Selling
              key="selling"
              salesData={salesData}
              loading={loading}
              onRefresh={() => fetchSalesData("SA")}
            />
          ) : (
            <SellDone key="completed" salesData={salesData} loading={loading} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
