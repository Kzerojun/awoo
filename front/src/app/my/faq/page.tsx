"use client";
import CommonTopBar from "@/common/ui/CommonTopBar";
import FaqList from "./components/FaqList";
import { faqData } from "./data/faqData";

export default function Faq() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-[70px]">
      <CommonTopBar title="자주 묻는 질문" />

      <div className="pb-20 px-4">
        <FaqList faqData={faqData} />
      </div>
    </div>
  );
}
