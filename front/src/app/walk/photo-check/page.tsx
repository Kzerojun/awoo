"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setWalkData } from "@/lib/slices/walkSlice";
import Button from "@/common/ui/Button";
import paw from "../../../../public/icons/white_paw.svg";
import greenPaw from "../../../../public/icons/walking/green_paw.svg";

const PhotoCheckPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const image = useAppSelector((state) => state.walk.photo);

  const goToCheckEnd = () => {
    router.push("/walk/end/check");
  };

  const rePhoto = () => {
    dispatch(setWalkData({ photo: null })); // Redux 상태 초기화
    router.push("/walk/take-photo");
  };

  return (
    <div className="flex flex-col items-center">
      {image ? (
        <>
          <img src={image} alt="Captured" className="border rounded-lg" />
          <div className="mt-4 flex flex-col items-center justify-center gap-4">
            <Button
              text="끝내기"
              onClick={goToCheckEnd}
              backgroundColor="light-green"
              fontColor="custom-white"
              img={paw}
              width="medium"
            />
            <Button
              text="다시 찍기"
              onClick={rePhoto}
              backgroundColor="custom-white"
              fontColor="green"
              img={greenPaw}
              border="green"
              width="medium"
            />
          </div>
        </>
      ) : (
        <p className="text-gray-500">이미지를 불러오는 중...</p>
      )}
    </div>
  );
};
export default PhotoCheckPage;
