import React from "react";
import Image from "next/image";
import { UserData } from "../data/mockData";
import awooAdmin from "../../../../../public/logos/AwOO_admin.svg";
import cancel from "../../../../../public/icons/admin/cancel.svg";

interface UserDetailModalProps {
  user: UserData;
  onClose: () => void;
  onViewAccountDetail: (accountNumber: string) => void;
}

export default function UserDetailModal({
  user,
  onClose,
  onViewAccountDetail,
}: UserDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        {/* 모달 헤더 */}
        <div className="flex justify-center items-center border-b p-4 relative">
          <div className="mt-4">
            <div className="flex items-center justify-center">
              <Image src={awooAdmin} alt="어드민 awoo" height={120} width={120} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 absolute right-4 top-4"
          >
            <Image src={cancel} alt="닫기" height={24} width={24} />
          </button>
        </div>

        {/* 모달 내용 */}
        <div className="p-6">
          {/* 유저 이름 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">유저 이름</label>
            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* 유저 계좌 목록 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">유저 계좌 목록</label>
            <div className="space-y-2">
              {user.accounts.map((account) => (
                <div
                  key={account.number}
                  className="flex items-center justify-between p-3 border rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer"
                  onClick={() => onViewAccountDetail(account.number)}
                >
                  <div className="flex items-center">
                    <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-md mr-2">
                      {account.type}
                    </span>
                    <span>{account.number}</span>
                  </div>
                  <div className="font-medium">{account.balance.toLocaleString()}원</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* 닉네임 */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">닉네임</label>
              <input
                type="text"
                value={user.nickname}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-50"
              />
            </div>

            {/* 반려동물 */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">반려동물</label>
              <input
                type="text"
                value={user.pet}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-50"
              />
            </div>
          </div>

          {/* 가입 날짜 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">가입 날짜</label>
            <input
              type="text"
              value={user.joinDate}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* 확인 버튼 */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
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
