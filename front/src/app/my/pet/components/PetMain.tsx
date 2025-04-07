"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

import Calendar from "./Calendar";
import PetList from "./PetList";

const PetMain = () => {
  const pages = [
    { id: 0, content: () => <Calendar /> },
    { id: 1, content: () => <PetList /> },
  ];

  const [page, setPage] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const changePage = (newPage: number, dir: number) => {
    if (newPage < 0 || newPage >= pages.length) return;
    setDirection(dir);
    setPage(newPage);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => changePage(page + 1, 1),
    onSwipedRight: () => changePage(page - 1, -1),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div {...handlers} className="relative w-full h-full overflow-y-auto overflow-x-hidden">
          {/* 페이지 인디케이터 */}
          <div className="sticky top-1 flex justify-center gap-2 z-20">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => changePage(index, index > page ? 1 : -1)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === page ? "bg-green scale-110" : "bg-custom-gray"
                }`}
              />
            ))}
          </div>

          {/* 페이지 콘텐츠 */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              className="relative w-full h-[98%]"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {pages[page].content()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default PetMain;
