"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

import DateSchedulePopup from "./DateSchedulePopup";
import ScheduleModal from "./ScheduleModal";

const Calendar = () => {
  const [events, setEvents] = useState<EventInput[]>([]);

  const [clickedDate, setClickedDate] = useState<string>("");

  const [showListModal, setShowListModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // 날짜 클릭 시 모달 열기
  const handleDateClick = (arg: DateClickArg) => {
    setClickedDate(arg.dateStr);
    setShowListModal(true);
  };

  // 일정 등록 후 이벤트 추가
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
        title: `${data.title} `,
        start: data.startDate,
        end: data.endDate,
        color: data.color,
      },
    ]);
  };

  // 현재 날짜 해당하는 일정 필터링
  const schedulesForSelectedDate = events.filter((e) => e.start === clickedDate);

  // 일정 등록 모달 닫기 -> 초기화
  const closeAddModal = () => {
    // setEvents([]);
    setClickedDate("");
    setShowAddModal(false);
  };

  return (
    <div className="p-2">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
      />

      <DateSchedulePopup
        isOpen={showListModal}
        onClose={() => setShowListModal(false)}
        dateLabel={clickedDate.replace(/-/g, ".")}
        schedules={schedulesForSelectedDate.map((e) => ({
          id: String(e.id),
          title: String(e.title),
          color: String(e.color),
          dog: e.title?.split("(")[1]?.replace(")", "") ?? "",
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
