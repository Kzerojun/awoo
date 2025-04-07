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
    alert("펫 정보를 불러오지 못 했습니다.");
    router.push("/my");
    return;
  }

  return (
    <>
      <CommonTopBar title={petDetail.name} backUrl="/my/pet" />
      <main className="mt-14 px-4 h-[calc(100dvh-7rem)] overflow-y-auto">
        <PetDetail pet={petDetail} />
      </main>
    </>
  );
};

export default PetDetailPage;
