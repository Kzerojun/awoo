"use client";

import React, { ChangeEvent, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import ColorPicker from "./ColorPicker";
import { set } from "date-fns";
import { TrashIcon } from "@heroicons/react/24/solid";

interface Props {
  title: string;
  setTitle: (v: string) => void;
  color: string;
  setColor: (v: string) => void;
  onSubmit: () => void;
  selectedDog: string;
  setSelectedDog: (v: string) => void;
  dogList: string[];
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  showDelete?: boolean;
  onDelete?: () => void;
}

const ScheduleModalContent = ({
  title,
  setTitle,
  color,
  setColor,
  onSubmit,
  selectedDog,
  setSelectedDog,
  dogList,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  showDelete = false,
  onDelete,
}: Props) => {
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const [showColorModal, setShowColorModal] = useState<boolean>(false);
  return (
    <>
      <div className="flex items-center justify-end gap-x-2">
        {showDelete && (
          <button>
            <TrashIcon className="w-6 h-6 text-red-500" onClick={onDelete} />
          </button>
        )}
        <button>
          <CheckIcon className="w-6 h-6 text-custom-gray" onClick={() => onSubmit()} />
        </button>
      </div>

      <input
        type="text"
        placeholder="일정 제목"
        className="w-full font-bold text-2xl outline-none placeholder:text-gray-400 placeholder:text-2xl"
        value={title}
        onChange={changeTitle}
      />

      <div className="my-3 flex items-center justify-start gap-x-3">
        <div>
          <button
            onClick={() => setShowColorModal(true)}
            className="w-20 rounded-full border border-gray-300 text-white"
            style={{ backgroundColor: color }}
          >
            컬러
          </button>
        </div>
        <div className="w-32 text-center text-custom-gray focus:outline-none border-1 border-custom-gray rounded-2xl">
          <select
            name="selectedDog"
            id="selectedDog"
            value={selectedDog}
            onChange={(e) => setSelectedDog(e.target.value)}
            className="focus:outline-none"
          >
            <option className="text-custom-gray" value="" disabled>
              강아지 선택
            </option>
            {dogList.map((dog) => (
              <option value={dog} key={dog}>
                {dog}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-y-3 border-t-2 border-custom-gray">
        <div className="flex justify-between items-center mt-3">
          <span>시작 날짜</span>
          <input
            type="date"
            className="text-right text-sm text-custom-gray"
            value={startDate || ""}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <span>종료 날짜</span>
          <input
            type="date"
            className="text-right text-sm text-custom-gray"
            value={endDate || ""}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <ColorPicker
        isOpen={showColorModal}
        onClose={() => setShowColorModal(false)}
        onSelect={(selectedColor) => setColor(selectedColor)}
      />
    </>
  );
};

export default ScheduleModalContent;
