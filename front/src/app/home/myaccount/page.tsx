"use client";

import { useRouter } from "next/navigation";
import Header from "@/app/home/components/Header";

export default function AccountMinePage() {
  const router = useRouter();

  const savingAccounts = [
    {
      name: "산뜻하개 적금",
      dogName: "노리",
      balance: "1,500,000원",
      image: "/icons/mypage/nori-1.svg",
    },
    {
      name: "풍족하개 적금",
      dogName: "초코",
      balance: "3,500,000원",
      image: "/icons/mypage/nori-2.svg",
    },
  ];

  return (
    <div>
      {/* 네비게이션 바 */}
      <Header />

      <div className="px-4 py-2 flex flex-col gap-2 pt-16">
        {/* 입출금 계좌 */}
        <div className="bg-[#C9F5F1] rounded-xl p-4 shadow">
          <p className="text-sm ml-3 mt-1">AwOO 입출금계좌</p>
          <p className="text-xl font-semibold mt-1 mb-3 ml-3">230,000원</p>
          <div className="flex justify-end">
            <button
              onClick={() => router.push("/##")} // 이체 경로로 수정
              className="text-xs text-black bg-[#B3D6D3] px-4 py-1.5 rounded-md"
            >
              이체
            </button>
          </div>
        </div>

        {/* 적금 계좌 리스트 */}
        {savingAccounts.map((item, i) => (
          <div
            key={i}
            className="bg-[#9EEBD1] rounded-xl p-4 flex items-center gap-4 cursor-pointer min-h-[100px]"
            onClick={() => router.push(`/account/detail/${i}`)}
          >
            <img src={item.image} alt="강아지" className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <p className="text-sm">
                {item.dogName}의 {item.name}
              </p>
              <p className="text-lg font-semibold">{item.balance}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
