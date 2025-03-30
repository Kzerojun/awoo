"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PetDetail from "../../components/PetDetail";
import CommonTopBar from "@/common/ui/CommonTopBar";
import { usePetDetail } from "@/hooks/pet/usePetDetail";
import WalkingLoading from "@/app/walk/components/WalkingLoading";
import Button from "@/common/ui/Button";
const PetDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const petId = Number(params.id);
  const { data: petDetail, isLoading, isError } = usePetDetail(petId);

  if (isLoading) return <WalkingLoading />;
  if (isError || !petDetail) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center gap-y-5">
        <span>정보를 불러오지 못했습니다.</span>
        <Button text="다시 로그인하기" onClick={() => router.push("/login")} width="medium" />
      </div>
    );
  }

  return (
    <>
      <CommonTopBar title={petDetail.name} />
      <main className="mt-14 px-4 h-[calc(100vh-112px)]">
        <PetDetail pet={petDetail} />
      </main>
    </>
  );
};

export default PetDetailPage;
