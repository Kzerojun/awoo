"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductDetail } from "@/api/market/read/getDetail";
import MarketTopBar from "../components/MarketTopBar";
import ProductImage from "../components/ProductImage";
import ProfileInfo from "../components/ProfileInfo";
import InfoStats from "../components/InfoStates";
import DetailBottomBar from "../components/DetailBottomBar";

import { createChatRoom } from "@/api/market/chat/createChatRoom";
import { useRouter } from "next/navigation";
import { chatSocket } from "@/socket/chatSocket";

export default function MarketDetailPage() {
  const { id } = useParams() as { id: string };
  const [detail, setDetail] = useState<any>(null);

  const router = useRouter();
  const handleChatClick = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // or redux에서 가져와도 됨
      if (!token) {
        alert("로그인이 필요합니다");
        return;
      }

      // 1. 채팅방 생성
      const res = await createChatRoom(detail.usedProductId);
      const chatRoomId = res.response.chatRoomId;

      // 2. 소켓 연결 및 구독
      chatSocket.connect(token); // jwt로 소켓 연결
      chatSocket.subscribe(chatRoomId); // 생성된 채팅방 구독

      // 3. 채팅방 페이지로 이동
      router.push(`/market/chat/${chatRoomId}`);
    } catch (error) {
      console.error("채팅방 생성 실패", error);
    }
  };
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getProductDetail(id); // 여기 id 그대로 넘기면 됨
        setDetail(res);
      } catch (error) {
        console.error("상세조회 실패", error);
      }
    };
    fetchDetail();
  }, [id]);

  if (!detail) return <div>로딩중...</div>;

  return (
    <div className="pb-24">
      {/* ✅ 상단바 */}
      <MarketTopBar
        title={detail.title}
        canModify={detail.canModify}
        articleId={detail.usedProductId}
      />

      {/* ✅ 이미지 */}
      <ProductImage src={detail.imageUrls[0]} />

      {/* ✅ 프로필 */}
      <ProfileInfo
        nickname={"판매자"} // 실제 이용자 정보로 수정
        profileImage={"/images/avatars/basic.jpg"}
        time={"1시간 전"} // 실제 업로드 시간 참고해서 수정
      />

      {/* ✅ 게시글 내용 */}
      <div className="px-4">
        <h1 className="text-xl font-semibold mb-2">{detail.title}</h1>
        <p className="text-sm mb-4 text-gray-500">{detail.content}</p>
        <p className="text-lg font-bold mb-2">{detail.price.toLocaleString()}원</p>
      </div>

      {/* ✅ 조회수, 채팅, 좋아요 */}
      <InfoStats views={detail.viewCount} chat={detail.likeCount} likes={0} />

      {/* ✅ 하단 액션바 */}
      <DetailBottomBar price={`${detail.price.toLocaleString()}원`} onChatClick={handleChatClick} />
    </div>
  );
}
