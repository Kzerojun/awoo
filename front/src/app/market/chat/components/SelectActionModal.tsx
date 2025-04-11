interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SelectActionModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-t-2xl w-full max-w-md p-6">
        <div className="flex justify-center space-x-6">
          <div className="flex flex-col items-center cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              📷
            </div>
            <span className="text-sm mt-1">앨범</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              📸
            </div>
            <span className="text-sm mt-1">카메라</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              💰
            </div>
            <span className="text-sm mt-1">멍페이</span>
          </div>
        </div>
        {/* 닫기 */}
        <button className="mt-4 w-full text-gray-500 text-sm" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
