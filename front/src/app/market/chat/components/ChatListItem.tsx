import { useRouter } from "next/navigation";

interface ChatListItemProps {
  chat: {
    roomId: string;
    partnerNickname: string;
    partnerProfileImage: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    type: string;
    usedProductId: number | null;
  };
  hasBorder: boolean;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export default function ChatListItem({ chat, hasBorder }: ChatListItemProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/market/chat/${chat.roomId}?usedProductId=${chat.usedProductId}`);
  };
  return (
    <div
      className={`flex items-center justify-between py-4 ${hasBorder ? "border-b border-gray-100" : ""}`}
      onClick={handleClick}
    >
      {/* 프로필 */}
      <img
        src={chat.partnerProfileImage}
        alt="profile"
        className="w-10 h-10 rounded-md object-cover mr-2"
      />

      {/* 닉네임 & 마지막 메시지 */}
      <div className="flex-1 ml-2 truncate">
        <div className="text-m font-semibold truncate">{chat.partnerNickname}</div>
        <div className="text-xs text-gray-400 truncate">{chat.lastMessage}</div>
      </div>

      {/* 날짜 */}
      <div className="text-xs text-gray-400 whitespace-nowrap ml-auto">
        {formatDate(chat.lastMessageTime)}
      </div>
    </div>
  );
}
