// ChatInputBox.tsx

interface Props {
  onToggleActions: () => void;
}

export default function ChatInputBox({ onToggleActions }: Props) {
  return (
    <div className="flex items-center p-2 border-t bg-white">
      <button className="mr-2 text-2xl" onClick={onToggleActions}>
        ＋
      </button>
      <input
        type="text"
        placeholder="메시지 보내기"
        className="flex-1 border rounded-full px-3 py-2 text-sm"
      />
      <button className="ml-2 text-xl text-aqua">😀</button>
      <button className="ml-1 text-xl text-aqua">▶</button>
    </div>
  );
}
