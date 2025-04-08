"use client";

import React, { useEffect } from "react";

import { useParams, useRouter } from "next/navigation";
import CommonTopBar from "@/common/ui/CommonTopBar";
import PetUpdate from "../../../components/PetUpdate";

const UpdatePetProfile = () => {
  const router = useRouter();
  const params = useParams();
  const petId = Number(params.id);

  return (
    <>
      <CommonTopBar title="반려견 수정" leftAction="back" backUrl={`/my/pet/detail/${petId}`} />
      <main className="mt-14 px-4 h-full ">
        <PetUpdate petId={petId} />
      </main>
    </>
  );
};

export default UpdatePetProfile;
