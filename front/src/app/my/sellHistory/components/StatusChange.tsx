"use client";
import { motion, AnimatePresence } from "framer-motion";

interface StatusChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (status: "SA" | "RE") => void;
  currentStatus: string;
  position?: "up" | "down"; // 위치 옵션 추가 (위/아래)
}

export default function StatusChange({
  isOpen,
  onClose,
  onStatusChange,
  currentStatus,
  position = "down", // 기본값은 아래로 설정
}: StatusChangeModalProps) {
  // 애니메이션 설정
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: position === "down" ? -5 : 5,
      height: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
    },
    exit: {
      opacity: 0,
      y: position === "down" ? -5 : 5,
      height: 0,
    },
  };

  // 모달 위치 스타일 계산
  const positionStyles = position === "down" ? { top: "100%" } : { bottom: "100%" };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute bg-white shadow-md rounded-md z-50 border left-0 right-0"
          style={positionStyles}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dropdownVariants}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-50 transition duration-150"
            onClick={() => onStatusChange("SA")}
          >
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-teal-500 mr-2"></div>
              <span>판매중으로 변경</span>
            </div>
          </button>
          <button
            className="w-full text-left px-4 py-1 hover:bg-gray-50 transition duration-150"
            onClick={() => onStatusChange("RE")}
          >
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
              <span>예약중으로 변경</span>
            </div>
          </button>
          <button
            className="w-full text-left px-4 py-1 text-sm text-gray-500 hover:bg-gray-50 transition duration-150 border-t border-gray-200"
            onClick={onClose}
          >
            취소
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
