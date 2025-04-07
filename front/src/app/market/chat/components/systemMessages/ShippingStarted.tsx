export function SystemShippingStarted({ trackingNumber }: { trackingNumber: string }) {
  return (
    <div className="flex justify-center my-4">
      <div className="bg-[#E6F0FF] px-4 py-3 rounded-xl shadow-sm text-center text-sm text-gray-800 w-fit max-w-[80%]">
        <div className="font-medium mb-1">📦 배송중</div>
        <div>
          운송장 번호 <strong>{trackingNumber}</strong>
          <br />
          상품이 배송 중입니다. 도착하면 주문 확정을 눌러주세요.
        </div>
      </div>
    </div>
  );
}
