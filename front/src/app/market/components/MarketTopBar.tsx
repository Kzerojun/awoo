"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { popPath, markGoingBack } from "@/lib/slices/userActionSlice";
import { deleteProduct } from "@/api/market/delete/deleteProducts";

interface MarketTopBarProps {
  title?: string;
  canModify: boolean; // 수정, 삭제 권한
  articleId: number;
}

const MarketTopBar = ({ title = "", canModify, articleId }: MarketTopBarProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const historyStack = useAppSelector((state) => state.userAction.historyStack);

  const handleBack = () => {
    if (historyStack.length > 0) {
      const prevPath = historyStack[historyStack.length - 1];
      dispatch(markGoingBack(true));
      dispatch(popPath());
      router.push(prevPath);
    } else {
      router.back();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  const handleDelete = async () => {
    const confirmDelete = confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;
    try {
      await deleteProduct(articleId);
      alert("삭제되었습니다.");
      router.push("/market");
    } catch (error) {
      alert("삭제 실패");
    }
  };
  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-white flex items-center px-4 justify-between z-50 border-b border-gray-100">
      {/* 왼쪽 - 뒤로가기 */}
      <button onClick={handleBack} className="text-gray-500">
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      {/* 중앙 - 제목 */}
      {title && (
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-base font-medium text-custom-black leading-tight">
          {title}
        </h1>
      )}

      {/* 오른쪽 - 점 세 개 + 팝업 */}
      <div className="relative" ref={optionsRef}>
        <button onClick={() => setShowOptions((prev) => !prev)}>
          <EllipsisVerticalIcon className="h-6 w-6 text-gray-600" />
        </button>

        {showOptions && (
          <div className="absolute right-0 -mt-1 w-28 bg-white border border-gray-200 rounded shadow-lg z-[9999]">
            {canModify ? (
              <>
                <button
                  onClick={() => {
                    setShowOptions(false);
                    router.push(`/market/article/edit/${articleId}`); // ✅ 수정 페이지로 이동
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  수정하기
                </button>
                <button
                  onClick={() => {
                    setShowOptions(false);
                    const confirmDelete = confirm("정말 삭제하시겠습니까?");
                    if (confirmDelete) {
                      handleDelete();
                    }
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-error hover:bg-gray-100"
                >
                  삭제하기
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowOptions(false);
                  router.push(`/market/article/report/${articleId}`);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                🚨 신고하기
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default MarketTopBar;
