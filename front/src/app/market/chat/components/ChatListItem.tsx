interface Props {
  chat: {
    roomId: string;
    partnerNickname: string;
    partnerProfileImage: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    type: string;
  };
}

export default function ChatListItem({ chat }: Props) {
  return (
    <div className="flex items-center space-x-3 p-2 border-b border-gray-300">
      <img
        src={chat.partnerProfileImage}
        alt="profile"
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <span className="font-semibold">{chat.partnerNickname}</span>
          <span className="text-xs text-gray-400">{chat.lastMessageTime}</span>
        </div>
        <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
      </div>
      {chat.unreadCount > 0 && (
        <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {chat.unreadCount}
        </div>
      )}
    </div>
  );
}
