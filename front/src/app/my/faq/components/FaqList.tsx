import React from "react";
import { FaqItem } from "../data/faqData";
import FaqCategory from "./FaqCategory";

interface FaqListProps {
  faqData: FaqItem[];
}

const FaqList: React.FC<FaqListProps> = ({ faqData }) => {
  // 카테고리별로 FAQ 항목 그룹화
  const groupedFaqs: { [key: string]: FaqItem[] } = faqData.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as { [key: string]: FaqItem[] }
  );

  return (
    <>
      {Object.entries(groupedFaqs).map(([category, items]) => (
        <FaqCategory key={category} category={category} items={items} />
      ))}
    </>
  );
};

export default FaqList;
