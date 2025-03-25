"use client";

import { useParams } from "next/navigation";
import MarketTopBar from "@/app/market/components/MarketTopBar"; // 중고거래 상단바 컴포넌트
import { marketDummyData } from "../data/marketDummyData"; // 더미 게시글 데이터 import
import ProductImage from "../components/ProductImage"; // 상품 이미지 컴포넌트
import ProfileInfo from "../components/ProfileInfo"; // 작성자 프로필 정보 컴포넌트
import DetailBottomBar from "../components/DetailBottomBar"; // 하단 가격 및 채팅 버튼 컴포넌트
import InfoStats from "../components/InfoStates"; // 조회수, 좋아요, 채팅 수 등 통계 정보 표시

export default function MarketDetailPage() {
  const params = useParams(); // URL에서 파라미터(id 등) 추출
  const id = params?.id; // 게시글 ID 추출
  const article = marketDummyData.find((item) => item.id === id); // 더미 데이터에서 해당 ID 게시글 찾기

  // 게시글을 찾을 수 없을 경우 예외 처리
  if (!article) return <div>삭제되었거나 존재하지 않는 게시글입니다.</div>;

  return (
    <div>
      {/* 상단바 고정 */}
      <MarketTopBar authorId={article.authorId} articleId={article.id} />

      <div className="pt-14">
        {/* ✅ 상품 이미지 표시 */}
        <ProductImage src={article.image} />

        {/* ✅ 작성자 정보 표시 (닉네임, 프로필 이미지, 업로드 시간) */}
        <ProfileInfo
          nickname={article.nickname}
          profileImage={article.profileImage}
          time={article.time}
        />

        {/* ✅ 게시글 제목 및 본문 설명 */}
        <div className="px-4 py-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h2>
          <p className="text-base text-gray-800 leading-relaxed whitespace-pre-line mt-4">
            {article.description}
          </p>
        </div>

        {/* ✅ 조회수, 채팅 수, 좋아요 수 등 통계 정보 표시 */}
        <InfoStats views={article.views} chat={article.chat} likes={article.likes} />
      </div>

      {/* ✅ 하단 고정 바 - 가격 정보 및 채팅 버튼 */}
      <DetailBottomBar price={article.price} onChatClick={() => alert("채팅하기 기능! 🚀")} />
    </div>
  );
}
