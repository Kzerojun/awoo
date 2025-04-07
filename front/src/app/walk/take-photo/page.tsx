"use client";

import TakePhoto from "../components/TakePhoto";
import { useAppSelector } from "@/lib/store";

const TakePhotoPage = () => {
  const backgroundImage = useAppSelector((state) => state.walk.selectBackgroundImage);
  return (
    <>
      <div className="h-full flex flex-col items-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-300 blur-xs"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <TakePhoto />
      </div>
    </>
  );
};

export default TakePhotoPage;
