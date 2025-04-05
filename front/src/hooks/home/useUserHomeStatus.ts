import { useAppSelector } from "@/lib/store";
import { useMemo } from "react";

export type UserHomeStatus = "NEWBIE" | "ONLY_DEPOSIT" | "WITH_SAVING" | "COMPLETE";

export const useUserHomeStatus = (): UserHomeStatus => {
  const hasDepositAccount = useAppSelector((state) => state.accountStatus.hasDepositAccount);
  const petList = useAppSelector((state) => state.user.petList ?? []);

  const status = useMemo(() => {
    if (!hasDepositAccount && petList.length === 0) return "NEWBIE";

    if (hasDepositAccount && petList.length === 0) return "ONLY_DEPOSIT";

    const hasSaving = petList.some(
      (pet) => pet.savingId !== null && pet.savingId !== undefined && pet.savingId !== 0
    );
    const allSaved = petList.every(
      (pet) => pet.savingId !== null && pet.savingId !== undefined && pet.savingId !== 0
    );

    if (hasDepositAccount && hasSaving && !allSaved) return "WITH_SAVING";
    if (hasDepositAccount && allSaved) return "COMPLETE";

    // 🐶 입출금 있고, 강아지도 있지만 savingId는 모두 0인 경우
    if (hasDepositAccount && petList.length > 0) return "ONLY_DEPOSIT";

    return "NEWBIE"; // fallback
  }, [hasDepositAccount, petList]);
  return status;
};
