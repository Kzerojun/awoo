"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import UserList from "./components/UserList";
import UserDetailModal from "./components/UserDetailModal";
import { getUserAccount } from "@/api/admin/admin";
import type { UserAccount } from "@/api/admin/admin";
import search from "../../../../public/icons/admin/search.svg";

// 그룹화된 사용자 타입 정의
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

export default function UserAccount() {
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>([]);
  const [selectedUser, setSelectedUser] = useState<GroupedUserData | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 유저 계좌 목록 가져오기
  const fetchUserAccounts = async () => {
    try {
      setLoading(true);
      const response = await getUserAccount();
      if (response.success) {
        setUserAccounts(response.response);
      } else {
        console.error("유저 계좌 목록 조회 실패:", response.error);
      }
    } catch (error) {
      console.error("유저 계좌 목록 요청 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchUserAccounts();
  }, []);

  // 유저 목록 필터링
  const filteredUsers = userAccounts.filter(
    (user) =>
      user.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 유저별로 그룹화
  const groupedUsers = filteredUsers.reduce(
    (acc, account) => {
      const email = account.email;
      if (!acc[email]) {
        acc[email] = {
          memberName: account.memberName,
          email: account.email,
          nickname: account.nickname,
          memberCreatedAt: account.memberCreatedAt,
          petName: account.petName,
          accounts: [],
        };
      }

      acc[email].accounts.push({
        bankCode: account.bankCode,
        accountNo: account.accountNo,
        accountType: account.accountType,
        accountCreatedAt: account.accountCreatedAt,
        isDelete: account.isDelete,
      });

      return acc;
    },
    {} as Record<string, GroupedUserData>
  );

  // 그룹화된 유저 배열로 변환
  const groupedUsersList = Object.values(groupedUsers);

  // 유저 상세 정보 조회 핸들러
  const handleViewUserDetail = (user: GroupedUserData) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModals = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto p-4">
      {/* 검색 바 */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="유저 이름, 이메일 또는 닉네임을 입력해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 p-3 pl-10 pr-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="absolute left-3 top-3 text-gray-400 mt-1">
            <Image src={search} alt="검색" width={20} height={20} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-8">
          <p className="text-gray-500">유저 계좌 목록을 불러오는 중입니다...</p>
        </div>
      ) : (
        <>
          {/* 유저 목록 컴포넌트 */}
          <UserList users={groupedUsersList} onViewUserDetail={handleViewUserDetail} />

          {/* 유저 상세 정보 모달 */}
          {isUserModalOpen && selectedUser && (
            <UserDetailModal user={selectedUser} onClose={handleCloseModals} />
          )}
        </>
      )}
    </div>
  );
}
