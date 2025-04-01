import axiosInstance from "@/api/axiosInstance";

export const getPetDetail = async (petId: number) => {
  const { data } = await axiosInstance.get(`/pets/${petId}`);
  return data.response;
};
