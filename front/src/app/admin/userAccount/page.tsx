"use client";

import { useState } from "react";
import Image from "next/image";
import UserList from "./components/UserList";
import UserDetailModal from "./components/UserDetailModal";
import AccountDetailModal from "./components/AccountDetailModal";
import { userData, accountTransactions, UserData, Transaction } from "./data/mockData";
import search from "../../../../public/icons/admin/search.svg";

export default function UserAccount() {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<{
    accountNumber: string;
    balance: number;
    transactions: Transaction[];
  } | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // 유저 목록 필터링
  const filteredUsers = userData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 유저 상세 정보 조회 핸들러
  const handleViewUserDetail = (user: any) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  // 계좌 상세 정보 조회 핸들러
  const handleViewAccountDetail = (user: any, accountNumber: any) => {
    setSelectedUser(user);
    setSelectedAccount({
      accountNumber,
      balance:
        user.accounts.find((acc: { number: any }) => acc.number === accountNumber)?.balance || 0,
      transactions: accountTransactions[accountNumber] || [],
    });
    setIsAccountModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModals = () => {
    setIsUserModalOpen(false);
    setIsAccountModalOpen(false);
    setSelectedUser(null);
    setSelectedAccount(null);
  };

  return (
    <div className="container mx-auto">
      {/* 검색 바 */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="유저 이름을 입력해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 p-3 pl-10 pr-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="absolute left-3 top-3 text-gray-400 mt-1">
            <Image src={search} alt="검색" width={20} height={20} />
          </div>
        </div>
      </div>

      {/* 유저 목록 컴포넌트 */}
      <UserList
        users={filteredUsers}
        onViewUserDetail={handleViewUserDetail}
        onViewAccountDetail={handleViewAccountDetail}
      />

      {/* 유저 상세 정보 모달 */}
      {isUserModalOpen && selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={handleCloseModals}
          onViewAccountDetail={(accountNumber) =>
            handleViewAccountDetail(selectedUser, accountNumber)
          }
        />
      )}

      {/* 계좌 상세 정보 모달 */}
      {isAccountModalOpen && selectedUser && selectedAccount && (
        <AccountDetailModal
          user={selectedUser}
          account={selectedAccount}
          onClose={handleCloseModals}
        />
      )}
    </div>
  );
}
