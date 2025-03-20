"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { clearPhoto } from "@/lib/slices/photoSlice";

const PhotoCheckPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const image = useAppSelector((state) => state.photo.image);

  return (
    <div className="flex flex-col items-center">
      {image ? (
        <>
          <img src={image} alt="Captured" className="border rounded-lg" />
          <div className="mt-4 flex gap-4">
            <button
              //   onClick={sendToBackend}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg"
            >
              끝내기
            </button>
            <button
              onClick={() => {
                dispatch(clearPhoto()); // Redux 상태 초기화
                router.push("/walk/take-photo");
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              다시 찍기
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">이미지를 불러오는 중...</p>
      )}
    </div>
  );
};
export default PhotoCheckPage;
