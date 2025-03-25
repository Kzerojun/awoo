"use client";

import { useState } from "react";
import ReportList from "./components/ReportList";
import ReportDetailModal from "./components/ReportDetailModal";

import { ReportData, reportListData, reportDetailData, reporterData } from "./data/mockData";

export default function UserReport() {
  // 선택된 신고 상세 정보와 모달 상태 관리
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 목 데이터 가져오기
  const reportData = reportListData;

  // 신고 상세 정보 조회 핸들러
  const handleViewDetail = (report: ReportData) => {
    // 실제 API 호출 시 해당 신고 ID로 상세 정보를 가져오는 로직이 필요
    // 여기서는 목 데이터에서 콘텐츠 정보 가져오기
    setSelectedReport({
      ...report,
      content: reportDetailData[report.id] || "신고 내용이 없습니다.",
    });
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  // 신고 처리 핸들러
  const handleProcessReport = (reportId: number, resolution: string) => {
    // 실제 API 호출 시 해당 신고 ID에 대한 처리 결과를 업데이트하는 로직이 필요
    console.log(`신고 ID: ${reportId}, 처리 결과: ${resolution}`);
    handleCloseModal();
    // 처리 후 목록 새로고침 로직이 필요
  };

  return (
    <div className="user-report-container">
      {/* 신고 목록 컴포넌트 */}
      <ReportList reports={reportData} onViewDetail={handleViewDetail} />

      {/* 신고 상세 정보 모달 */}
      {isModalOpen && selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={handleCloseModal}
          onProcess={handleProcessReport}
        />
      )}
    </div>
  );
}
