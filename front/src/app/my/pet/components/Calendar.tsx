"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/lib/store";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
  addMonths,
  subMonths,
  isToday,
} from "date-fns";
import clsx from "clsx";
import DateSchedulePopup from "./DateSchedulePopup";
import ScheduleModal from "./ScheduleModal";

type Event = {
  id: string;
  title: string;
  startDate: string; // "yyyy-MM-dd"
  endDate: string; // "yyyy-MM-dd"
  color: string;
  dog: string;
};
const Calendar = () => {
  const petList = useAppSelector((state) => state.pet.petList);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  const [clickedDate, setClickedDate] = useState<string>("");
  const [showListModal, setShowListModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });
  const prefixDays = getDay(start);

  const handlePrev = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNext = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateClick = (dateStr: string) => {
    setClickedDate(dateStr);
    setShowListModal(true);
  };

  const handleAddSchedule = (data: {
    title: string;
    color: string;
    dog: string;
    startDate: string;
    endDate: string;
  }) => {
    setEvents([
      ...events,
      {
        id: `${events.length + 1}`,
        title: `${data.title}`,
        startDate: data.startDate,
        endDate: data.endDate,
        color: data.color,
        dog: `${data.dog}`,
      },
    ]);
  };

  const getEventsForDay = (dateStr: string) =>
    events.filter((event) => {
      return event.startDate <= dateStr && dateStr <= event.endDate;
    });

  const schedulesForSelectedDate = getEventsForDay(clickedDate);

  const closeAddModal = () => {
    setClickedDate("");
    setShowAddModal(false);
  };

  return (
    <div className="p-4 mx-auto">
      <div className="flex items-center justify-center gap-x-5">
        <button className="border-2 border-light-green rounded-2xl w-20 h-10">전체 일정</button>
        {petList.map((pet) => (
          <button key={pet.petId} className="border-2 border-light-green rounded-2xl w-20 h-10">
            {pet.name}
          </button>
        ))}
      </div>

      <div className="max-w-md mx-auto p-4 rounded-lg shadow-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrev} className="text-gray-400">
            &lt;
          </button>
          <h2 className="text-lg font-semibold text-green">{format(currentMonth, "yyyy년 M월")}</h2>
          <button onClick={handleNext} className="text-green">
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 text-sm text-center text-gray-500 font-medium">
          {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 mt-2 text-sm">
          {Array.from({ length: prefixDays }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {days.map((day) => {
            const dateStr = format(day, "yyyy-MM-dd");
            const dayNum = format(day, "d");
            const isCurrent = isToday(day);
            const dayEvents = getEventsForDay(dateStr);
            const hasEvents = dayEvents.length > 0;

            return (
              <div
                key={dateStr}
                className={clsx(
                  "h-14 p-1 flex flex-col justify-between rounded-lg cursor-pointer border hover:bg-gray-100 transition",
                  isCurrent && "bg-yellow-100 border-yellow-400"
                )}
                onClick={() => handleDateClick(dateStr)}
              >
                <div className="text-right pr-1 text-gray-700 text-sm">{dayNum}</div>

                {hasEvents && (
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-600 mt-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: dayEvents[0].color }}
                    />
                    {dayEvents.length > 1 && (
                      <span className="text-[10px]">+{dayEvents.length - 1}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <DateSchedulePopup
        isOpen={showListModal}
        onClose={() => setShowListModal(false)}
        dateLabel={clickedDate.replace(/-/g, ".")}
        schedules={schedulesForSelectedDate.map((e) => ({
          id: String(e.id),
          title: `${e.title}`,
          time: e.startDate === e.endDate ? "" : `(${e.startDate} ~ ${e.endDate})`,
          color: e.color,
          dog: e.dog,
        }))}
        onAddClick={() => {
          setShowListModal(false);
          setShowAddModal(true);
        }}
      />

      <ScheduleModal
        isOpen={showAddModal}
        onClose={closeAddModal}
        clickedDate={clickedDate}
        onSubmit={(data) => {
          handleAddSchedule(data);
          setShowAddModal(false);
        }}
      />
    </div>
  );
};

export default Calendar;
