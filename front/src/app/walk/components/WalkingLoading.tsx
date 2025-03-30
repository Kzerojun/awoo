"use client";
import React from "react";
import LoadingDog from "./LoadingDog";

const WalkingLoading = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div>로딩 중...</div>
      <LoadingDog />
    </div>
  );
};

export default WalkingLoading;
