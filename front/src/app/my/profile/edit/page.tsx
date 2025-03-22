"use client";
import TopBar from "@/common/ui/TopBar";
import Image from "next/image";
import Button from "@/common/ui/Button"; // 경로는 실제 프로젝트 구조에 맞게 수정해주세요
import my from "../../../../../public/icons/bottombar/active/my_aqua.svg";
import editIcon from "./../../../../../public/icons/profile/edit.svg"; // 경로 수정 필요

export default function Edit() {
  return (
    <div className="flex flex-col items-center w-full h-full max-w-md mx-auto px-8 py-6 bg-[#FCFCFC]">
      <TopBar title="프로필 수정" />

      <div className="w-full mt-8">
        {/* 프로필 이미지 수정 영역 */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
              <Image src={my} alt="프로필 이미지" width={90} height={90} className="object-cover" />
            </div>
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 p-1 rounded-full shadow-md cursor-pointer"
            >
              <Image src={editIcon} alt="편집" width={20} height={20} />
            </label>
            <input type="file" id="profile-image" className="hidden" accept="image/*" />
          </div>
          <p className="text-sm text-gray-500 mt-2">프로필 사진 변경</p>
        </div>

        {/* 닉네임 수정 영역 */}
        <div className="mb-8">
          <label className="block text-gray-700 mb-2 font-medium">닉네임</label>
          <input
            type="text"
            defaultValue="노리 아빠"
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="닉네임을 입력하세요"
          />
          <p className="text-xs text-gray-500 mt-1">다른 사용자에게 보여질 이름입니다.</p>
        </div>

        {/* 저장 버튼 */}
        <div className="flex justify-center mt-4">
          <Button text="저장하기" backgroundColor="aqua" fontColor="custom-white" type="submit" />
        </div>
      </div>
    </div>
  );
}
