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

import { useAppSelector } from "@/lib/store";

// API 응답 타입 정의
interface ProductDetailResponse {
  usedProductId: number;
  title: string;
  content: string;
  price: number;
  usedProductStatus: "SA" | "RE" | "SO";
  viewCount: number;
  likeCount: number;
  imageUrls: string[];
  isLiked: boolean;
  canModify: boolean;
  name: string; // 판매자 이름 - sellerName이 아닌 name으로 변경
  sellerId: number; // 판매자 ID 추가
  memberProfileImage: string;
}

export default function MarketDetailPage() {
  const { id } = useParams() as { id: string };
  const [detail, setDetail] = useState<ProductDetailResponse | null>(null);
  // ✅ 찜 상태 관리
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [status, setStatus] = useState<string | null>(null); // 상태 state
  const [type, setType] = useState<"COMMON" | "SAFE">("COMMON"); // 기본은 COMMON

  const router = useRouter();
  const memberId = useAppSelector((state) => state.memberId.memberId);

  // 날짜 포맷팅 함수
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "최근 등록";

    const now = new Date();
    const createdAt = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return diffMinutes === 0 ? "방금 전" : `${diffMinutes}분 전`;
      }
      return `${diffHours}시간 전`;
    } else {
      return `${diffDays}일 전`;
    }
  };

  // ✅ 찜하기 핸들러
  const handleToggleLike = async () => {
    if (!detail) return;

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
    if (!detail) return;

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
    if (!detail) return;

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
        const productDetail = await getProductDetail(id);
        console.log("API 응답:", productDetail);

        if (productDetail) {
          setDetail(productDetail);
          setStatus(productDetail.usedProductStatus); // 상태 초기값
          setIsLiked(productDetail.isLiked); // ✅ 초기값
          setLikeCount(productDetail.likeCount); // ✅ 초기 찜 수
        } else {
          console.error("상품 정보가 없습니다:", productDetail);
        }
      } catch (error) {
        console.error("상세조회 실패", error);
      }
    };
    fetchDetail();
  }, [id]);

  if (!detail) return <div>로딩중...</div>;

  // 상품 상태에 따른 스타일과 텍스트
  const getStatusBadge = () => {
    if (!status) return null;

    let bgColor = "bg-teal-100";
    let textColor = "text-teal-700";
    let statusText = "판매중";

    if (status === "RE") {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-700";
      statusText = "예약중";
    } else if (status === "SO") {
      bgColor = "bg-gray-200";
      textColor = "text-gray-700";
      statusText = "거래완료";
    }

    return (
      <span className={`${bgColor} ${textColor} text-xs px-2 py-1 rounded-sm`}>{statusText}</span>
    );
  };

  return (
    <div className="pb-24">
      {/* ✅ 상단바 */}
      <MarketTopBar title="" canModify={detail.canModify} articleId={detail.usedProductId} />

      {/* ✅ 이미지 */}
      <ProductImage src={detail.imageUrls[0]} />

      {/* ✅ 프로필 */}
      <ProfileInfo
        nickname={detail.name} // API에서 받은 판매자 이름 사용 (name 필드)
        profileImage={detail.memberProfileImage}
        time={"최근 등록"} // 시간 정보가 없으므로 기본값 사용
      />

      {/* ✅ 게시글 내용 */}
      <div className="px-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold mb-2">{detail.title}</h1>

          {/* 상태 배지 추가 */}
          <div className="mb-2">{getStatusBadge()}</div>

          <p className="text-sm mb-4 text-gray-500">{detail.content}</p>
          <p className="text-lg font-bold mb-2">{detail.price.toLocaleString()}원</p>
        </div>
      </div>

      {/* ✅ 조회수, 채팅, 좋아요 */}
      <InfoStats views={detail.viewCount} chat={0} likes={detail.likeCount} />

      {/* 상태 변경 */}
      {/* {detail.canModify && status && (
        <div className="px-4 mt-4 space-y-2">
          <p className="text-sm text-gray-600">판매 상태 관리</p>
          <div className="flex gap-2">
            {/* 상태 변경 버튼 */}
      {/* <button
              onClick={() => handleStatusChange("SA")}
              className={`border rounded px-3 py-1 text-sm ${status === "SA" ? "bg-teal-500 text-white" : "bg-white text-gray-600"}`}
            >
              판매중
            </button> */}

      {/* <button
              onClick={() => handleStatusChange("RE")}
              className={`border rounded px-3 py-1 text-sm ${status === "RE" ? "bg-yellow-500 text-white" : "bg-white text-gray-600"}`}
            > */}
      {/* 예약중
            </button>

            <button
              onClick={() => handleStatusChange("SO")}
              className={`border rounded px-3 py-1 text-sm ${status === "SO" ? "bg-gray-500 text-white" : "bg-white text-gray-600"}`} */}
      {/* > */}
      {/* 거래완료 */}
      {/* </button> */}
      {/* </div> */}

      {/* 거래완료일 때만 type 선택 */}
      {/* {status === "SO" && (
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
        </div> */}
      {/* )} */}
      {/* ✅ 하단 액션바 – 본인 글이면 아예 렌더링 X */}
      <DetailBottomBar
        price={`${detail.price.toLocaleString()}원`}
        isLiked={isLiked}
        onToggleLike={handleToggleLike}
        onChatClick={detail.sellerId === memberId ? undefined : handleChatClick}
      />
    </div>
  );
}
