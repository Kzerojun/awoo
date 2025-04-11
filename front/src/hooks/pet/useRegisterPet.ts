import { useMutation } from "@tanstack/react-query";
import { registerPet } from "@/api/pet/pet";

export const useRegisterPet = () => {
  return useMutation({
    mutationFn: registerPet,
    onSuccess: (data) => {
      console.log("쿼리 반려견 등록 완료", data);
    },
    onError: (err) => {
      console.error("쿼리 반려견 등록 에러", err);
    },
  });
};
