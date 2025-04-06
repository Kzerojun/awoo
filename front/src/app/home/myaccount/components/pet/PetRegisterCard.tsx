"use client";

import { useRouter } from "next/navigation";

export default function PetRegisterCard() {
  const router = useRouter();
  return (
    <div
      className="bg-[#FFE2E2] rounded-xl p-4 shadow cursor-pointer"
      onClick={() => router.push("/my/pet/register")}
    >
      <p className="text-sm text-gray-800">아직 등록된 반려견이 없어요 !</p>
      <p className="text-lg font-bold text-black">반려견 등록하고 함께해요 🐶</p>
      <p className="text-right text-xs text-gray-700 mt-2">반려견 등록하러 가기</p>
    </div>
  );
}
