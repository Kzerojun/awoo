"use client";

import { useRouter } from "next/navigation";

import TopBar from "@/common/ui/TopBar";
import Button from "@/common/ui/Button";

const WalkPreSelectDogPage = () => {
  const route = useRouter();

  const goToWalkStart = () => {
    route.push("/walk/start/walking");
  };

  return (
    <>
      <TopBar title="산책" />
      <div className="flex flex-col items-center mt-4 px-4">
        <div>산책 전 강아지 선택 페이지</div>
        <Button text="산책하러 가기" backgroundColor="light-green" onClick={goToWalkStart} />
      </div>
    </>
  );
};

export default WalkPreSelectDogPage;
