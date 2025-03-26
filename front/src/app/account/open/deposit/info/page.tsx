"use client";

import { useState } from "react";
import CommonTopBar from "@/common/ui/CommonTopBar";
import AwOOHeader from "./components/LogoHeader";
import PasswordInput from "./components/PasswordInput";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/common/ui/Button";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function DepositInfoPage() {
  const [question1, setQuestion1] = useState<"yes" | "no" | null>(null);
  const [question2, setQuestion2] = useState<"yes" | "no" | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  return (
    <div>
      {/* 공통 상단바 */}
      <CommonTopBar title="입출금 통장 개설" leftAction="back" rightAction="cancel" />
      <div className="pt-16">
        <AwOOHeader />

        {/* 🔐 통장 비밀번호 설정 */}
        <PasswordInput />

        <div className="flex flex-col gap-6 px-4 py-4">
          {/* 질문 1 */}
          <div>
            <p className="text-sm font-medium mb-3">
              타인으로부터 통장대여 요청을 받은 사실이 있나요?
            </p>
            <div className="flex gap-1">
              {/* 예 */}
              <div
                onClick={() => setQuestion1("yes")}
                className={`flex items-center gap-1 px-2 py-1 text-sm rounded-md cursor-pointer `}
              >
                <CheckCircleIcon
                  className={`w-6 h-6 ml-3 ${question1 === "yes" ? "text-aqua" : "text-gray-300"}`}
                />
                <span className="mr-20">예</span>
              </div>

              {/* 아니요 */}
              <div
                onClick={() => setQuestion1("no")}
                className={`flex items-center gap-1 px-2 py-1 text-sm rounded-md cursor-pointer `}
              >
                <CheckCircleIcon
                  className={`w-6 h-6 ${question1 === "no" ? "text-aqua" : "text-gray-300"}`}
                />
                <span>아니요</span>
              </div>
            </div>
          </div>

          {/* 질문 2 */}
          <div>
            <p className="text-sm font-medium mb-3">
              타인으로부터 신용점수 상향, 대출 등의 목적으로 통장개설을 요청받은 사실이 있나요?
            </p>
            <div className="flex gap-1">
              {/* 예 */}
              <div
                onClick={() => setQuestion2("yes")}
                className={`flex items-center gap-1 px-2 py-1 text-sm rounded-md cursor-pointer 
                }`}
              >
                <CheckCircleIcon
                  className={`w-6 h-6 ml-3 ${question2 === "yes" ? "text-aqua" : "text-gray-300"}`}
                />
                <span className="mr-20">예</span>
              </div>

              {/* 아니요 */}
              <div
                onClick={() => setQuestion2("no")}
                className={`flex items-center gap-1 px-2 py-1 text-sm rounded-md cursor-pointer`}
              >
                <CheckCircleIcon
                  className={`w-6 h-6 ${question2 === "no" ? "text-aqua" : "text-gray-300"}`}
                />
                <span>아니요</span>
              </div>
            </div>
            {/* 통장 양도 금지 안내 박스 */}
            <div className="min-h-[100px] bg-gray-300 rounded-md px-4 py-4 mt-6 mb-4">
              {/* TODO: 통장 양도 금지 안내 문구 들어갈 자리 */}
              <p>통장 양도 금지 안내</p>
            </div>

            {/* 금융거래 이체한도 안내 박스 */}
            <div className="min-h-[100px] bg-gray-300 rounded-md px-4 py-4">
              {/* TODO: 금융거래 이체한도 안내 문구 들어갈 자리 */}
              <p>금융거래 이체한도 안내</p>
            </div>

            {/* ✅ 최종 동의 + 버튼 */}
            <div className="px-4 py-6">
              {/* 체크박스 + 문구 */}
              <div
                onClick={() => {
                  setAgreed(!agreed);
                  if (showWarning) setShowWarning(false); // 이전 경고 제거
                }}
                className="flex items-start gap-1 cursor-pointer select-none mb-4"
              >
                <div
                  className={`w-5 h-5 flex items-center justify-center border rounded-sm shrink-0 mt-[2px] ${
                    agreed ? "bg-aqua border-aqua" : "border-gray-300 bg-white"
                  }`}
                >
                  {agreed && <CheckIcon className="w-4 h-4 text-white" />}
                </div>

                <p className="text-sm text-gray-700 leading-snug">
                  위 내용을 모두 확인하였으며, 통장 개설에 동의합니다.
                </p>
              </div>

              {/* 🚨 동의 안 했을 때 경고 문구 */}
              {showWarning && (
                <p className="text-error text-center text-sm mb-4 ">
                  통장 개설을 위해 동의 및 선택은 필수입니다.
                </p>
              )}

              {/* 다음 버튼 */}
              <Button
                text="다음"
                onClick={() => {
                  if (!agreed) {
                    setShowWarning(true);
                    return;
                  }

                  // ✅ 동의한 경우 다음 단계로 이동
                  console.log("✅ 다음 단계로 이동");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
