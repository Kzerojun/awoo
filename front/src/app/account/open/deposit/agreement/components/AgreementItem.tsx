"use client";
// import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/24/outline";
interface AgreementItemProps {
  label: string;
  isChecked: boolean;
  onClick: () => void;
}

const AgreementItem = ({ label, isChecked, onClick }: AgreementItemProps) => {
  return (
    <button onClick={onClick} className="flex items-center space-x-2 text-sm w-full text-left">
      {/* 아이콘 영역 고정 */}
      <div className="w-7 flex justify-center">
        {isChecked ? (
          <CheckIcon className="w-5 h-5 text-aqua" />
        ) : (
          <CheckIcon className="w-5 h-5 text-gray-300" />
        )}
      </div>

      {/* 텍스트 */}
      <span>{label}</span>
    </button>
  );
};
export default AgreementItem;
