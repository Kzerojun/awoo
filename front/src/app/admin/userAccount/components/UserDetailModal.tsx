import React from "react";
import Image from "next/image";
import awooAdmin from "../../../../../public/logos/AwOO_admin.svg";
import cancel from "../../../../../public/icons/admin/cancel.svg";

interface AccountInfo {
  bankCode: string;
  accountNo: string;
  accountType: string;
  accountCreatedAt: string;
  isDelete: boolean;
}

interface GroupedUserData {
  memberName: string;
  email: string;
  nickname: string;
  memberCreatedAt: string;
  petName: string | null;
  accounts: AccountInfo[];
}

interface UserDetailModalProps {
  user: GroupedUserData;
  onClose: () => void;
}

export default function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  // 날짜 포맷팅 함수
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  // 뱅크 코드 표시 함수
  const getBankName = (bankCode: string): string => {
    switch (bankCode) {
      case "999":
        return "싸피은행";
      default:
        return bankCode;
    }
  };

  // 계좌 타입 표시 함수
  const getAccountTypeName = (accountType: string): string => {
    switch (accountType) {
      case "INTERNAL":
        return "내부계좌";
      case "SAVING":
        return "적금";
      default:
        return accountType;
    }
  };

  // 계좌 활성 상태 표시 함수
  const getAccountStatus = (isDelete: boolean): string => {
    return isDelete ? "해지됨" : "사용중";
  };

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
              value={user.memberName}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* 유저 계좌 목록 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">유저 계좌 목록</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {user.accounts.map((account) => (
                <div
                  key={account.accountNo}
                  className="flex flex-col p-3 border rounded-md bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-md mr-2">
                        {getAccountTypeName(account.accountType)}
                      </span>
                      <span>{account.accountNo}</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        account.isDelete ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {getAccountStatus(account.isDelete)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>{getBankName(account.bankCode)}</span>
                    <span>생성일: {formatDate(account.accountCreatedAt)}</span>
                  </div>
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
                value={user.petName || "-"}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-50"
              />
            </div>
          </div>

          {/* 이메일 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">이메일</label>
            <input
              type="text"
              value={user.email}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* 가입 날짜 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">가입 날짜</label>
            <input
              type="text"
              value={formatDate(user.memberCreatedAt)}
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
