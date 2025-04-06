// 📩 송금 요청 메시지
export function SystemPaymentRequest({
  senderName,
  amount,
  onClickSend,
}: {
  senderName: string;
  amount: number;
  onClickSend: () => void;
}) {
  return (
    <div className="flex justify-center my-4">
      <div className="bg-[#FFF9DB] px-4 py-3 rounded-xl shadow-sm text-center text-sm text-gray-800 w-fit max-w-[80%]">
        <div className="font-medium mb-1">📩 송금 요청</div>
        <div>
          {senderName}님이 <strong>{amount.toLocaleString()}원</strong> 송금을 요청했어요.
        </div>
        <button
          onClick={onClickSend}
          className="mt-2 px-3 py-1 bg-yellow-400 hover:bg-yellow-300 rounded text-white text-xs"
        >
          보내기
        </button>
      </div>
    </div>
  );
}
