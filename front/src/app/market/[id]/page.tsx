"use client";

import { useParams } from "next/navigation";
import MarketTopBar from "@/app/market/components/MarketTopBar"; // ✅ 경로 확인!
import { marketDummyData } from "../data/marketDummyData";
import ProductImage from "../components/ProductImage";
import ProfileInfo from "../components/ProfileInfo";
import DetailBottomBar from "../components/DetailBottomBar";
import InfoStats from "../components/InfoStates";

export default function MarketDetailPage() {
  const params = useParams();
  const id = params?.id;
  const article = marketDummyData.find((item) => item.id === id);

  if (!article) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div>
      {/* ✅ 상단바 고정 */}
      <MarketTopBar />

      <div className="pt-14">
        {/* ✅ 이미지 렌더링 */}
        <ProductImage src={article.image} />
        <ProfileInfo
          nickname={article.nickname}
          profileImage={article.profileImage}
          time={article.time}
        />
        <div className="px-4 py-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h2>
          <p className="text-base text-gray-800 leading-relaxed whitespace-pre-line mt-4">
            {article.description}
          </p>
        </div>
        <InfoStats views={article.views} chat={article.chat} likes={article.likes} />
      </div>

      <DetailBottomBar price={article.price} onChatClick={() => alert("채팅하기 기능! 🚀")} />
    </div>
  );
}
