import React from "react";

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

interface UserListProps {
  users: GroupedUserData[];
  onViewUserDetail: (user: GroupedUserData) => void;
}

export default function UserList({ users, onViewUserDetail }: UserListProps) {
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

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-4 text-left text-gray-600 font-medium">이름</th>
            <th className="px-6 py-4 text-left text-gray-600 font-medium">닉네임</th>
            <th className="px-6 py-4 text-left text-gray-600 font-medium">가입 날짜</th>
            <th className="px-6 py-4 text-left text-gray-600 font-medium">계좌 정보</th>
            <th className="px-6 py-4 text-left text-gray-600 font-medium">반려동물</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={`${user.email}-${user.accounts[0].accountNo}`}
              className={`hover:bg-gray-50 transition-colors duration-150 ${
                index !== users.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <td className="px-6 py-4 cursor-pointer" onClick={() => onViewUserDetail(user)}>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-medium mr-3">
                    {user.memberName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{user.memberName}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-700">{user.nickname}</td>
              <td className="px-6 py-4 text-gray-700">{formatDate(user.memberCreatedAt)}</td>
              <td className="px-6 py-4">
                {user.accounts.length > 0 && (
                  <div>
                    <button
                      onClick={() => onViewUserDetail(user)}
                      className="inline-flex items-center text-sm text-teal-600 hover:text-teal-700"
                    >
                      <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-md mr-2">
                        {getAccountTypeName(user.accounts[0].accountType)}
                      </span>
                      {user.accounts[0].accountNo}
                      <span
                        className={`ml-2 ${user.accounts[0].isDelete ? "text-red-500" : "text-green-500"}`}
                      >
                        {user.accounts[0].isDelete ? "해지됨" : "사용중"}
                      </span>
                    </button>
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-gray-700">{user.petName || "-"}</td>
            </tr>
          ))}

          {/* 데이터가 없을 경우 메시지 표시 */}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                등록된 계좌가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
