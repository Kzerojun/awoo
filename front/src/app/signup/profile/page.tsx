"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import ProfileImage from "../components/ProfileImage";
import ProfileNickname from "../components/ProfileNickname";

const ProfileRegistPage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>("");

  const pages = [
    {
      id: 0,
      content: () => <ProfileImage imagePreview={imagePreview} setImagePreview={setImagePreview} />,
    },
    { id: 1, content: () => <ProfileNickname nickname={nickname} setNickname={setNickname} /> },
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
    trackMouse: false,
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
      <div className="flex flex-col items-center justify-center">
        <div
          {...handlers}
          className=" pb-14 relative w-full h-[calc(100vh-56px)] overflow-y-auto overflow-x-hidden"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              className="absolute w-full h-full"
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

          {/* 페이지 인디케이터 */}
          <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => changePage(index, index > page ? 1 : -1)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === page ? "bg-aqua scale-110" : "bg-custom-gray"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileRegistPage;
