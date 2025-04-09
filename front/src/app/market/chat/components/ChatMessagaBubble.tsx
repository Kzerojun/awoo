import { formatTime } from "@/utils/formatTime";

interface Props {
  sender: "me" | "partner";
  content: string;
  time: string;
  image?: string | null;
}
export default function ChatMessageBubble({ sender, content, time, image }: Props) {
  const isMe = sender === "me";

  return (
    <div className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
      {/* 이미지 버블 */}
      {image && (
        <div className={`flex ${isMe ? "justify-end" : "justify-start"} w-full`}>
          <div className={`flex items-end gap-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
            <img src={image} alt="chat image" className="w-40 h-40 object-cover rounded-2xl" />
            <span className="text-[10px] text-gray-400 mb-0.5">{formatTime(time)}</span>
          </div>
        </div>
      )}

      {/* 텍스트 버블 */}
      {content && content.trim() !== "" && (
        <div className={`flex ${isMe ? "justify-end" : "justify-start"} w-full`}>
          <div className={`flex items-end gap-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
            <div
              className={`
                px-3 py-2 
                rounded-2xl 
                text-sm 
                whitespace-pre-wrap 
                break-words 
                ${isMe ? "bg-light-aqua text-gray-800 rounded-br-none" : "bg-gray-100 text-gray-800 border border-gray-200 rounded-bl-none"}
              `}
              style={{ maxWidth: "85%", wordBreak: "break-word" }}
            >
              {content}
            </div>
            <span className="text-[10px] text-gray-400 mb-0.5">{formatTime(time)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
