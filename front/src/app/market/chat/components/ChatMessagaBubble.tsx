interface Props {
  sender: "me" | "partner";
  content: string;
  time: string;
  image?: string | null;
}

export default function ChatMessageBubble({ sender, content, time }: Props) {
  const isMe = sender === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] p-2 rounded-lg text-sm ${isMe ? "bg-aqua text-white" : "bg-white border"}`}
      >
        {content}
        <div className="text-[10px] text-right mt-1 text-gray-400">{time}</div>
      </div>
    </div>
  );
}
