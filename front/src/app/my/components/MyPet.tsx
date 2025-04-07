"use client";
import vector from "../../../../public/icons/mypage/vector.svg";
import Image from "next/image";
import my from "../../../../public/icons/bottombar/deactive/my.svg";
import React, { useEffect, useState } from "react";
import { usePetList } from "@/hooks/pet/usePetList";
import { PetInterface } from "@/lib/slices/petSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyPet() {
  const router = useRouter();
  const { refetch: petListRefetch } = usePetList();
  const [petList, setPetList] = useState<PetInterface[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPetList = async () => {
      setIsLoading(true);
      try {
        const result = await petListRefetch();
        console.log("반려견 목록 조회", result.data);
        console.log("반려견 목록에서 펫 데이터", result?.data);

        if (result.isSuccess) {
          setPetList(result.data || []);
        }
      } catch (err) {
        console.error("반려견 목록 조회 실패임!", err);
        setPetList([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPetList();
  }, [petListRefetch]);

  // 반려동물이 없는 경우 보여줄 컴포넌트
  const NoPetsMessage = () => (
    <div className="flex flex-col items-center justify-center w-full">
      <p className="text-sm text-gray-500 mb-2">등록된 반려동물이 없어요</p>
    </div>
  );

  const goToPetDetail = (petId: number) => {
    router.push(`/my/pet/detail/${petId}`);
  };

  return (
    <div className="w-full block">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-y-3 w-full">
          <div className="flex justify-between items-center">
            <div className="text-xs text-[#828282] ml-1">나의 반려동물 보러 가기</div>
            {petList && petList?.length <= 2 && (
              <div
                className="text-xs text-[#828282] "
                onClick={() => router.push("/my/pet/register")}
              >
                등록하기 +
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-3">
              <div className="text-sm text-gray-400">로딩 중...</div>
            </div>
          ) : !petList || petList.length === 0 ? (
            <NoPetsMessage />
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-start gap-x-8">
                {petList.map((pet) => (
                  <Image
                    key={pet.petId}
                    src={pet.profileImage}
                    alt="반려동물 아이콘"
                    width={55}
                    height={55}
                    className="rounded-full object-cover aspect-square"
                    onClick={() => goToPetDetail(pet.petId)}
                  />
                ))}
              </div>
              <div className="text-gray-400" onClick={() => router.push("/my/pet")}>
                <Image src={vector} alt="화살표" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
