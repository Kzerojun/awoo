"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import CommonTopBar from "@/common/ui/CommonTopBar";
import checkmark from "../../../../../public/icons/mypage/checkmark.svg";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { resetTransferInfo } from "@/lib/slices/transfercheckSlice";
import { setChatStatus } from "@/lib/slices/chatSystemSlice";
import { chatSocket } from "@/socket/chatSocket";

export default function SafePayDone() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { chatRoomId, usedProductId } = useAppSelector((state) => state.transfercheck);
  const memberId = useAppSelector((state) => state.memberId.memberId); // ✅ 멤버 ID 가져오기

  // URL에서 금액 정보 가져오기
  useEffect(() => {
    const amountParam = searchParams.get("amount");
    if (amountParam) {
      setAmount(parseInt(amountParam, 10));
    }
  }, [searchParams]);

  // 홈으로 이동
  const handleGoToChat = () => {
    if (chatRoomId && usedProductId) {
      dispatch(setChatStatus("FINISHED")); // ✅ 1. 시스템 메시지 상태 설정

      // ✅ 2. 소켓이 이미 연결되어 있다면 여기서 바로 메시지 보냄
      const token = localStorage.getItem("accessToken");
      if (token) {
        chatSocket.connect(token, chatRoomId, () => {}); // 단순 연결 (수신 콜백은 필요 없음)
        setTimeout(() => {
          chatSocket.send(chatRoomId, "SAFE_FINISH", memberId); // ✅ 직접 메시지 전송
        }, 300); // 아주 짧게 대기 (연결 완료되게)
      }

      // ✅ 3. 상태 초기화 및 페이지 이동
      dispatch(resetTransferInfo());
      setTimeout(() => {
        router.push(`/market/chat/${chatRoomId}?usedProductId=${usedProductId}`);
      }, 500);
    } else {
      alert("채팅방 정보를 불러올 수 없습니다.");
    }
  };

  return (
    <div className="flex flex-col inset-0 bg-white">
      <CommonTopBar title="결제 완료" />

      <div className="flex-1 flex flex-col items-center px-6 py-8">
        {/* 체크 아이콘 */}
        <div className="mb-6 mt-12">
          <div className="p-4 bg-teal-50 rounded-full">
            <Image src={checkmark} alt="체크마크" width={100} height={100} />
          </div>
        </div>

        {/* 메인 메시지 */}
        <h1 className="text-xl font-bold text-center mb-4">안심결제가 완료되었습니다</h1>

        {/* 금액 정보 */}
        <div className="text-3xl font-bold text-teal-500 mb-10">{amount.toLocaleString()}원</div>

        {/* 설명 카드 - 개선된 버전 */}
        <div className="w-full bg-teal-50 rounded-xl p-6 mb-2">
          {/* 첫 번째 항목 */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 flex items-center justify-center bg-teal-500 text-white rounded-full mr-3 flex-shrink-0 flex-none">
                <span className="text-sm font-bold leading-none">1</span>
              </div>
              <h3 className="text-md font-medium">에스크로 보관 중</h3>
            </div>
            <div>
              <p className="text-gray-700 text-[13px]">
                결제하신 금액은 안전하게 보관되고 있습니다.
                <br />
                판매자가 즉시 인출할 수 없어 안전합니다.
              </p>
            </div>
          </div>

          {/* 두 번째 항목 */}
          <div>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 flex items-center justify-center bg-teal-500 text-white rounded-full mr-3 flex-shrink-0 flex-none">
                <span className="text-sm font-bold leading-none">2</span>
              </div>
              <h3 className="text-md font-medium">구매 확정 후 송금</h3>
            </div>
            <div>
              <p className="text-gray-700 text-[13px]">
                상품을 받고 구매를 확정하면 판매자에게 대금이 지급됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="p-4 border-gray-200">
        <button
          onClick={handleGoToChat}
          className="w-full py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
        >
          중고거래 홈으로
        </button>
      </div>
    </div>
  );
}
