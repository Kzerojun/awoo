import React, { useState } from "react";
import { Report } from "@/api/admin/admin";
import Image from "next/image";
import awooAdmin from "../../../../../public/logos/AwOO_admin.svg";
import cancel from "../../../../../public/icons/admin/cancel.svg";

interface ReportDetailModalProps {
  report: Report;
  onClose: () => void;
  onProcess: (reportId: number, process: string) => void;
}

export default function ReportDetailModal({ report, onClose, onProcess }: ReportDetailModalProps) {
  const [selectedProcess, setSelectedProcess] = useState(report.process);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  // 처리 확인 핸들러
  const handleConfirm = () => {
    onProcess(report.reportId, selectedProcess);
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative">
        {/* 모달 헤더 및 로고 */}
        <div className="flex justify-center items-center p-3 relative">
          <div className="text-teal-500 text-3xl font-bold ">
            <div className="flex items-center justify-center">
              <Image src={awooAdmin} alt="어드민 awoo" height={220} width={220} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 absolute right-4 top-4"
          >
            <Image src={cancel} alt="닫기" height={35} width={35} />
          </button>
        </div>

        {/* 모달 내용 */}
        <div className="p-6">
          {/* 신고자 정보 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">신고자</label>
            <div className="flex items-center">
              <input
                type="text"
                value={report.reporterName}
                readOnly
                className="flex-1 p-2 border rounded-md bg-gray-50"
              />
              <input
                type="text"
                value={report.reporterEmail}
                readOnly
                className="flex-1 p-2 border rounded-md bg-gray-50 ml-2"
              />
            </div>
          </div>

          {/* 신고 대상자 정보 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">신고 대상자</label>
            <div className="flex items-center">
              <input
                type="text"
                value={report.reportedUserName}
                readOnly
                className="flex-1 p-2 border rounded-md bg-gray-50"
              />
              <input
                type="text"
                value={report.reportedUserEmail}
                readOnly
                className="flex-1 p-2 border rounded-md bg-gray-50 ml-2"
              />
            </div>
          </div>

          {/* 신고 정보 */}
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">신고 시각</label>
                <input
                  type="text"
                  value={formatDate(report.reportedAt)}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">상품 ID</label>
                <input
                  type="text"
                  value={report.usedProductId}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* 신고 사유 */}
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">신고 사유</label>
              <input
                type="text"
                value={report.reason}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-50"
              />
            </div>

            {/* 신고 처리 */}
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">신고 처리</label>
              <select
                value={selectedProcess}
                onChange={(e) => setSelectedProcess(e.target.value)}
                className="w-full p-2 border rounded-md h-[42px] bg-white"
              >
                <option value="P">처리 대기</option>
                <option value="W">경고</option>
                <option value="O">영구 제재</option>
              </select>
            </div>
          </div>

          {/* 누적 신고 수 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">누적 신고 횟수</label>
            <div className="p-2 border rounded-md bg-gray-50 flex items-center">
              <span className="px-2 py-1 bg-gray-200 rounded-full text-gray-700 text-sm mr-2">
                {report.reportCount}회
              </span>
              {report.reportCount >= 3 && (
                <span className="text-red-500 text-sm font-medium">
                  * 3회 이상 신고된 사용자입니다. 주의 깊게 검토해주세요.
                </span>
              )}
            </div>
          </div>

          {/* 확인 버튼 */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 transition duration-200"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
