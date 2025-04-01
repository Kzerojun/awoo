"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScheduleModalContent from "./ScheduleModalContent";
import { toast } from "react-toastify";
import { useAppSelector } from "@/lib/store";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  clickedDate: string;
  onSubmit: (data: {
    title: string;
    color: string;
    dog: string;
    startDate: string;
    endDate: string;
  }) => void;
}

const ScheduleModal = ({ isOpen, onClose, clickedDate, onSubmit }: Props) => {
  const petList = useAppSelector((state) => state.pet.petList);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#968F8F");
  const [selectedDog, setSelectedDog] = useState("");
  const dogList = petList.map((pet) => pet.name);
  const [startDate, setStartDate] = useState(clickedDate);
  const [endDate, setEndDate] = useState(clickedDate);

  useEffect(() => {
    if (isOpen) {
      setStartDate(clickedDate);
      setEndDate(clickedDate);
    }
  }, [isOpen, clickedDate]);

  if (new Date(endDate) < new Date(startDate)) {
    toast.info("종료 날짜는 시작 날짜보다 빠를 수 없습니다.");
    return;
  }

  const resetSetting = () => {
    setTitle("");
    setColor("#968F8F");
    setSelectedDog("");
    onClose();
  };

  const handleSubmit = () => {
    if (!title || !selectedDog || !startDate || !endDate) {
      toast.info("모든 정보를 입력해주세요!");
      return;
    }
    onSubmit({
      title,
      color,
      dog: selectedDog,
      startDate,
      endDate,
    });
    resetSetting();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/30 flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetSetting}
        >
          <motion.div
            className="w-full bg-white rounded-t-2xl p-4 pb-8 mb-[52px]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ScheduleModalContent
              title={title}
              setTitle={setTitle}
              color={color}
              setColor={setColor}
              onSubmit={handleSubmit}
              selectedDog={selectedDog}
              setSelectedDog={setSelectedDog}
              dogList={dogList}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScheduleModal;
