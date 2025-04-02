import { useState } from "react";

interface Props {
  onToggleActions: () => void;
  onSendMessage: (text: string) => void; // 반드시 추가
}

export default function ChatInputBox({ onToggleActions, onSendMessage }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSendMessage(text);
    setText(""); // 전송 후 비우기
  };

  return (
    <div className="flex items-center p-2 border-t bg-white">
      <button className="mr-2 text-2xl" onClick={onToggleActions}>
        ＋
      </button>
      <input
        type="text"
        placeholder="메시지 보내기"
        className="flex-1 border rounded-full px-3 py-2 text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button className="ml-2 text-xl text-aqua">😀</button>
      <button className="ml-1 text-xl text-aqua" onClick={handleSubmit}>
        ▶
      </button>
    </div>
  );
}
