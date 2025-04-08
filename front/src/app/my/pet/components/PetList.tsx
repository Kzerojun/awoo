"use client";

import PetCard from "./PetCard";
import Button from "@/common/ui/Button";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import dogIcon from "../../../../../public/icons/walking/dog.svg";
import walkingIcon from "../../../../../public/icons/walking/walkingIcon.svg";
import Image from "next/image";
import PetWalkStatus from "./PetWalkStatus";
import { usePetList } from "@/hooks/pet/usePetList";
import { PetInterface, setPetList } from "@/lib/slices/petSlice";
import React, { useEffect, useState } from "react";
interface Pet {
  petId: number;
  memberId: number;
  name: string;
  profileImage: string | null;
  breed: string;
  age: number;
  savingId: number;
  walkInMonth: number;
}

const PetList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const petList = useAppSelector((state) => state.pet.petList);
  const { refetch: petListRefetch } = usePetList();

  // 반려견 정보 조회 useEffect 로
  useEffect(() => {
    const fetchPetList = async () => {
      const result = await petListRefetch();
      if (result.isSuccess && result.data) {
        dispatch(setPetList(result.data));
      }
    };
    fetchPetList();
  }, []);

  const goToRegisterPet = () => {
    router.push("/my/pet/register");
  };

  const goToWalk = () => {
    router.push("/walk/pre");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50 overflow-y-auto ">
      {/* 산책 횟수 */}
      <div className="w-72 bg-[#F0FDF4] border border-[#C3EEC7] shadow rounded-xl p-5 text-sm text-gray-800 mt-5 mb-5">
        <h3 className="text-lg font-bold text-center text-green-700 mb-4 flex items-center justify-center gap-2">
          <Image src={walkingIcon} alt="산책 아이콘" className="w-6 h-6" />
          이번 달 산책 횟수
        </h3>
        <div className="flex justify-end text-xs mr-1 mb-1"> 이번 달 인정 | 전체 </div>
        <div className="flex flex-col gap-3">
          {petList.map((pet, index) => (
            <div
              key={`walk-${pet?.petId ?? `index-${index}`}`}
              className="bg-white border border-[#D2EEDD] rounded-xl px-4 py-3 flex justify-between items-center shadow-sm"
            >
              <div className="font-medium text-green-700">{pet.name}</div>
              <PetWalkStatus petId={pet.petId} name={pet.name} />
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            className="flex items-center gap-1 px-3 py-1.5 border border-[#8ae48a] rounded-xl text-xs text-[#33665A] hover:bg-[#d3efd8] transition"
            onClick={goToWalk}
          >
            산책하기
          </button>
        </div>
      </div>

      {/* 나의 반려견 */}
      <div className="flex flex-col justify-center items-center mb-3">
        <div className="w-72 bg-[#b6e7ff83] border border-[#92f0fc] shadow rounded-xl p-5 text-sm text-gray-800 mt-3 mb-5">
          <div className="text-blue-600 flex items-center justify-center gap-3 w-full text-center">
            <Image src={dogIcon} alt="강아지 아이콘" className="w-8 h-8" />
            <span className=" text-xl py-3 font-bold">나의 반려견</span>
          </div>
          <div className="w-60 flex flex-col justify-center gap-y-5">
            {petList.map((pet, index) => (
              <PetCard key={`walk-${pet?.petId ?? `index-${index}`}`} pet={pet} />
            ))}
          </div>
          {petList.length < 3 ? (
            <div
              className="mt-5 w-60 h-12 border-1 border-light-green rounded-2xl flex justify-center items-center bg-white/50 active:bg-light-green active:text-green transition-colors duration-150"
              onClick={goToRegisterPet}
            >
              <div className="flex justify-center items-center gap-x-2">
                <span>반려견 추가하기</span> <PlusCircleIcon className="w-6 h-6 text-light-green" />
              </div>
            </div>
          ) : (
            <div className="mt-2 w-60 h-14 flex justify-center items-center active:bg-light-green active:text-white transition-colors duration-150">
              <span className="text-gray-400 text-center">
                반려견 등록은 <br />
                3마리까지 가능합니다.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetList;
