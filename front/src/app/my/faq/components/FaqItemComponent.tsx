import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { FaqItem } from "../data/faqData";

interface FaqItemProps {
  item: FaqItem;
}

const FaqItemComponent: React.FC<FaqItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full py-3 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span className="text-teal-500 mr-2 ml-2">Q.</span>
          <span className="text-gray-800 text-sm">{item.question}</span>
        </div>
        <div className="mr-2">
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </button>

      {isOpen && <div className="pb-3 pl-8 pr-4 text-gray-500 text-xs">{item.answer}</div>}
    </div>
  );
};

export default FaqItemComponent;
