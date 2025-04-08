"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductDetail } from "@/api/market/read/getDetail";
import MarketTopBar from "../components/MarketTopBar";
import ProductImage from "../components/ProductImage";
import ProfileInfo from "../components/ProfileInfo";
import InfoStats from "../components/InfoStates";
import DetailBottomBar from "../components/DetailBottomBar";
import { toggleLike } from "@/api/market/like/toggleLike";

import { createChatRoom } from "@/api/market/chat/createChatRoom";
import { useRouter } from "next/navigation";
import { chatSocket } from "@/socket/chatSocket";
import type { IMessage } from "@stomp/stompjs";
import { patchProductStatus } from "@/api/market/update/patchStatus";

export default function MarketDetailPage() {
  const { id } = useParams() as { id: string };
  const [detail, setDetail] = useState<any>(null);
  // ✅ 찜 상태 관리
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [status, setStatus] = useState<string | null>(null); // 상태 state
  const [type, setType] = useState<"COMMON" | "SAFE">("COMMON"); // 기본은 COMMON

  const router = useRouter();
  // ✅ 찜하기 핸들러
  const handleToggleLike = async () => {
    try {
      const res = await toggleLike(detail.usedProductId);
      const wasLiked = res.data.response.wasLiked;

      if (wasLiked) {
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }

      console.log("✅ 찜 상태:", !wasLiked);
    } catch (error) {
      console.error("찜 처리 실패", error);
    }
  };
  const handleChatClick = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // or redux에서 가져와도 됨
      if (!token) {
        alert("로그인이 필요합니다");
        return;
      }
      if (!detail?.usedProductId) {
        alert("상품 정보가 없습니다. 다시 시도해주세요.");
        console.error("❌ usedProductId 없음:", detail);
        return;
      }
      // 1. 채팅방 생성
      const res = await createChatRoom(detail.usedProductId);
      const chatRoomId = res.response.chatRoomId;

      // 2. 소켓 연결 및 구독
      chatSocket.connect(token, chatRoomId, (message: IMessage) => {
        const body = JSON.parse(message.body);
        console.log("메시지 수신", body);
        // TODO: 메시지 상태 업데이트나 store 처리
      });

      // 3. 채팅방 페이지로 이동
      router.push(`/market/chat/${chatRoomId}?usedProductId=${detail.usedProductId}`);
    } catch (error) {
      console.error("채팅방 생성 실패", error);
    }
  };
  const handleStatusChange = async (newStatus: "SA" | "RE" | "SO") => {
    if (newStatus === status) return; // 같은 상태 누르면 무시
    setStatus(newStatus);

    // 거래완료 선택하면 type 선택 UI 보여주기 위함
    if (newStatus !== "SO") {
      // 거래중, 예약중일 때는 type 강제 COMMON
      setType("COMMON");
      handleStatusPatch(newStatus, "COMMON");
    }
  };
  // ✅ PATCH 전용 함수
  const handleStatusPatch = async (status: "SA" | "RE" | "SO", type: "COMMON" | "SAFE") => {
    try {
      await patchProductStatus(detail.usedProductId, status, type);
      alert("상태가 변경되었습니다!");
    } catch (error) {
      alert("상태 변경 실패");
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getProductDetail(id);
        setDetail(res);
        setStatus(res.usedProductStatus); // 상태 초기값
        setIsLiked(res.isLiked); // ✅ 초기값
        setLikeCount(res.likeCount); // ✅ 초기 찜 수
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
      <MarketTopBar title="" canModify={detail.canModify} articleId={detail.usedProductId} />

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

      {/* 상태 변경 */}
      {detail.canModify && status && (
        <div className="px-4 mt-4 space-y-2">
          <p className="text-sm text-gray-600">판매 상태 관리</p>
          <div className="flex gap-2">
            {/* 상태 변경 버튼 */}
            <button
              onClick={() => handleStatusChange("SA")}
              className={`border rounded px-3 py-1 text-sm ${status === "SA" ? "bg-blue-500 text-white" : "bg-white text-gray-600"}`}
            >
              거래중
            </button>

            <button
              onClick={() => handleStatusChange("RE")}
              className={`border rounded px-3 py-1 text-sm ${status === "RE" ? "bg-yellow-500 text-white" : "bg-white text-gray-600"}`}
            >
              예약중
            </button>

            <button
              onClick={() => handleStatusChange("SO")}
              className={`border rounded px-3 py-1 text-sm ${status === "SO" ? "bg-gray-500 text-white" : "bg-white text-gray-600"}`}
            >
              거래완료
            </button>
          </div>

          {/* 거래완료일 때만 type 선택 */}
          {status === "SO" && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleStatusPatch("SO", "COMMON")}
                className={`border rounded px-3 py-1 text-sm ${type === "COMMON" ? "bg-green-500 text-white" : "bg-white text-gray-600"}`}
              >
                일반거래 완료
              </button>

              <button
                onClick={() => handleStatusPatch("SO", "SAFE")}
                className={`border rounded px-3 py-1 text-sm ${type === "SAFE" ? "bg-purple-500 text-white" : "bg-white text-gray-600"}`}
              >
                안심거래 확정
              </button>
            </div>
          )}
        </div>
      )}

      {/* ✅ 하단 액션바 */}
      <DetailBottomBar
        price={`${detail.price.toLocaleString()}원`}
        isLiked={isLiked}
        onToggleLike={handleToggleLike}
        onChatClick={handleChatClick}
      />
    </div>
  );
}
