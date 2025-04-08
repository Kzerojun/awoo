import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

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
    <div className="flex items-center px-4 py-2 bg-white  gap-2">
      {selectedImage && (
        <div className="mb-2">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="미리보기"
            className="h-20 w-auto object-cover rounded-md"
          />
        </div>
      )}
      <div className="flex items-center gap-2">
        <button className="text-2xl text-gray-400 font-semibold px-1" onClick={onToggleActions}>
          ＋
        </button>
        <div className="flex-grow">
          <input
            type="text"
            placeholder="메시지 보내기"
            className="w-[290px] border border-gray-200 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-aqua"
            value={text}
            onChange={handleTextChange}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="imageInput"
          onChange={handleImageChange}
        />

        <button className="text-aqua flex items-center justify-center" onClick={handleSubmit}>
          <PaperAirplaneIcon className="w-5 h-5 text-aqua transform" />
        </button>
      </div>
    </div>
  );
}
