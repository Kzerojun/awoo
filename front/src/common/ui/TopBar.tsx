"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
interface TopBarProps {
  title: string; // 페이지 제목
  rightAction?: React.ReactNode; // 우측 아이콘 (예: 알림 버튼 등)
}

const TopBar: React.FC<TopBarProps> = ({ title, rightAction }) => {
  const router = useRouter();
  const [visitedPages, setVisitedPages] = useState<string[]>([]); // 방문한 페이지 기록을 저장할 state

  // `useEffect`를 사용하여 페이지 방문 기록을 sessionStorage에 저장
  useEffect(() => {
    const storedHistory = sessionStorage.getItem("visitedPages"); // sessionStorage에서 방문 기록 가져오기
    const historyArray = storedHistory ? JSON.parse(storedHistory) : []; // JSON을 배열로 변환

    // 현재 방문한 페이지가 방문 기록에 마지막 값이 아니라면 추가
    if (
      historyArray.length === 0 ||
      historyArray[historyArray.length - 1] !== window.location.pathname
    ) {
      historyArray.push(window.location.pathname); // 새로운 페이지 추가
      sessionStorage.setItem("visitedPages", JSON.stringify(historyArray)); // sessionStorage 업데이트
    }

    setVisitedPages(historyArray); // state 업데이트
  }, []);

  // `뒤로 가기 버튼` 클릭 시 실행되는 함수
  const handleBack = () => {
    // 카테고리별 첫 페이지 설정
    const categoryFirstPages: { [key: string]: string } = {
      "/home": "/home",
      "/market": "/market",
      "/walk": "/walk",
      "/my": "/my",
    };

    // 방문 기록이 있는 경우
    if (visitedPages.length > 1) {
      const lastVisited = visitedPages[visitedPages.length - 2]; // 마지막 방문한 페이지 가져오기
      const updatedHistory = visitedPages.slice(0, visitedPages.length - 1); // 현재 페이지를 제거한 방문 기록

      sessionStorage.setItem("visitedPages", JSON.stringify(updatedHistory)); // sessionStorage 업데이트
      setVisitedPages(updatedHistory);

      // 이전 방문한 페이지가 특정 카테고리에 속해 있다면 해당 카테고리의 첫 페이지로 이동
      for (const category in categoryFirstPages) {
        if (lastVisited.startsWith(category)) {
          router.push(categoryFirstPages[category]); // 해당 카테고리의 첫 페이지로 이동
          return;
        }
      }
    }

    // 방문 기록이 없거나, 특정 카테고리가 아닌 경우 홈으로 이동
    router.push("/home");
  };

  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-white flex items-center px-4 justify-between z-50 ">
      {/* 뒤로 가기 버튼 */}
      <button onClick={handleBack} className="text-gray-500">
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      {/* 중앙 제목 */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-base font-medium text-custom-black leading-tight">
        {title}
      </h1>
      {/* 우측 버튼 (ex: 취소, 알림 아이콘 등) */}
      <div className="pr-2">{rightAction}</div>
    </header>
  );
};
export default TopBar;
