// 💰 안심결제 최종 완료 메시지
export function SystemSafePaymentComplete({ createdAt }: { createdAt: string }) {
  return (
    <div className="flex justify-center my-4">
      <div className="bg-[#F0FFF4] px-4 py-3 rounded-xl shadow-sm text-center text-sm text-gray-800 w-fit max-w-[80%]">
        <div className="font-medium mb-1">💰 거래 완료</div>
        <div>거래가 완료되어 판매대금이 입금되었어요!</div>
        <div className="text-[10px] text-gray-400 mt-2">{createdAt}</div>
      </div>
    </div>
  );
}
