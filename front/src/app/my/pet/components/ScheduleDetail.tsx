"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/lib/store";
import ScheduleModalContent from "./ScheduleModalContent";
import { useDeleteSchedule } from "@/hooks/calendar/useDeleteSchedule";
import { useUpdateSchedule } from "@/hooks/calendar/useUpdateSchedule";

interface Schedule {
  id: number;
  title: string;
  time: string;
  color: string;
  dog: string;
}

interface Props {
  clickedDate: string;
  isOpen: boolean;
  schedule: Schedule | null;
  onClose: () => void;
  onRefresh: () => void;
}

const ScheduleDetail = ({ clickedDate, isOpen, schedule, onClose, onRefresh }: Props) => {
  const petList = useAppSelector((state) => state.pet.petList);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#968F8F");
  const [selectedDog, setSelectedDog] = useState("");
  const dogList = petList.map((pet) => pet.name);
  const [startDate, setStartDate] = useState(clickedDate);
  const [endDate, setEndDate] = useState(clickedDate);

  const { mutate: updateScheduleMutate } = useUpdateSchedule();
  const { mutate: deleteScheduleMutate } = useDeleteSchedule();

  useEffect(() => {
    if (isOpen && schedule) {
      setTitle(schedule.title);
      setColor(schedule.color);
      setSelectedDog(schedule.dog);
      const timeParts = schedule.time
        .replace(/[()]/g, "")
        .split("~")
        .map((t) => t.trim());

      if (timeParts.length === 2) {
        setStartDate(timeParts[0]);
        setEndDate(timeParts[1]);
      } else {
        setStartDate(clickedDate);
        setEndDate(clickedDate);
      }
    }
  }, [isOpen, schedule, clickedDate]);

  if (new Date(endDate) < new Date(startDate)) {
    alert("종료 날짜는 시작 날짜보다 빠를 수 없습니다.");
    return;
  }

  const resetSetting = () => {
    setTitle("");
    setColor("#968F8F");
    setSelectedDog("");
    onClose();
  };

  const handleSubmit = () => {
    if (!title || !selectedDog || !startDate || !endDate || !schedule) {
      alert("모든 정보를 입력해주세요!");
      return;
    }
    const selectedPet = petList.find((pet) => pet.name === selectedDog);
    if (!selectedPet) {
      alert("선택한 반려견 정보를 찾을 수 없습니다.");
      return;
    }

    updateScheduleMutate(
      {
        calendarId: schedule.id,
        petId: selectedPet.petId,
        scheduleContent: title,
        startTime: `${startDate}T00:00:00`,
        endTime: `${endDate}T00:00:00`,
        color: color,
      },
      {
        onSuccess: () => {
          alert("일정이 수정되었어요!");
          onClose();
          onRefresh();
        },
        onError: () => {
          alert("일정 수정에 실패했습니다.");
          onClose();
          return;
        },
      }
    );
  };

  const handleDelete = () => {
    if (!schedule) {
      alert("선택된 일정이 없습니다.");
      onClose();
      return;
    }
    deleteScheduleMutate(
      { calendarId: schedule.id },
      {
        onSuccess: () => {
          alert("일정이 삭제되었습니다.");
          onClose();
          onRefresh();
        },
        onError: () => {
          alert("일정 삭제에 실패했습니다.");
          onClose();
          return;
        },
      }
    );
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
              showDelete={true}
              onDelete={handleDelete}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScheduleDetail;
