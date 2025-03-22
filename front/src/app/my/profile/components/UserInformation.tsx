"use client";

export default function UserInformation() {
  return (
    <div className="w-full border border-gray-200 rounded-2xl p-4 bg-white">
      <div className="border-b border-gray-200 py-3">
        <div className="flex justify-between items-center">
          <div className="text-[#828282]">이름</div>
          <div className="text-md">김홍범</div>
        </div>
      </div>

      <div className="border-b border-gray-200 py-3">
        <div className="flex justify-between items-center">
          <div className="text-[#828282]">이메일</div>
          <div className="text-md">fk****@naver.com</div>
        </div>
      </div>

      <div className="border-b border-gray-200 py-3">
        <div className="flex justify-between items-center">
          <div className="text-[#828282]">전화번호</div>
          <div className="text-md">010-****-1874</div>
        </div>
      </div>

      <div className="py-3">
        <div className="flex justify-between items-center">
          <div className="text-[#828282]">생년월일</div>
          <div className="text-md">1999-09-09</div>
        </div>
      </div>
    </div>
  );
}
