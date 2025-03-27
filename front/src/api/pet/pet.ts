import axios from "axios";
import urlToFile from "@/app/signup/hooks/useChangeFile";
import axiosInstance from "../axiosInstance";
import PetRegister from "@/app/my/pet/components/PetRegister";

// 반려견 등록
interface PetRegisterPayload {
  name: string;
  breed: string;
  age: number;
  imageFile: File | null;
  selectedPetAvatar: string;
}

// 펫 목록 전체 조회
interface PetListPayload {}

export const getPetList = async ({}) => {};

export const registerPet = async ({ imageFile, selectedPetAvatar }: PetRegisterPayload) => {};
