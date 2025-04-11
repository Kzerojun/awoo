import React, { useState } from "react";
import { Report } from "@/api/admin/admin";

interface ReportListProps {
  reports: Report[];
  onViewDetail: (reportId: number) => void;
}

export default function ReportList({ reports, onViewDetail }: ReportListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  // 페이지네이션 처리
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(reports.length / reportsPerPage);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  // 처리 상태 표시 스타일
  const getProcessStatusStyle = (process: string) => {
    switch (process) {
      case "P":
        return "bg-yellow-100 text-yellow-700"; // 처리 대기
      case "W":
        return "bg-orange-100 text-orange-700"; // 경고
      case "O":
        return "bg-red-100 text-red-700"; // 영구 제재
      default:
        return "bg-green-100 text-green-700"; // 기본/정상
    }
  };

  // 처리 상태 텍스트 변환
  const getProcessStatusText = (process: string) => {
    switch (process) {
      case "P":
        return "처리 대기";
      case "W":
        return "경고";
      case "O":
        return "영구 제재";
      default:
        return "정상";
    }
  };

  return (
    <div className="report-list-container">
      {/* 테이블 헤더 */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4 text-left text-gray-600 font-medium">신고 대상자</th>
              <th className="px-6 py-4 text-left text-gray-600 font-medium">신고자</th>
              <th className="px-6 py-4 text-left text-gray-600 font-medium">신고 날짜</th>
              <th className="px-6 py-4 text-left text-gray-600 font-medium">신고 사유</th>
              <th className="px-6 py-4 text-center text-gray-600 font-medium">상세보기</th>
              <th className="px-6 py-4 text-center text-gray-600 font-medium">누적 신고 수</th>
              <th className="px-6 py-4 text-center text-gray-600 font-medium">처리</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.length > 0 ? (
              currentReports.map((report, index) => (
                <tr
                  key={report.reportId}
                  className={`hover:bg-gray-50 transition-colors duration-150 ${
                    index !== currentReports.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-medium mr-3">
                        {report.reportedUserName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{report.reportedUserName}</div>
                        <div className="text-sm text-gray-500">{report.reportedUserEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <div className="font-medium text-gray-800">{report.reporterName}</div>
                    <div className="text-sm text-gray-500">{report.reporterEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{formatDate(report.reportedAt)}</td>
                  <td className="px-6 py-4 text-gray-700">{report.reason}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onViewDetail(report.reportId)}
                      className="px-3 py-1 bg-teal-100 text-teal-600 text-xs rounded-full hover:bg-teal-200 transition-colors duration-150 shadow-sm"
                    >
                      상세보기
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-gray-100 text-gray-700">
                      {report.reportCount}회
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium inline-block
                      ${getProcessStatusStyle(report.process)}`}
                    >
                      {getProcessStatusText(report.process)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  등록된 신고가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="pagination flex justify-center items-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition-colors duration-150"
          >
            &lt;
          </button>

          {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
            // 현재 페이지를 중심으로 표시할 페이지 번호 계산
            let pageNum = currentPage;
            if (currentPage <= 3) {
              pageNum = index + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + index;
            } else {
              pageNum = currentPage - 2 + index;
            }

            // 페이지 범위 체크
            if (pageNum <= 0 || pageNum > totalPages) return null;

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-150
                  ${
                    currentPage === pageNum
                      ? "bg-teal-500 text-white border border-teal-500"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition-colors duration-150"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
