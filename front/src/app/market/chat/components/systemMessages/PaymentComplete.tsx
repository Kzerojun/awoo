// 💸 송금 완료 메시지
export function SystemPaymentComplete({
  senderName,
  amount,
  createdAt,
}: {
  senderName: string;
  amount: number;
  createdAt: string;
}) {
  // 디버깅용 콘솔
  console.log("💬 [SystemPaymentComplete] 렌더링됨", {
    senderName,
    amount,
    createdAt,
    message: "PAYMENT_COMPLETE",
  });
  return (
    <div className="flex justify-center my-4">
      <div className="bg-[#FFF9DB] px-4 py-3 rounded-xl shadow-sm text-center text-sm text-gray-800 w-fit max-w-[80%]">
        <div className="font-medium mb-1">💸 송금 완료</div>
        <div>
          {senderName}님이 <strong>{amount.toLocaleString()}원</strong>을 멍페이로 송금했어요.
        </div>
        <div className="text-[10px] text-gray-400 mt-2">{createdAt}</div>
      </div>
    </div>
  );
}
