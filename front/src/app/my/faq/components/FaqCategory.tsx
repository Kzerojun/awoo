import React from "react";
import { FaqItem } from "../data/faqData";
import FaqItemComponent from "./FaqItemComponent";

interface FaqCategoryProps {
  category: string;
  items: FaqItem[];
}

const FaqCategory: React.FC<FaqCategoryProps> = ({ category, items }) => {
  return (
    <div className="mb-3">
      <h2 className="text-teal-500 text-xs font-medium mb-2">{category}</h2>
      <div className="bg-white rounded-lg">
        {items.map((item) => (
          <FaqItemComponent key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FaqCategory;
