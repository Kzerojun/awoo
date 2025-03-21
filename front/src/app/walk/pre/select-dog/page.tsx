"use client";

import { useRouter } from "next/navigation";
import useLocationPermission from "../../hooks/useLocationPermission";
import Image from "next/image";

import TopBar from "@/common/ui/TopBar";
import Button from "@/common/ui/Button";

import dogList from "../../../../../public/icons/walking/ex_DogList.svg";
import paw from "../../../../../public/icons/white_paw.svg";
const WalkPreSelectDogPage = () => {
  const route = useRouter();
  const { requestPermission } = useLocationPermission();
  const goToWalkStart = () => {
    requestPermission();
    route.push("/walk/start/walking");
  };

  return (
    <>
      <TopBar title="산책" />
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="w-80 flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col items-center justify-center gap-3">
            <h2 className="text-2xl w-52 text-center">
              산책시킬 <span className="font-bold">반려견</span>을 선택하세요.
            </h2>
            <p className="text-sm text-center w-68">
              산책 적금의 이율 혜택은 산책시킨 강아지 중 한 마리의 강아지의 적금 상품에 적용됩니다.
            </p>
            <p className="text-sm text-center w-68">
              최대 <span className="text-green">3마리의 반려견</span>까지 선택 가능합니다.
            </p>
          </div>
          {/* 아직 반려견 등록을 안 해서 이미지로 잠시 대체 */}
          <Image src={dogList} alt="강아지 목록 예제 이미지" />
          <Button
            text="산책하기"
            backgroundColor="light-green"
            onClick={goToWalkStart}
            width="medium"
            img={paw}
          />
        </div>
      </div>
    </>
  );
};

export default WalkPreSelectDogPage;
