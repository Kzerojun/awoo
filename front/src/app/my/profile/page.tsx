"use client";
import TopBar from "@/common/ui/TopBar";
import ProfilePicture from "./components/ProfilePicture";
import UserInformation from "./components/UserInformation";
import Link from "next/link";
import Button from "@/common/ui/Button";

export default function Profile() {
  return (
    <div className="flex flex-col items-center w-full h-full max-w-md mx-auto bg-[#FCFCFC]">
      <TopBar title="프로필" />

      {/* pt-14 추가하여 TopBar 높이만큼 상단 여백 확보 */}
      <div className="w-full px-6 pt-14">
        <ProfilePicture />
        <UserInformation />

        <div className="mt-4 w-full">
          <Link href="/my/profile/edit" className="w-full block">
            <button className="w-full py-3 rounded-xl bg-white border border-gray-200 font-medium mb-3">
              프로필 수정
            </button>
          </Link>

          <div className="flex w-full gap-3">
            <button className="flex-1 py-3 rounded-xl bg-white border border-gray-200 font-medium">
              로그아웃
            </button>
            <Link href="/my/profile/withdraw" className="flex-1">
              <button className="w-full py-3 rounded-xl bg-gray-200 text-gray-600 font-medium">
                탈퇴하기
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-3 text-right">
          <Link href="/my/profile/editPassword">
            <span className="text-sm text-gray-500 underline">비밀번호 수정하기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
