"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import Button from "@/common/ui/Button";
import { reportProduct } from "@/api/market/report/reportProduct";
import CommonTopBar from "@/common/ui/CommonTopBar";

const reasons = [
  { code: "ABUSE", label: "욕설/비하" },
  { code: "FRAUD", label: "사기" },
  { code: "SPAM", label: "스팸/광고" },
  { code: "FALSE_INFORMATION", label: "허위 정보" },
  { code: "HATE_SPEECH", label: "혐오 발언" },
  { code: "SEXUAL_CONTENT", label: "성적 콘텐츠" },
  { code: "OTHER", label: "기타" },
];

export default function ReportPage() {
  const { articleId } = useParams();
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleReport = async () => {
    if (!selected) {
      alert("신고 사유를 선택해주세요.");
      return;
    }
    try {
      await reportProduct(Number(articleId), selected);
      alert("신고가 접수되었습니다.");
      router.push("/market");
    } catch (error) {
      alert("신고 실패");
      console.error(error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <CommonTopBar title="🚨신고하기" leftAction="back" rightAction="cancel" />
      <p className="text-sm text-gray-500 text-center mt-14">신고 사유를 선택해주세요.</p>

      <div className="space-y-2">
        {reasons.map((r) => (
          <button
            key={r.code}
            onClick={() => setSelected(r.code)}
            className={`block w-full text-left px-4 py-2 border rounded ${
              selected === r.code ? "bg-red-100 border-red-400" : "border-gray-200"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-center mt-22">
        <Button
          text="신고하기"
          backgroundColor="error"
          fontColor="white"
          width="long"
          onClick={handleReport}
        />
      </div>
    </div>
  );
}
