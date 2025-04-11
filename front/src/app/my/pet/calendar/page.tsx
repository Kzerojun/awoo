"use client";
import CommonTopBar from "@/common/ui/CommonTopBar";
import Calendar from "../components/Calendar";

const CalendarPage = () => {
  return (
    <div>
      <CommonTopBar title="캘린더" backUrl="/my" />
      <main className="flex flex-col items-center w-full min-h-[calc(100dvh-7rem)]">
        <Calendar />
      </main>
    </div>
  );
};

export default CalendarPage;
