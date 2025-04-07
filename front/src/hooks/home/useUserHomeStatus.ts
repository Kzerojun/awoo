import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getInternalAccounts } from "@/api/account/open/saving/depositlist";
import { getPetList } from "@/api/pet/pet";
import { getSavingAccountList, SavingResponse } from "@/api/account/my/saving";
import { getUserInfo } from "@/api/user/auth";

// 홈 상태 타입
export type UserHomeStatus = "NEWBIE" | "ONLY_DEPOSIT" | "WITH_PET" | "WITH_SAVING" | "COMPLETE";

// 간단한 인터페이스 정의 (백엔드 응답 구조에 맞춰 필요 최소 필드만 정의)
interface Account {
  accountNo: string;
  accountBalance: number;
}

interface Pet {
  petId: number;
  savingId?: number; // 반려견이 적금과 연동되었는지 여부
}

interface UserInfo {
  paymentRegister: boolean; // 멍페이 등록 여부
}

export const useUserHomeStatus = (): {
  status: UserHomeStatus;
  account: Account | null;
  isLoading: boolean;
} => {
  // 입출금 계좌
  const {
    data: account,
    isLoading: isAccountLoading,
    error: accountError,
  } = useQuery<Account | null>({
    queryKey: ["accounts"],
    queryFn: getInternalAccounts,
    staleTime: 1000 * 60, // 1분 캐싱
  });

  // 반려견 목록
  const {
    data: pets = [],
    isLoading: isPetLoading,
    error: petError,
  } = useQuery<Pet[] | null>({
    queryKey: ["pets"],
    queryFn: getPetList,
    staleTime: 1000 * 60,
  });

  // 적금 목록
  const {
    data: savings = [],
    isLoading: isSavingLoading,
    error: savingError,
  } = useQuery<SavingResponse[]>({
    queryKey: ["savings"],
    queryFn: getSavingAccountList,
    staleTime: 1000 * 60,
  });

  // 사용자 정보
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery<UserInfo>({
    queryKey: ["user"],
    queryFn: getUserInfo,
    staleTime: 1000 * 60,
  });

  const isLoading = isAccountLoading || isPetLoading || isSavingLoading || isUserLoading;

  useEffect(() => {
    if (accountError) console.error("❌ 계좌 에러:", accountError);
    if (petError) console.error("❌ 펫 에러:", petError);
    if (savingError) console.error("❌ 적금 에러:", savingError);
    if (userError) console.error("❌ 유저 정보 에러:", userError);
  }, [accountError, petError, savingError, userError]);

  if (isLoading) return { status: "NEWBIE", account: null, isLoading: true };
  if (accountError || petError || savingError || userError)
    return { status: "NEWBIE", account: null, isLoading: false };

  const hasDeposit = !!account;
  const hasPet = Array.isArray(pets) && pets.length > 0;
  const hasSaving = Array.isArray(savings) && savings.length > 0;
  const hasMongPay = user?.paymentRegister === true;

  if (!hasDeposit && !hasPet) return { status: "NEWBIE", account: null, isLoading: false };
  if (hasDeposit && !hasPet) return { status: "ONLY_DEPOSIT", account, isLoading: false };
  if (hasDeposit && hasPet && !hasSaving) return { status: "WITH_PET", account, isLoading: false };
  if (hasDeposit && hasPet && hasSaving && !hasMongPay)
    return { status: "WITH_SAVING", account, isLoading: false };
  if (hasDeposit && hasPet && hasSaving && hasMongPay)
    return { status: "COMPLETE", account, isLoading: false };

  return { status: "NEWBIE", account: null, isLoading: false }; // fallback
};
