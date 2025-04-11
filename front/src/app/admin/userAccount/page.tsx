"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import UserList from "./components/UserList";
import UserDetailModal from "./components/UserDetailModal";
import { getUserAccount } from "@/api/admin/admin";
import type { UserAccount } from "@/api/admin/admin";
import search from "../../../../public/icons/admin/search.svg";
import Pagination from "./components/Pagination";

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
  const [selectedAccount, setSelectedAccount] = useState<GroupedUserData | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // 유저 계좌 목록 가져오기
  const fetchUserAccounts = async (page = 0, size = 10) => {
    try {
      setLoading(true);
      const response = await getUserAccount({ page, size });
      if (response.success) {
        setUserAccounts(response.response.content);
        setTotalPages(response.response.totalPages);
        setTotalElements(response.response.totalElements);
      } else {
        console.error("유저 계좌 목록 조회 실패:", response.error);
      }
    } catch (error) {
      console.error("유저 계좌 목록 요청 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchUserAccounts(page, pageSize);
  };

  // 페이지 크기 변경 핸들러
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0); // 페이지 크기 변경 시 첫 페이지로 이동
    fetchUserAccounts(0, size);
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchUserAccounts(currentPage, pageSize);
  }, []);

  // 유저 목록 필터링
  const filteredUsers = userAccounts.filter(
    (user) =>
      user.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 검색 시 API 재호출 (검색어 입력 후 일정 시간 후 실행)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUserAccounts(0, pageSize); // 검색 시 첫 페이지로 이동
      setCurrentPage(0);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // 그룹화하지 않고 각 계좌를 개별적으로 표시
  const userAccountsList = filteredUsers.map((account) => ({
    memberName: account.memberName,
    email: account.email,
    nickname: account.nickname,
    memberCreatedAt: account.memberCreatedAt,
    petName: account.petName,
    accounts: [
      {
        bankCode: account.bankCode,
        accountNo: account.accountNo,
        accountType: account.accountType,
        accountCreatedAt: account.accountCreatedAt,
        isDelete: account.isDelete,
      },
    ],
  }));

  // 유저 상세 정보 조회 핸들러
  const handleViewUserDetail = (account: GroupedUserData) => {
    setSelectedAccount(account);
    setIsUserModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModals = () => {
    setIsUserModalOpen(false);
    setSelectedAccount(null);
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
          <UserList users={userAccountsList} onViewUserDetail={handleViewUserDetail} />

          {/* 페이지네이션 컴포넌트 */}
          {totalPages > 0 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                pageSize={pageSize}
                totalElements={totalElements}
              />
            </div>
          )}

          {/* 유저 상세 정보 모달 */}
          {isUserModalOpen && selectedAccount && (
            <UserDetailModal user={selectedAccount} onClose={handleCloseModals} />
          )}
        </>
      )}
    </div>
  );
}
