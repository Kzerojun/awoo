import { useState } from "react";

interface Props {
  onToggleActions: () => void;
  onSendMessage: (text: string, image?: File) => void; // 이미지 파일을 선택적으로 포함
  isImageSelected: boolean;
}

export default function ChatInputBox({ onToggleActions, onSendMessage }: Props) {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = () => {
    if (!text.trim() && !selectedImage) return;
    onSendMessage(text, selectedImage || undefined);
    setText("");
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col p-2 border-t bg-white">
      {selectedImage && (
        <div className="mb-2">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="미리보기"
            className="h-20 w-auto object-cover rounded"
          />
        </div>
      )}
      <div className="flex items-center">
        <button className="mr-2 text-2xl" onClick={onToggleActions}>
          ＋
        </button>
        <input
          type="text"
          placeholder="메시지 보내기"
          className="flex-1 border rounded-full px-3 py-2 text-sm"
          value={text}
          onChange={handleTextChange}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="imageInput"
          onChange={handleImageChange}
        />
        <label htmlFor="imageInput" className="ml-2 text-xl cursor-pointer">
          🖼️
        </label>
        <button className="ml-2 text-xl" onClick={handleSubmit}>
          ▶
        </button>
      </div>
    </div>
  );
}
