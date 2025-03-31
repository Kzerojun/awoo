"use client";
import vector from "../../../../public/icons/mypage/vector.svg";
import Image from "next/image";
import my from "../../../../public/icons/bottombar/deactive/my.svg";
import React, { useEffect, useState } from "react";
import { usePetList } from "@/hooks/pet/usePetList";
import { PetInterface } from "@/lib/slices/petSlice";
import Link from "next/link";

export default function MyPet() {
  const { refetch: petListRefetch } = usePetList();
  const [petList, setPetList] = useState<PetInterface[] | null>(null);

  useEffect(() => {
    const fetchPetList = async () => {
      try {
        const result = await petListRefetch();
        console.log("반려견 목록 조회", result.data);
        console.log("반려견 목록에서 펫 데이터", result?.data);

        if (result.isSuccess && result.data) {
          setPetList(result.data);
        }
      } catch (err) {
        console.error("반려견 목록 조회 실패임!", err);
      }
    };
    fetchPetList();
  }, []);

  return (
    <Link href="my/pet" className="w-full block">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center">
            <div className="text-xs text-[#828282] ml-1">나의 반려동물 보러 가기</div>
          </div>

          <div className="flex items-center justify-center gap-x-3">
            {petList?.map((pet) => (
              <Image
                key={pet.petId}
                src={pet.profileImage}
                alt="반려동물 아이콘"
                width={70}
                height={70}
                className="rounded-full object-cover aspect-square"
              />
            ))}
          </div>
        </div>
        <div className="text-gray-400">
          <Image src={vector} alt="화살표" />
        </div>
      </div>
    </Link>
  );
}
