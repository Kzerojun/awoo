import { useMutation } from "@tanstack/react-query";
import { updatePetDetail } from "@/api/pet/pet";

export const useUpdatePetDetail = () => {
  return useMutation({
    mutationFn: updatePetDetail,
    onSuccess: (data) => {
      console.log("쿼리 반려견 수정 완료", data);
    },
    onError: (err) => {
      console.error("쿼리 반려견 수정 에러", err);
    },
  });
};
