"use client";

import React, { useEffect, useState } from "react";
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
import { useRegisterSchedule } from "@/hooks/calendar/useRegisterSchedule";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useGetPetSchedule } from "@/hooks/calendar/useGetPetSchedule";
import { useGetMemberSchedule } from "@/hooks/calendar/useGetMemberSchedule";

type Event = {
  id: number;
  title: string;
  startDate: string; // "yyyy-MM-dd"
  endDate: string; // "yyyy-MM-dd"
  color: string;
  dog: string;
};
const Calendar = () => {
  const queryClient = useQueryClient();
  const petList = useAppSelector((state) => state.pet.petList);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  const [clickedDate, setClickedDate] = useState<string>("");
  const [showListModal, setShowListModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // 반려견 or 전체 일정 선택
  const [selectCalendar, setSelectCalendar] = useState<number>(0);

  // 반려견 등록
  const {
    mutate: registerMutate,
    isError: registerError,
    isPending: registerPending,
  } = useRegisterSchedule();

  // 반려견별 일정 조회
  // 조건 없이 모두 호출
  const { data: memberScheduleData, refetch: refetchMemberSchedule } = useGetMemberSchedule();
  const { data: petScheduleData, refetch: refetchPetSchedule } = useGetPetSchedule(selectCalendar);

  // 상황에 따라 선택
  const activeScheduleData = selectCalendar === 0 ? memberScheduleData : petScheduleData;

  const handleCalendarChange = (id: number) => {
    setSelectCalendar(id);
    if (id === 0) {
      refetchMemberSchedule();
    } else {
      refetchPetSchedule();
    }
  };
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

  useEffect(() => {
    console.log("선택된 페이지:", selectCalendar);
  }, [selectCalendar]);

  useEffect(() => {
    if (selectCalendar === 0) {
      refetchMemberSchedule();
    }
  }, []);

  const handleAddSchedule = (data: {
    title: string;
    color: string;
    dog: string;
    startDate: string;
    endDate: string;
  }) => {
    console.log("입력 데이터", data, selectCalendar, data.color);

    if (!data.title || !data.color || !data.dog || !data.startDate || !data.endDate) {
      alert("모든 정보를 입력해주세요!");
      return;
    }

    const selectedPet = petList.find((pet) => pet.name === data.dog);
    if (!selectedPet) {
      alert("선택한 반려견 정보를 찾을 수 없습니다.");
      return;
    }

    registerMutate(
      {
        petId: selectedPet.petId,
        scheduleContent: data.title,
        startTime: `${data.startDate}T00:00:00`,
        endTime: `${data.endDate}T00:00:00`,
        color: data.color,
      },
      {
        onSuccess: () => {
          alert("일정이 등록되었어요!");
          if (selectCalendar === 0) {
            refetchMemberSchedule();
          } else {
            refetchMemberSchedule();
          }
          setShowAddModal(false);
        },
      }
    );
  };

  const transformedEvents: Event[] =
    activeScheduleData?.map((item) => ({
      id: item.calendarId,
      title: item.scheduleContent,
      startDate: item.startTime.slice(0, 10), // "yyyy-MM-dd"
      endDate: item.endTime.slice(0, 10),
      color: item.color || "#C4C4C4", // 기본 색상 처리
      dog: item.petName,
    })) || [];

  const getEventsForDay = (dateStr: string) =>
    transformedEvents.filter((event) => {
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
        <button
          className={`text-sm border-2 rounded-2xl w-20 h-10 ${
            selectCalendar === 0
              ? "bg-light-green text-white border-light-green"
              : "border-light-green text-black"
          }`}
          onClick={() => handleCalendarChange(0)}
        >
          전체 일정
        </button>
        {petList.map((pet) => (
          <button
            key={pet.petId}
            className={`text-sm border-2 rounded-2xl w-20 h-10 ${
              selectCalendar === pet.petId
                ? "bg-light-green text-white border-light-green"
                : "border-light-green text-black"
            }`}
            onClick={() => handleCalendarChange(pet.petId)}
          >
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
          id: e.id,
          title: `${e.title}`,
          time: e.startDate === e.endDate ? "" : `(${e.startDate} ~ ${e.endDate})`,
          color: e.color,
          dog: e.dog,
        }))}
        onAddClick={() => {
          setShowListModal(false);
          setShowAddModal(true);
        }}
        clickedDate={clickedDate}
        onRefresh={() => {
          if (selectCalendar === 0) {
            refetchMemberSchedule();
          } else {
            refetchPetSchedule();
          }
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
