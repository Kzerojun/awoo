import axios from "axios";
import urlToFile from "@/app/signup/hooks/useChangeFile";
import axiosInstance from "../axiosInstance";
import { PetInterface } from "@/lib/slices/petSlice";

// API Response Interface
interface ApiResponse<T> {
  success: boolean;
  response: T;
  error: any;
}

// 반려견 등록 interface
interface PetRegisterPayload {
  requestDto: Record<string, any>;
  imageFile: File | null;
  selectedPetAvatar: string;
}

// 반려동물 등록증 ocr payload
interface OcrPayload {
  ocrImage: File | null;
}

// 반려동물 ocr response
interface OcrResponse {
  animalRegNumber: string;
  animalName: string;
  breedType: string;
  ocrImageUrl: string;
}

// 펫 목록 전체 조회 interface => 각각 PetInterface

// petId
interface PetIdPayload {
  petId: number;
}

// 반려견 수정 interface
interface UpdatePetDetail {
  petId: number;
  requestDto: Record<string, any>;
  imageFile: File | null;
  selectedPetAvatar: string;
}

// 반려견 등록
export const registerPet = async ({
  requestDto,
  imageFile,
  selectedPetAvatar,
}: PetRegisterPayload) => {
  const formData = new FormData();
  console.log("반려동물 요청 데이터:", formData);

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

// 반려동물 등록증 ocr 조회
export const checkPetOcr = async ({ ocrImage }: OcrPayload): Promise<OcrResponse> => {
  const formData = new FormData();

  if (ocrImage) {
    formData.append("ocrImage", ocrImage);
  }

  try {
    const res = await axiosInstance.post("/pets/ocr", formData);
    console.log("반려견 등록증 OCR 인증 성공:", res.data.response);
    return res.data.response;
  } catch (err) {
    console.error("반려견 등록증 OCR 인증 실패:", err);
    throw err;
  }
};

// 반려견 목록 조회

export const getPetList = async (): Promise<PetInterface[] | null> => {
  try {
    const res = await axiosInstance.get("/pets");
    console.log("반려견 목록 조회 성공:", res.data.response.pet);
    return res.data.response.pets;
  } catch (err: any) {
    console.error("반려견 목록 조회 실패:", err.response?.data || err.message || err);
    throw err;
  }
};

// 반려견 상세 조회
export const getPetDetail = async ({ petId }: PetIdPayload): Promise<PetInterface | null> => {
  try {
    const res = await axiosInstance.get(`/pets/${petId}`);
    console.log("반려견 상세 조회 성공:", res.data.response);
    return res.data.response;
  } catch (err: any) {
    throw err;
  }
};

// 반려견 정보 수정
export const updatePetDetail = async ({
  petId,
  requestDto,
  imageFile,
  selectedPetAvatar,
}: UpdatePetDetail): Promise<PetInterface | null> => {
  const formData = new FormData();

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
  console.log("반려동물 수정 데이터:", formData);

  try {
    const res = await axiosInstance.put(`/pets/${petId}`, formData);
    console.log("반려견 수정 성공", res.data);
    return res.data;
  } catch (err) {
    console.error("반려견 수정 실패:", err);
    throw err;
  }
};
