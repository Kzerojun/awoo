"use client";

import { useParams } from "next/navigation";
import { marketDummyData } from "@/app/market/data/marketDummyData"; // 게시글 더미 데이터 import
import ArticleWritePage from "../../write/components/ArticleWrite"; // 글쓰기 페이지 컴포넌트 import (수정용으로 재사용)

export default function ArticleEditPage() {
  const params = useParams(); // 현재 URL에서 파라미터 가져오기
  const id = params?.id; // 게시글 ID 추출

  // 더미 데이터에서 해당 ID를 가진 게시글 찾기
  const article = marketDummyData.find((item) => item.id === id);

  // 게시글이 존재하지 않을 경우 예외 처리
  if (!article) return <div>해당 게시글이 없습니다.</div>;

  // 게시글이 존재하면 ArticleWritePage를 수정 모드로 렌더링
  return <ArticleWritePage initialData={article} isEdit={true} />;
}
