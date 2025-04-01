"use client";
import CommonTopBar from "@/common/ui/CommonTopBar";
import Button from "@/common/ui/Button";
import { useState } from "react";
import Image from "next/image";
import checkIcon from "../../../../../public/icons/mypage/check.svg";

export default function Withdraw() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col w-full h-full max-w-md mx-auto bg-[#FCFCFC] pt-14">
      <CommonTopBar title="탈퇴" />

      <div className="w-full px-6 py-6">
        {/* 상단 안내 문구 */}
        <div className="text-center mb-6">
          <h2 className="text-xl mb-2">AwOO를 탈퇴하시겠습니까?</h2>
          <p className="text-gray-500 text-[12px]">아래 내용을 읽고 동의해주세요</p>
        </div>

        {/* 회원 탈퇴 안내 */}
        <div className="mb-5">
          <h3 className="text-[15px] font-bold mb-4">AwOO 회원 탈퇴 안내</h3>

          <div className="space-y-2 bg-white border border-gray-200 rounded-xl p-3">
            <div className="flex items-start">
              <div className="text-gray-400 mr-2 min-w-[15px] w-[15px] h-[15px] flex-shrink-0 mt-2">
                <Image src={checkIcon} alt="체크" width={13} height={13} />
              </div>
              <p className="text-[12px]">
                AwOO 계좌를 보유 중이라면, 계좌 해지 후 탈퇴할 수 있습니다.
              </p>
            </div>

            <div className="flex items-start">
              <div className="text-gray-400 mr-2 min-w-[15px] w-[15px] h-[15px] flex-shrink-0 mt-2">
                <Image src={checkIcon} alt="체크" width={13} height={13} />
              </div>
              <p className="text-[12px]">
                대출 상환이 완료되지 않았거나 카카오뱅크를 거쳐 외국환은행으로 지정한 경우, 탈퇴할
                수 없습니다.
              </p>
            </div>

            <div className="flex items-start">
              <div className="text-gray-400 mr-2 min-w-[15px] w-[15px] h-[15px] flex-shrink-0 mt-2">
                <Image src={checkIcon} alt="체크" width={13} height={13} />
              </div>
              <p className="text-[12px]">
                개인공고 박스 남기기 설정한 경우, 설정 해지 후 탈퇴할 수 있습니다.
              </p>
            </div>

            <div className="flex items-start">
              <div className="text-gray-400 mr-2 min-w-[15px] w-[15px] h-[15px] flex-shrink-0 mt-2">
                <Image src={checkIcon} alt="체크" width={13} height={13} />
              </div>
              <p className="text-[12px]">
                mini의 경우 탈퇴 후 30일이 지나야 다시 개설할 수 있습니다.
              </p>
            </div>

            <div className="flex items-start">
              <div className="text-gray-400 mr-2 min-w-[15px] w-[15px] h-[15px] flex-shrink-0 mt-2">
                <Image src={checkIcon} alt="체크" width={13} height={13} />
              </div>
              <p className="text-[12px]">
                브랜드쿠폰의 경우 재가입 시 기존 수신했던 문서를 조회할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 개인정보 삭제방침 안내 */}
        <div className="mb-3">
          <h3 className="text-[15px] font-bold mb-4">AwOO 개인정보 삭제방침 안내</h3>

          <div className="space-y-2 bg-white border border-gray-200 rounded-xl p-3">
            <div className="flex items-start">
              <div className="text-gray-400 mr-2 min-w-[15px] w-[15px] h-[15px] flex-shrink-0 mt-2">
                <Image src={checkIcon} alt="체크" width={13} height={13} />
              </div>
              <p className="text-[12px]">
                금융 거래 등 상품/서비스를 이용하지 않으신 회원님의 회원정보는 AwOO 탈퇴 즉시
                삭제됩니다.
              </p>
            </div>

            <div className="flex items-start">
              <div className="text-gray-400 mr-2 min-w-[15px] w-[15px] h-[15px] flex-shrink-0 mt-2">
                <Image src={checkIcon} alt="체크" width={13} height={13} />
              </div>
              <p className="text-[12px]">
                상품/서비스를 이용하신 고객님의 개인(신용)정보는 금융거래 종료 후 5년 이내에 파기
                또는 다른 정보와 분리하여 안전하게 보관됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 동의 체크박스 */}
        <div className="flex items-center mb-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 cursor-pointer ${isChecked ? "bg-teal-400 border-teal-400" : "border-gray-300"}`}
            onClick={() => setIsChecked(!isChecked)}
          >
            {isChecked && (
              <Image src={checkIcon} alt="체크" width={16} height={16} className="text-white" />
            )}
          </div>
          <span className={`ml-2 ${isChecked ? "" : "text-gray-500"}`}>동의합니다</span>
        </div>

        {/* 탈퇴하기 버튼 */}
        <Button
          text="탈퇴하기"
          backgroundColor={isChecked ? "aqua" : "gray-200"}
          fontColor="custom-white"
          disabled={!isChecked}
          className="w-full"
        />
      </div>
    </div>
  );
}
