"use client";
import { motion } from "framer-motion";

interface SelectTopBarProps {
  activeTab: "selling" | "completed";
  onTabChange: (tab: "selling" | "completed") => void;
}

export default function SelectTopBar({ activeTab, onTabChange }: SelectTopBarProps) {
  return (
    <div className="flex w-full mt-13 mb-2">
      <div className="flex-1 relative">
        <button
          onClick={() => onTabChange("selling")}
          className={`w-full py-3 text-center font-medium text-sm ${
            activeTab === "selling" ? "text-teal-500" : "text-gray-400"
          }`}
        >
          판매중
        </button>
        {activeTab === "selling" && (
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500"
            layoutId="activeTab"
            transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </div>

      <div className="flex-1 relative">
        <button
          onClick={() => onTabChange("completed")}
          className={`w-full py-3 text-center font-medium text-sm ${
            activeTab === "completed" ? "text-teal-500" : "text-gray-400"
          }`}
        >
          거래완료
        </button>
        {activeTab === "completed" && (
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500"
            layoutId="activeTab"
            transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </div>
    </div>
  );
}
