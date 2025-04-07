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
  };

  useEffect(() => {
    if (selectCalendar === 0) {
      refetchMemberSchedule();
    } else if (selectCalendar > 0) {
      refetchPetSchedule();
    }
  }, [selectCalendar]);

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
    <div className="w-full flex flex-col justify-center gap-y-5">
      <div className="flex items-center justify-center gap-x-5 mt-3">
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
        {petList.map((pet, index) => (
          <button
            key={pet?.petId ?? `fallback-${index}`}
            className={`text-sm border-2 rounded-2xl w-20 h-10 ${
              selectCalendar === pet.petId
                ? "bg-light-green text-white border-light-green"
                : "border-light-green text-black"
            }`}
            onClick={() => handleCalendarChange(pet.petId)}
          >
            <span className="truncate">{pet.name}</span>
          </button>
        ))}
      </div>

      <div className="w-full mx-auto p-4 rounded-lg bg-white">
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

        <div className="grid grid-cols-7 mt-2 text-sm">
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
                  "h-24 flex flex-col justify-start rounded-lg cursor-pointer hover:bg-gray-100 transition"
                )}
                onClick={() => handleDateClick(dateStr)}
              >
                {/* 날짜 */}
                <div
                  className={clsx(
                    "text-center text-sm w-6 h-6 mx-auto rounded-full flex items-center justify-center",
                    isCurrent ? "bg-green text-white font-semibold" : "text-gray-700"
                  )}
                >
                  {dayNum}
                </div>

                {/* 일정 바 영역 */}
                <div className="flex flex-col gap-[3px] mt-1 overflow-hidden">
                  {dayEvents.slice(0, 3).map((event) => {
                    const isStart = event.startDate === dateStr;
                    return (
                      <div
                        key={event.id}
                        className={clsx(
                          " px-1 py-[2px] text-[10px] truncate",
                          isStart ? "text-white" : "text-transparent"
                        )}
                        style={{ backgroundColor: event.color }}
                      >
                        {event.title}
                      </div>
                    );
                  })}

                  {dayEvents.length > 3 && (
                    <div className="text-[10px] text-gray-500 text-center">더보기</div>
                  )}
                </div>
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
          key: e.id,
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
