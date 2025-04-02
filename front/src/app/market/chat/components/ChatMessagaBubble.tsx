import { formatTime } from "@/utils/formatTime";

interface Props {
  sender: "me" | "partner";
  content: string;
  time: string;
  image?: string | null;
}

export default function ChatMessageBubble({ sender, content, time }: Props) {
  const isMe = sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} w-full`}>
      <div className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
        {/* 💬 말풍선 */}
        <div
          className={`
            px-3 py-2 
            rounded-2xl 
            text-sm 
            whitespace-pre-wrap 
            break-words 
            ${isMe ? "bg-aqua text-white rounded-br-none" : "bg-white border rounded-bl-none"}
          `}
          style={{
            maxWidth: "90%", // 최대 70%
            wordBreak: "break-word", // 강제 줄바꿈
          }}
        >
          {content}
        </div>

        {/* 🕐 시간 */}
        <span className="text-[10px] text-gray-400 mb-0.5">{formatTime(time)}</span>
      </div>
    </div>
  );
}
