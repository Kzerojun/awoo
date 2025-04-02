"use client";
import React from "react";
import LoadingDog from "./LoadingDog";

const WalkingLoading = () => {
  const loadingText = "로딩중...";
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <LoadingDog />
      <div className="flex gap-1 text-xl font-bold mt-4">
        {loadingText.split("").map((char, i) => (
          <span key={i} className={`inline-block animate-jump delay-${i * 100}`}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WalkingLoading;
