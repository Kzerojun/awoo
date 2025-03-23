import { useMutation } from "@tanstack/react-query";
import { signup } from "@/api/user/auth";

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};
