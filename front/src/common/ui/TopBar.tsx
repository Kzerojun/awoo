"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

interface TopBarProps {
  title?: string; // ✅ 페이지 제목 (없을 수도 있음)
  rightAction?: React.ReactNode; // ✅ 우측 아이콘 (없을 수도 있음)
}

const TopBar: React.FC<TopBarProps> = ({ title, rightAction }) => {
  const router = useRouter();
  const [visitedPages, setVisitedPages] = useState<string[]>([]);

  // ✅ title과 rightAction이 모두 없으면 TopBar 렌더링 X
  if (!title && !rightAction) return null;

  useEffect(() => {
    const storedHistory = sessionStorage.getItem("visitedPages");
    const historyArray = storedHistory ? JSON.parse(storedHistory) : [];

    if (
      historyArray.length === 0 ||
      historyArray[historyArray.length - 1] !== window.location.pathname
    ) {
      historyArray.push(window.location.pathname);
      sessionStorage.setItem("visitedPages", JSON.stringify(historyArray));
    }

    setVisitedPages(historyArray);
  }, []);

  const handleBack = () => {
    const categoryFirstPages: { [key: string]: string } = {
      "/home": "/home",
      "/market": "/market",
      "/walk": "/walk",
      "/my": "/my",
    };

    if (visitedPages.length > 1) {
      const lastVisited = visitedPages[visitedPages.length - 2];
      const updatedHistory = visitedPages.slice(0, visitedPages.length - 1);

      sessionStorage.setItem("visitedPages", JSON.stringify(updatedHistory));
      setVisitedPages(updatedHistory);

      for (const category in categoryFirstPages) {
        if (lastVisited.startsWith(category)) {
          router.push(categoryFirstPages[category]);
          return;
        }
      }
    }

    router.push("/home");
  };

  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-white flex items-center px-4 justify-between z-50">
      {/* 뒤로 가기 버튼 */}
      <button onClick={handleBack} className="text-gray-500">
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      {/* 중앙 제목 (title이 있을 때만 보이도록) */}
      {title && (
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-base font-medium text-custom-black leading-tight">
          {title}
        </h1>
      )}

      {/* 우측 버튼 (rightAction이 있을 때만 보이도록) */}
      {rightAction && <div className="pr-2">{rightAction}</div>}
    </header>
  );
};

export default TopBar;
