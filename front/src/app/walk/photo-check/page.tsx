"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setWalkData } from "@/lib/slices/walkSlice";
import Image from "next/image";
import Button from "@/common/ui/Button";
import paw from "../../../../public/icons/white_paw.svg";
import greenPaw from "../../../../public/icons/walking/green_paw.svg";

const PhotoCheckPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const image = useAppSelector((state) => state.walk.photo);
  const dogName = useAppSelector((state) => state.walk.currentWalkingDog?.name);
  const backgroundImage = useAppSelector((state) => state.walk.selectBackgroundImage);
  const today = new Date().toISOString().split("T")[0]; // '2024-04-06'

  const downloadImage = () => {
    if (!image || typeof image !== "string") return;

    const link = document.createElement("a");
    link.href = image;
    if (dogName) {
      link.download = `walking_${dogName}_${today}.jpg`;
    } else {
      link.download = `walking_image_${today}.jpg`;
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const goToCheckEnd = () => {
    router.push("/walk/end/check");
  };

  const rePhoto = () => {
    dispatch(setWalkData({ photo: null })); // Redux 상태 초기화
    router.push("/walk/take-photo");
  };

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-300 blur-xs"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      {image ? (
        <div className="flex flex-col items-center justify-center w-full z-50 ">
          {/* <div className="text-2xl mb-5">사진 확인</div> */}
          <div className="relative w-full max-w-md aspect-[3/4.5] overflow-hidden border">
            <Image src={image} alt="이미지" fill className="object-cover" />
          </div>
          <div className="my-4 flex flex-col items-center justify-center gap-4 bg-white/30 w-72 rounded-lg py-2">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-xl">사진을 저장해보세요!</h3>
              <p className="text-sm">함께 찍은 추억을 보관하세요.</p>
            </div>

            <Button
              text="다운로드"
              onClick={downloadImage}
              backgroundColor="green/50"
              fontColor="green"
              border="green"
              width="medium"
            />
            <Button
              text="다시 찍기"
              onClick={rePhoto}
              backgroundColor="green/50"
              fontColor="green"
              border="green"
              width="medium"
            />
            <Button
              text="산책 종료"
              onClick={goToCheckEnd}
              backgroundColor="green"
              fontColor="custom-white"
              img={paw}
              width="medium"
            />
          </div>
        </div>
      ) : (
        <p className="text-gray-500">이미지를 불러오는 중...</p>
      )}
    </div>
  );
};
export default PhotoCheckPage;
