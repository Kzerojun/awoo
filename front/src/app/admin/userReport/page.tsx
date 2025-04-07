"use client";

import { useState, useEffect } from "react";
import ReportList from "./components/ReportList";
import ReportDetailModal from "./components/ReportDetailModal";
import { getReportList, getReportDetail, processReport, Report } from "@/api/admin/admin";

export default function UserReport() {
  // 상태 관리
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 신고 목록 가져오기
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await getReportList();
      if (response.success) {
        setReports(response.response);
        console.log(response);
      } else {
        console.error("신고 목록 조회 실패:", response.error);
      }
    } catch (error) {
      console.error("신고 목록 요청 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 신고 상세 정보 조회 핸들러
  const handleViewDetail = async (reportId: number) => {
    try {
      const response = await getReportDetail(reportId);
      if (response.success) {
        setSelectedReport(response.response);
        setIsModalOpen(true);
      } else {
        console.error("신고 상세 조회 실패:", response.error);
      }
    } catch (error) {
      console.error("신고 상세 요청 오류:", error);
    }
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  // 신고 처리 핸들러
  const handleProcessReport = async (reportId: number, process: string) => {
    try {
      const response = await processReport({ reportId, process });
      if (response.success) {
        alert("신고가 처리되었습니다.");
        fetchReports(); // 목록 새로고침
        handleCloseModal();
      } else {
        alert(`처리 실패: ${response.error}`);
      }
    } catch (error) {
      console.error("신고 처리 요청 오류:", error);
      alert("신고 처리 중 오류가 발생했습니다.");
    }
  };

  // 컴포넌트 마운트 시 목록 불러오기
  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="user-report-container p-4">
      {/* 로딩 표시 */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-500">신고 목록을 불러오는 중입니다...</p>
        </div>
      ) : (
        <>
          {/* 신고 목록 컴포넌트 */}
          <ReportList reports={reports} onViewDetail={handleViewDetail} />

          {/* 신고 상세 정보 모달 */}
          {isModalOpen && selectedReport && (
            <ReportDetailModal
              report={selectedReport}
              onClose={handleCloseModal}
              onProcess={handleProcessReport}
            />
          )}
        </>
      )}
    </div>
  );
}
