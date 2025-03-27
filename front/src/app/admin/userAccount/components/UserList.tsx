import React from "react";
import { UserData } from "../data/mockData";

interface UserListProps {
  users: UserData[];
  onViewUserDetail: (user: UserData) => void;
  onViewAccountDetail: (user: UserData, accountNumber: string) => void;
}

export default function UserList({ users, onViewUserDetail, onViewAccountDetail }: UserListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-4 text-left text-gray-600 font-medium">이름</th>
            <th className="px-6 py-4 text-left text-gray-600 font-medium">닉네임</th>
            <th className="px-6 py-4 text-left text-gray-600 font-medium">가입 날짜</th>
            <th className="px-6 py-4 text-left text-gray-600 font-medium">유저 계좌</th>
            <th className="px-6 py-4 text-left text-gray-600 font-medium">반려동물</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`hover:bg-gray-50 transition-colors duration-150 ${
                index !== users.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <td className="px-6 py-4 cursor-pointer" onClick={() => onViewUserDetail(user)}>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-medium mr-3">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-700">{user.nickname}</td>
              <td className="px-6 py-4 text-gray-700">{user.joinDate}</td>
              <td className="px-6 py-4">
                {user.accounts.length > 0 && (
                  <div>
                    <button
                      onClick={() => onViewAccountDetail(user, user.accounts[0].number)}
                      className="inline-flex items-center text-sm text-teal-600 hover:text-teal-700"
                    >
                      <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-md mr-2">
                        {user.accounts[0].type}
                      </span>
                      {user.accounts[0].number}
                      {user.accounts.length > 1 && (
                        <span className="ml-2 text-gray-500">외 {user.accounts.length - 1}개</span>
                      )}
                    </button>
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-gray-700">{user.pet}</td>
            </tr>
          ))}

          {/* 데이터가 없을 경우 메시지 표시 */}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                등록된 유저가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
