"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

interface Schedule {
  id: string;
  title: string;
  time: string;
  color: string;
  dog: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  dateLabel: string;
  schedules: Schedule[];
  showDelete?: boolean;
  onToggleDelete?: () => void;
  onAddClick: () => void;
}

const DateSchedulePopup = ({
  isOpen,
  onClose,
  dateLabel,
  schedules,
  showDelete = false,
  onToggleDelete,
  onAddClick,
}: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-[85%] h-[55%] bg-white rounded-2xl p-6 flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pb-3 text-center border-b-1 border-custom-gray">
              <h2 className="">{dateLabel}</h2>
            </div>

            {/* 일정 목록 */}
            <div className="flex-1 overflow-y-auto mt-5 px-1">
              <ul className="space-y-5 mb-3">
                {schedules.map((s) => (
                  <li key={s.id} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                    <div className="w-full flex flex-col justify-center">
                      <div className=" flex items-center justify-between">
                        <span className="flex-1">{s.title}</span>
                        {s.dog !== "" && <span>{s.dog}</span>}
                      </div>
                      <span className="text-xs text-end">{s.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
              {/* 일정 추가 멘트 */}
              {schedules.length === 0 && (
                <div className="text-center text-gray-500 mt-10">일정을 추가해보세요!</div>
              )}
            </div>

            {/* 일정 추가 버튼 */}
            <div className="pt-4 flex justify-center ">
              <button onClick={onAddClick}>
                <PlusCircleIcon className="text-green w-16 h-16" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DateSchedulePopup;
