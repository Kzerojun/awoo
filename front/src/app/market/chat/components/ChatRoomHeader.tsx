export default function ChatRoomHeader() {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center space-x-2">
        <img
          src="/images/product.png"
          alt="product"
          className="w-10 h-10 rounded-md object-cover"
        />
        <div>
          <div className="text-sm font-semibold">겨울옷</div>
          <div className="text-xs text-gray-400">20,000원</div>
        </div>
      </div>
      <button className="text-gray-400 text-xl">⋮</button>
    </div>
  );
}
