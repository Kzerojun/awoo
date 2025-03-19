"use client";

import Button from "@/common/ui/Button";

import TopBar from "@/common/ui/TopBar";

import TakePhoto from "../../components/TakePhoto";
import CheckPhoto from "../../components/CheckPhoto";

const StartPhoto = () => {
  return (
    <>
      <TopBar title="산책" />
      <div className="mt-15 px-4 flex flex-col items-center">
        <div>산책 시작 바로 전 사진찍기</div>
        <TakePhoto />
        <CheckPhoto />
      </div>
    </>
  );
};

export default StartPhoto;
