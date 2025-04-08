import { useMutation } from "@tanstack/react-query";
import { checkPetOcr } from "@/api/pet/pet";

export const useCheckOcr = () => {
  return useMutation({
    mutationFn: checkPetOcr,
    onSuccess: (data) => {
      console.log("쿼리 반려견 ocr 인증 성공:", data);
    },
    onError: (err) => {
      console.error("쿼리 반려견 ocr 인증 실패:", err);
    },
  });
};
