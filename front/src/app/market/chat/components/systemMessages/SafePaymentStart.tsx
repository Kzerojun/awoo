// 🛡️ 안심결제 시작 메시지
export function SystemSafePaymentStart({ createdAt }: { createdAt: string }) {
  return (
    <div className="flex justify-center my-4">
      <div className="bg-[#F0F4FF] px-4 py-3 rounded-xl shadow-sm text-center text-sm text-gray-800 w-fit max-w-[80%]">
        <div className="font-medium mb-1">🛡️ 안심결제 시작</div>
        <div>
          안심결제가 시작되었어요.
          <br />
          상품을 발송하고 운송장 번호를 입력해주세요.
        </div>
        <div className="text-[10px] text-gray-400 mt-2">{createdAt}</div>
      </div>
    </div>
  );
}
