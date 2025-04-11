"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import useLocationPermission from "../hooks/useLocationPermission";
import { setWalkData, updateCurrentWalkingDog } from "@/lib/slices/walkSlice";
import { PetInterface } from "@/lib/slices/petSlice";
import Button from "@/common/ui/Button";

import PetCard from "@/app/my/pet/components/PetCard";
import paw from "../../../../public/icons/white_paw.svg";

const backgroundImages = [
  "/images/walking/walkingBackground1.png",
  "/images/walking/walkingBackground2.png",
  "/images/walking/walkingBackground3.png",
  "/images/walking/walkingBackground4.png",
  "/images/walking/walkingBackground5.png",
];

const SelectDog = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const petList = useAppSelector((state) => state.pet.petList);

  const { requestPermission } = useLocationPermission();
  const [selectedPet, setSelectedPet] = useState<PetInterface | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "/images/walking/walkingBackground2.png"
  );

  useEffect(() => {
    console.log("선택된 반려견:", selectedPet);
  }, [selectedPet]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomIndex]);
    dispatch(setWalkData({ selectBackgroundImage: backgroundImages[randomIndex] }));
  }, []);

  const handleSelectPet = (pet: PetInterface) => {
    setSelectedPet((prevPet) => (prevPet?.petId === pet.petId ? null : pet));
  };

  const goToWalkStart = () => {
    if (selectedPet == null) {
      alert("반려견을 선택해주세요!");
      return;
    }
    console.log(selectedPet);
    dispatch(updateCurrentWalkingDog(selectedPet));

    route.push("/walk/start/guide");
  };

  return (
    <div className="relative h-[calc(100dvh-3.5rem)] w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-300"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: selectedPet ? "blur(6px)" : "blur(4px)",
        }}
      />

      <div className="relative z-10 w-80 bg-white/20 py-5 rounded-lg flex flex-col justify-center items-center gap-10">
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-2xl w-52 text-center">
            산책시킬 <span className="font-bold">반려견</span>을 선택하세요.
          </h2>

          <p className="text-sm text-center w-68">
            <span className="font-bold ">한 마리의 반려견</span>만 선택 가능합니다.
          </p>
        </div>

        <div className="w-full py-15 flex flex-col justify-center items-center">
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
        </div>

        <Button
          text="다음으로"
          backgroundColor="green"
          onClick={goToWalkStart}
          width="medium"
          img={paw}
        />
      </div>
    </div>
  );
};
export default SelectDog;
