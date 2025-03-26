"use client";

import PetCard from "./PetCard";
import Button from "@/common/ui/Button";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import dogIcon from "../../../../../public/icons/walking/dog.svg";
import walkingIcon from "../../../../../public/icons/walking/walkingIcon.svg";
import Image from "next/image";

interface Pet {
  petId: number;
  memberId: number;
  name: string;
  profileImage: string | null;
  breed: string;
  age: number;
  savingId: number;
}

const PetList = () => {
  const router = useRouter();
  const petList: Pet[] = [
    {
      petId: 1,
      memberId: 1,
      name: "멍멍이",
      profileImage: null,
      breed: "진돗개",
      age: 1,
      savingId: 0,
    },
    {
      petId: 2,
      memberId: 1,
      name: "냠냠이",
      profileImage: null,
      breed: "푸들",
      age: 16,
      savingId: 0,
    },
    {
      petId: 4,
      memberId: 1,
      name: "흰둥이",
      profileImage: null,
      breed: "말티즈",
      age: 11,
      savingId: 0,
    },
    {
      petId: 5,
      memberId: 1,
      name: "덕진이",
      profileImage: null,
      breed: "말티즈",
      age: 0,
      savingId: 0,
    },
  ];

  // 후에 useEffect 써서 반려견 별 한 달 산책횟수 조회
  const walkNumber: number[] = [1, 2, 3, 4];

  const goToRegisterPet = () => {
    router.push("/my/pet/register");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-2 bg-gray-50 ">
      {/* 산책 횟수 */}
      <div className="bg-white shadow-md rounded-2xl p-4 mt-3 mb-5 ">
        <div className="flex flex-col items-center justify-center gap-y-3">
          <div className="flex justify-center items-center gap-x-2 border-b-1 border-gray-300 ">
            <Image src={walkingIcon} alt="산책 아이콘" className="w-8 h-8" />
            <div className="text-xl font-bold py-3 w-full text-center">이번 달 산책 횟수</div>
          </div>

          <div className="flex flex-col justify-center items-center gap-y-4">
            {walkNumber.map((num, index) => (
              <div key={index}>
                {petList[index].name} : {num}회 /30
              </div>
            ))}
          </div>
          <div className="mt-3">
            <Button text="산책하러 가기" backgroundColor="green" width="medium" />
          </div>
        </div>
      </div>

      {/* 나의 반려견 */}
      <div className="flex flex-col justify-center items-center mb-3">
        <div className="bg-white shadow-md rounded-2xl p-4 mt-3 mb-5 flex flex-col justify-center items-center gap-y-5">
          <div className="flex items-center justify-center gap-3 border-b-1 border-gray-300 w-full text-center">
            <Image src={dogIcon} alt="강아지 아이콘" className="w-8 h-8" />
            <span className=" text-xl py-3 font-bold">나의 반려견</span>
          </div>
          <div className="w-60 flex flex-col justify-center gap-y-5">
            {petList.map((pet) => (
              <PetCard key={pet.petId} pet={pet} />
            ))}
          </div>
          <div
            className="w-60 h-16 border-1 border-light-green rounded-2xl flex justify-center items-center active:bg-light-green active:text-white transition-colors duration-150"
            onClick={goToRegisterPet}
          >
            <div className="flex justify-center items-center gap-x-2">
              <span>반려견 추가하기</span> <PlusCircleIcon className="w-6 h-6 text-light-green" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetList;
