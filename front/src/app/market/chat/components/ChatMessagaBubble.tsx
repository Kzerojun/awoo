interface Props {
  sender: "me" | "partner";
  content: string;
  time: string;
  image?: string | null;
}

export default function ChatMessageBubble({ sender, content, time }: Props) {
  const isMe = sender === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} px-2`}>
      <div className="flex flex-col space-y-1">
        <div
          className={`
            max-w-[240px] px-3 py-2 rounded-2xl text-sm break-words
            ${isMe ? "bg-aqua text-white rounded-br-none" : "bg-white border rounded-bl-none"}
          `}
        >
          {content}
        </div>
        <div className={`text-[10px] text-gray-400 ${isMe ? "text-right" : "text-left"}`}>
          {time}
        </div>
      </div>
    </div>
  );
}
