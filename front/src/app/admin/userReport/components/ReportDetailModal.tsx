import React, { useState } from "react";
import { ReportData } from "../data/mockData";
import { reporterData, resolutionOptions } from "../data/mockData";
import awooAdmin from "../../../../../public/logos/AwOO_admin.svg";
import Image from "next/image";
import cancel from "../../../../../public/icons/admin/cancel.svg";

interface ReportDetailModalProps {
  report: ReportData;
  onClose: () => void;
  onProcess: (reportId: number, resolution: string) => void;
}

export default function ReportDetailModal({ report, onClose, onProcess }: ReportDetailModalProps) {
  const [selectedResolution, setSelectedResolution] = useState(report.resolution);

  // 목 데이터에서 신고자 이름 가져오기
  const reporterName = reporterData[report.id] || "신고자 정보 없음";

  // 처리 결과 옵션 (대기 상태 제외)
  const processOptions = resolutionOptions.filter((option) => option !== "대기");

  // 처리 확인 핸들러
  const handleConfirm = () => {
    onProcess(report.id, selectedResolution);
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
            <input
              type="text"
              value={reporterName}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* 신고 대상자 정보 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">신고 대상자</label>
            <input
              type="text"
              value={report.username}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* 신고 사유 */}
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">신고 사유</label>
              <div className="p-2 border rounded-md bg-gray-50">{report.reason}</div>
            </div>

            {/* 신고 처리 */}
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">신고 처리</label>
              <select
                value={selectedResolution}
                onChange={(e) => setSelectedResolution(e.target.value)}
                className="w-full p-2 border rounded-md h-[42px] bg-gray-50"
              >
                {processOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 신고 내용 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">신고 내용</label>
            <textarea
              value={report.content}
              readOnly
              className="w-full p-3 border rounded-md h-32 bg-gray-50 resize-none"
            />
          </div>

          {/* 확인 버튼 */}
          <div className="flex justify-center">
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
