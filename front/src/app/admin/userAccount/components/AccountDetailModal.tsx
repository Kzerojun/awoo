import React, { useState } from "react";
import Image from "next/image";
import { UserData, Transaction } from "../data/mockData";
import awooAdmin from "../../../../../public/logos/AwOO_admin.svg";
import cancel from "../../../../../public/icons/admin/cancel.svg";
import search from "../../../../../public/icons/admin/search.svg";

interface AccountDetailModalProps {
  user: UserData;
  account: {
    accountNumber: string;
    balance: number;
    transactions: Transaction[];
  };
  onClose: () => void;
}

export default function AccountDetailModal({ user, account, onClose }: AccountDetailModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // 거래내역 필터링
  const filteredTransactions = account.transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          {/* 계좌 정보 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">계좌</label>
            <input
              type="text"
              value={account.accountNumber}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* 잔액 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">잔액</label>
            <input
              type="text"
              value={`${account.balance.toLocaleString()} 원`}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* 계좌 내역 검색 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">계좌 내역</label>
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="absolute left-2 top-2 text-gray-400 mt-1">
                <Image src={search} alt="검색" width={16} height={16} />
              </div>
            </div>

            {/* 거래 내역 */}
            <div className="border rounded-md overflow-hidden">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <div
                    key={`${transaction.date}-${index}`}
                    className={`p-3 flex justify-between items-center ${
                      index !== filteredTransactions.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div>
                      <div className="flex items-center">
                        <span className="text-gray-500 text-sm mr-2">{transaction.date}</span>
                        <span className="text-gray-800">{transaction.description}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {transaction.balance.toLocaleString()}원
                      </div>
                    </div>
                    <div
                      className={`font-medium ${transaction.amount < 0 ? "text-red-500" : "text-teal-500"}`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toLocaleString()}원
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  {searchTerm ? "검색 결과가 없습니다." : "거래 내역이 없습니다."}
                </div>
              )}
            </div>
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
