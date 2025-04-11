"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import ScheduleDetail from "./ScheduleDetail";

export interface Schedule {
  id: number;
  title: string;
  time: string;
  color: string;
  dog: string;
  calendarType: "산책" | "일반";
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  dateLabel: string;
  schedules: Schedule[];
  showDelete?: boolean;
  onToggleDelete?: () => void;
  onAddClick: () => void;
  clickedDate: string;
  onRefresh: () => void;
}

const DateSchedulePopup = ({
  isOpen,
  onClose,
  dateLabel,
  schedules,
  showDelete = false,
  onToggleDelete,
  onAddClick,
  clickedDate,
  onRefresh,
}: Props) => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const formatDateRange = (range: string) => {
    if (!range || !range.includes("~")) return ""; // 빈 값이면 그냥 빈 문자열 반환

    const [start, end] = range.split("~").map((d) => d.trim());
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return ""; // 유효하지 않은 날짜 방지

    const format = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`;
    return `${format(startDate)} - ${format(endDate)}`;
  };

  return (
    <>
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
                    <li
                      key={s.id}
                      className="flex items-center gap-2 text-sm h-10"
                      onClick={() => setSelectedSchedule(s)}
                    >
                      {/* 색상 표기 */}
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                      {/* 일정 텍스트 내용 */}
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between text-sm font-medium text-gray-800">
                          <span className="truncate max-w-[70%]">{s.title}</span>
                          {s.dog && <span className="text-gray-500 text-xs">{s.dog}</span>}
                        </div>
                        <span className="text-xs text-gray-400 mt-0.5 text-right">
                          {formatDateRange(s.time)}
                        </span>
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
                  <PlusCircleIcon className="text-blue-300 w-16 h-16" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScheduleDetail
        clickedDate={selectedSchedule?.time || clickedDate}
        isOpen={!!selectedSchedule}
        schedule={selectedSchedule}
        onClose={() => setSelectedSchedule(null)}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default DateSchedulePopup;
