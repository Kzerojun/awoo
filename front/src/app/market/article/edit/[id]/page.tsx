"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ArticleWritePage from "../../write/components/ArticleWrite";
import { getProductDetail } from "@/api/market/read/getDetail";

type ArticleInitialData = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrls: string[];
};

export default function ArticleEditPage() {
  const params = useParams();
  const [id, setId] = useState<string | null>(null);
  const [article, setArticle] = useState<ArticleInitialData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof params.id === "string") {
      console.log("✅ params.id:", params.id); // 💬 id 확인
      setId(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      try {
        const data = await getProductDetail(id);
        console.log("📦 getProductDetail 응답:", data);

        // ✅ 바로 data에서 값 꺼내기!
        const mappedData: ArticleInitialData = {
          id: String(data.usedProductId),
          title: data.title,
          description: data.content,
          price: data.price.toLocaleString(),
          imageUrls: data.imageUrls,
        };
        console.log("✅ mappedData:", mappedData);
        setArticle(mappedData);
      } catch (error) {
        console.error("❌ 게시글 불러오기 실패", error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (!id) return <div>잘못된 접근입니다.</div>;
  if (loading) return <div>로딩 중...</div>;
  if (!article) return <div>해당 게시글이 없습니다.</div>;

  return <ArticleWritePage initialData={article} isEdit={true} />;
}
