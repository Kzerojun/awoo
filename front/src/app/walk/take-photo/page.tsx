"use client";

import Button from "@/common/ui/Button";

import TopBar from "@/common/ui/TopBar";

import TakePhoto from "../components/TakePhoto";

const TakePhotoPage = () => {
  return (
    <>
      <div className="mt-15 px-4 flex flex-col items-center">
        <div>산책 종료 후 사진찍기</div>
        <TakePhoto />
      </div>
    </>
  );
};

export default TakePhotoPage;
