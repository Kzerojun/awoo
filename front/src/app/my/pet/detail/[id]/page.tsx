"use client";

import { useParams } from "next/navigation";

const PetDetailPage = () => {
  const params = useParams();
  const id = params.id;

  return (
    <div>
      <div>반려견 상세 조회 페이지 {id}</div>
    </div>
  );
};

export default PetDetailPage;
