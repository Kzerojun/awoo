"use client";

import AgreementItem from "./AgreementItem";
import { CheckCircleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
interface AgreementSectionProps {
  title: string;
  items: string[];
  startIndex: number;
  checkedList: boolean[];
  toggleCheck: (index: number) => void;
  toggleSection: (indexes: number[]) => void;
}

const AgreementSection = ({
  title,
  items,
  startIndex,
  checkedList,
  toggleCheck,
  toggleSection,
}: AgreementSectionProps) => {
  const sectionIndexes = items.map((_, idx) => startIndex + idx);
  const isAllChecked = sectionIndexes.every((i) => checkedList[i]);
  return (
    <div className="border p-4 mb-4">
      <div className="flex items-center justify-between w-full mb-4">
        {/* 왼쪽: 체크 + 텍스트 */}
        <div className="flex items-center space-x-2">
          <button onClick={() => toggleSection(sectionIndexes)}>
            {isAllChecked ? (
              <CheckCircleIcon className="w-7 h-7 text-aqua" />
            ) : (
              <CheckCircleIcon className="w-7 h-7 text-gray-300" />
            )}
          </button>
          <h2 className="font-medium text-m">{title}</h2>
        </div>

        {/* 오른쪽: > 아이콘 */}
        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-1">
        {items.map((item, index) => (
          <AgreementItem
            key={index}
            label={item}
            isChecked={checkedList[startIndex + index]}
            onClick={() => toggleCheck(startIndex + index)}
          />
        ))}
      </div>
    </div>
  );
};
export default AgreementSection;
