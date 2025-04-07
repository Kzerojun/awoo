"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store";
import useLocationPermission from "@/app/walk/hooks/useLocationPermission";
import Button from "@/common/ui/Button";
import Image from "next/image";
import basicDog from "../../../../public/images/pet-avatars/petava_basic.png";
import checkMark from "../../../../public/icons/walking/CheckMark.svg";
import backpack from "../../../../public/icons/walking/backpack.svg";
import paw from "../../../../public/icons/white_paw.svg";
import { useGetSavingAccount } from "@/hooks/account/saving/useGetSavingAccount";
import { SavingResponse } from "@/api/account/my/saving";

const WalkingGuide = () => {
  const { requestPermission } = useLocationPermission();
  const router = useRouter();
  const walkingDog = useAppSelector((state) => state.walk.currentWalkingDog);
  // 배경화면
  const backgroundImage = useAppSelector((state) => state.walk.selectBackgroundImage);

  const petProfile = walkingDog?.profileImage;
  const dogName = walkingDog?.name;
  // const dogName = "알버느티나얼";

  // 강아지 적금 아이디
  const savingId = useAppSelector((state) => state.walk.currentWalkingDog?.savingId);

  // 강아지 적금 정보 담을 객체
  const [petSavingInfo, setPetSavingInfo] = useState<SavingResponse | null>(null);
  // 강아지 적금 정보 조회
  const { data: petSavingData, isPending: petSavingPending } = useGetSavingAccount(
    savingId ? String(savingId) : ""
  );

  useEffect(() => {
    if (savingId && petSavingData) {
      setPetSavingInfo(petSavingData);
    }
  }, [savingId, petSavingData]);

  const goToWalkStart = () => {
    requestPermission();
    console.log("산책으로 이동중");
    router.push("/walk/start/walking");
  };

  return (
    <div className="relative h-[calc(100dvh-3.5rem)] w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-300 blur-xs"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      <div className="relative z-10 w-full max-w-md mx-auto h-full overflow-y-auto p-4 ">
        <div className="flex justify-center items-center">
          <div className=" w-80 bg-white/20 py-5 rounded-lg flex flex-col justify-center items-center gap-10">
            <div className="flex flex-col justify-center items-center gap-y-8">
              {/* 프로필 이미지 */}

              <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden border border-custom-gray">
                <Image
                  src={petProfile ?? basicDog}
                  alt="강아지 프로필"
                  fill
                  className="object-cover"
                />
              </div>

              {/* 나중에 현재 강아지 적금금액 추가하기 */}
              <div className="text-2xl text-center leading-tight">
                <span className="font-bold text-green">{dogName}</span>와(과) <br />
                산책합니다!
              </div>

              <div>
                {walkingDog && petSavingInfo ? (
                  <div className="flex flex-col gap-3 bg-[#BEE1E6]/80 border border-[#A6C1CF] shadow-lg rounded-xl p-5 w-72 text-sm text-gray-800">
                    <h3 className="text-lg font-bold text-center text-[#3A5F71] mb-2">
                      {dogName}의 적금 정보 🐶
                    </h3>

                    <div className="flex justify-between">
                      <span className="font-semibold">적금 단계</span>
                      <span>{petSavingInfo.accountName}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-semibold">현재 적금액</span>
                      <span className="text-green-700 font-semibold">
                        {Number(petSavingInfo.totalBalance).toLocaleString("ko-KR")}원
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-y-2 mt-2 pt-2 border-t border-blue-200">
                      <p className="text-sm font-medium">이번 달 산책 인정 횟수 🐾</p>
                      <p className="text-xl text-blue-700 font-bold">{walkingDog.walkInMonth} 회</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm">아직 가입된 적금 상품이 없습니다.</div>
                )}
              </div>

              {/* 적금 안내 */}
              <div className="w-72 p-6 bg-amber-100/80 border border-amber-300 rounded-xl shadow-md text-[15px] text-center text-gray-800 leading-relaxed flex flex-col gap-3">
                <h2 className="text-lg font-bold text-center text-amber-700 mb-1">
                  📌 AwOO 산책 적금 유의사항
                </h2>

                <ul className="list-decimal list-inside space-y-2">
                  <li>
                    매달 <span className="font-semibold text-amber-600">20회 이상</span> 산책이
                    필요하며,
                    <br />매 회차{" "}
                    <span className="font-semibold text-amber-600">30분 이상, 3km 이상</span> <br />
                    이어야 인정됩니다.
                  </li>
                  <li>
                    산책 전 <strong>‘시작하기’ → ‘산책하기’</strong> <br />
                    버튼을 꼭 눌러주세요.
                  </li>
                  <li>
                    산책 종료 시 <strong>‘산책 종료’</strong> 버튼을 <br />
                    누르셔야 기록이 저장됩니다.
                  </li>
                  <li>
                    <strong>앱을 켠 상태로</strong> 산책하면 더 정확한 기록이 가능해요.
                  </li>
                  <li>
                    수집된 트래킹 정보는{" "}
                    <strong>
                      <br />
                      우대 금리 확인 용도
                    </strong>
                    로만 사용되며, <br />
                    <span className="text-red-700 font-medium">절대 외부에 노출되지 않습니다.</span>
                  </li>
                  <li>
                    궁금한 점은 언제든지 <br />
                    <strong>1:1 문의하기</strong>를 이용해 주세요!
                  </li>
                </ul>
              </div>

              {/* 산책 준비물 안내 */}
              <div className="w-72 p-6 flex flex-col items-center justify-center bg-green-100/80 border border-green-300 rounded-xl shadow-md text-[15px] text-gray-800s gap-4">
                {/* 제목 */}
                <div className="flex items-center gap-3 border-b border-green-200 pb-3">
                  <Image src={backpack} alt="백팩 아이콘" width={28} height={28} />
                  <h2 className="text-lg font-bold text-green-800">산책 준비물</h2>
                </div>

                <p className="text-center text-sm text-green-700 font-bold">
                  잊지 말고 꼭 챙기세요! 🌿
                </p>

                {/* 준비물 리스트 */}
                <ul className="flex flex-col gap-3 pl-1 text-[15px]">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✔️</span>
                    <span>목줄 or 하네스</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✔️</span>
                    <span>배변 봉투</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✔️</span>
                    <span>간식과 물</span>
                  </li>
                </ul>

                <div className="w-72 mt-4 text-center text-[15px] text-green-800 leading-relaxed px-2">
                  <p className="mb-2 font-medium">산책은 건강을 위한 최고의 선물이에요.</p>
                  <p>
                    <strong>AwOO</strong>와 함께 걷는 매일이 쌓이면,
                    <br />
                    적금도 함께 자라나요 🌱
                  </p>
                  <p className="mt-3 font-semibold">
                    오늘도 행복한 발걸음,
                    <br />
                    <span className="text-green-700">저축과 함께 시작해볼까요?</span>
                  </p>
                </div>
              </div>

              <Button
                text="시작하기"
                onClick={goToWalkStart}
                width="medium"
                backgroundColor="green"
                img={paw}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkingGuide;
