"use client";
import React, { useState, ChangeEvent } from "react";
import Button from "@/common/ui/Button";
import paw from "../../../../public/icons/white_paw.svg";

interface ProfileNicknameProps {
  nickname: string;
  setNickname: (v: string) => void;
}

const ProfileNickname = ({ nickname, setNickname }: ProfileNicknameProps) => {
  const maxLength: number = 6;

  // 닉네임 변경 핸들러
  const handleNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, maxLength);
    setNickname(value);
  };

  // 회원가입 완료 (백엔드 연결)
  const handleSubmit = () => {};
  return (
    <div className="h-full relative flex flex-col justify-center items-center gap-y-5">
      <h1 className="absolute top-6 left-0 w-full text-center text-xl z-10">프로필 등록 (2/2)</h1>
      <div className="flex flex-col justify-center items-center mb-20">
        {/* 닉네임 부분 */}
        <div className="flex flex-col justify-center items-center mb-20 gap-y-5">
          <div className="text-lg">닉네임을 입력하세요.</div>

          {/* 닉네임 입력 */}
          <div className="relative w-56">
            {/* 입력창 */}
            <input
              type="text"
              value={nickname}
              onChange={handleNickname}
              placeholder="닉네임을 입력하세요"
              maxLength={maxLength}
              className="w-full text-center border-b-2 border-b-aqua placeholder:text-center placeholder:text-sm focus:outline-none text-base"
            />
            {/* 글자수 표시 */}
            <span className="absolute right-0 top-1 text-xs text-gray-400">
              {nickname.length}/{maxLength}
            </span>
          </div>
          {/* 중복 확인 */}
          <div className="w-56 flex items-center justify-end">
            <button className="border border-aqua text-aqua text-sm px-4 py-1 rounded-full">
              중복 확인
            </button>
          </div>
        </div>
        {/* 회원가입 버튼 부분 */}
        <div className="">
          <Button
            text="&nbsp;&nbsp;&nbsp;&nbsp;완료"
            img={paw}
            width="medium"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileNickname;
