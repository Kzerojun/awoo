"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import useLocationPermission from "../hooks/useLocationPermission";
import { setCurrentWalkingDog } from "@/lib/slices/userActionSlice";
import { PetInterface } from "@/lib/slices/petSlice";
import Button from "@/common/ui/Button";

import PetCard from "@/app/my/pet/components/PetCard";
import paw from "../../../../public/icons/white_paw.svg";

const SelectDog = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const petList = useAppSelector((state) => state.pet.petList);

  //   테스트를 위한 목데이터
  // const petList: PetInterface[] = [
  //   {
  //     petId: 1,
  //     memberId: 101,
  //     name: "콩이",
  //     profileImage: null,
  //     breed: "푸들",
  //     age: 3,
  //     savingId: 201,
  //     walkInMonth: 0,
  //   },
  // {
  //   petId: 2,
  //   memberId: 101,
  //   name: "두부",
  //   profileImage: null, // 프로필 이미지 없는 경우
  //   breed: "말티즈",
  //   age: 5,
  //   savingId: 202,
  // },
  // {
  //   petId: 3,
  //   memberId: 101,
  //   name: "뽀삐",
  //   profileImage: "",
  //   breed: "시바견",
  //   age: 2,
  //   savingId: 203,
  // },
  // ];

  const { requestPermission } = useLocationPermission();
  const [selectedPet, setSelectedPet] = useState<PetInterface | null>(null);

  const handleSelectPet = (pet: PetInterface) => {
    setSelectedPet((prevPet) => (prevPet?.petId === pet.petId ? null : pet));
  };

  const goToWalkStart = () => {
    if (selectedPet == null) {
      alert("반려견을 선택해주세요!");
      return;
    }
    console.log(selectedPet);
    dispatch(setCurrentWalkingDog(selectedPet));

    route.push("/walk/start/guide");
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center mt-10">
      <div className="w-80 flex flex-col justify-center items-center gap-10">
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-2xl w-52 text-center">
            산책시킬 <span className="font-bold">반려견</span>을 선택하세요.
          </h2>
          {/* <p className="text-sm text-center w-68">
            산책 적금의 이율 혜택은 산책시킨 강아지 중 한 마리의 강아지의 적금 상품에 적용됩니다.
          </p> */}
          <p className="text-sm text-center w-68">
            <span className="text-green">한 마리의 반려견</span>만 선택 가능합니다.
          </p>
        </div>

        {petList.length !== 1 ? (
          <div className="w-60 flex flex-col justify-center gap-y-5">
            {petList?.map((pet) => (
              <PetCard
                key={pet.petId}
                pet={pet}
                clickable={false}
                onSelect={() => handleSelectPet(pet)}
                selected={selectedPet?.petId === pet.petId}
              />
            ))}
          </div>
        ) : (
          <div className="w-60 flex flex-col justify-center mt-10 mb-10">
            {petList?.map((pet) => (
              <PetCard
                key={pet.petId}
                pet={pet}
                clickable={false}
                onSelect={() => handleSelectPet(pet)}
                selected={selectedPet?.petId === pet.petId}
              />
            ))}
          </div>
        )}

        <Button
          text="다음으로"
          backgroundColor="light-green"
          onClick={goToWalkStart}
          width="medium"
          img={paw}
        />
      </div>
    </div>
  );
};
export default SelectDog;
