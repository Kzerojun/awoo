import axios from "axios";
import urlToFile from "@/app/signup/hooks/useChangeFile";
import axiosInstance from "../axiosInstance";
import PetRegister from "@/app/my/pet/components/PetRegister";

// 반려견 등록 interface
interface PetRegisterPayload {
  requestDto: Record<string, any>;
  imageFile: File | null;
  selectedPetAvatar: string;
}

// 펫 목록 전체 조회 interface
interface PetListPayload {}

// 반려견 등록
export const registerPet = async ({
  requestDto,
  imageFile,
  selectedPetAvatar,
}: PetRegisterPayload) => {
  const formData = new FormData();
  console.log("반려동물 요청 데이터");

  formData.append(
    "requestDto",
    new Blob([JSON.stringify(requestDto)], {
      type: "application/json",
    })
  );

  if (imageFile) {
    formData.append("profileImage", imageFile);
  } else if (!imageFile && selectedPetAvatar !== "") {
    const file = await urlToFile(selectedPetAvatar, "default-avatar.jpg");
    formData.append("profileImage", file);
  }

  try {
    const res = await axiosInstance.post("/pets", formData);
    console.log("반려견 등록 성공: ", res.data);
    return res.data;
  } catch (err) {
    console.error("반려견 등록 실패:", err);
    throw err;
  }
};

export const getPetList = async ({}) => {};
