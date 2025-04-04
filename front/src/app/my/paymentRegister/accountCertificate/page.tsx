"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import CommonTopBar from "@/common/ui/CommonTopBar";
import { BellIcon } from "@heroicons/react/24/outline";
import Certificate, { CertificateRef } from "./components/Certificate";
import { verifyOneWonTransfer } from "@/api/payment/payment";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { changeSelectedDepositAccountNo } from "@/lib/slices/savingAccountDetailSlice";

export default function AccountCertificate() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [maxAttempts] = useState(3); // 최대 시도 횟수
  const [attempts, setAttempts] = useState(0); // 현재 시도 횟수
  const [isVerifying, setIsVerifying] = useState(false);
  const [accountNo, setAccountNo] = useState("");

  // 인증 컴포넌트 ref
  const certificateRef = useRef<CertificateRef>(null);

  // 저장된 계좌번호 가져오기
  useEffect(() => {
    const account = sessionStorage.getItem("verification_account");
    if (account) {
      setAccountNo(account);
      // Redux store에 계좌번호 저장 (입출금 계좌 내역 조회용)
      dispatch(changeSelectedDepositAccountNo(account));
    } else {
      toast.error("계좌 정보가 없습니다. 이전 단계로 돌아갑니다.");
      router.push("/my/paymentRegister/accountConnect");
    }
  }, [router, dispatch]);

  // 인증번호 검증 완료 처리
  const handleCertificateComplete = async (certificateNumber: string) => {
    if (!accountNo) {
      toast.error("계좌 정보가 없습니다. 이전 단계로 돌아갑니다.");
      router.push("/my/paymentRegister/accountConnect");
      return;
    }

    setIsVerifying(true);

    try {
      // 1원 송금 인증번호 검증 API 호출
      const response = await verifyOneWonTransfer({
        accountNo: accountNo,
        authCode: certificateNumber,
      });

      console.log("계좌 인증 성공:", response);
      toast.success("계좌 인증이 완료되었습니다.");

      // 성공 시 다음 페이지로 이동
      // 인증 완료 후 세션 데이터 정리
      sessionStorage.removeItem("verification_account");
      sessionStorage.removeItem("verification_bank");

      router.push("/my/paymentRegister/registerDone");
    } catch (error) {
      console.error("계좌 인증 실패:", error);

      // 시도 횟수 증가
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      // 최대 시도 횟수 초과 시
      if (newAttempts >= maxAttempts) {
        toast.error("인증 시도 횟수를 초과했습니다. 처음부터 다시 시도해주세요.");
        router.push("/my/paymentRegister/accountConnect"); // 계좌 연결 페이지로 이동
        return;
      }

      // 오류 메시지 표시 및 입력폼 초기화
      toast.error(`인증번호가 일치하지 않습니다. (${newAttempts}/${maxAttempts})`);

      // ref를 통해 입력폼 초기화
      if (certificateRef.current) {
        certificateRef.current.resetInput();
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <CommonTopBar title="계좌 연결" rightAction="bell" />

      <div className="pt-14 flex-1 flex flex-col">
        <Certificate
          ref={certificateRef}
          onComplete={handleCertificateComplete}
          disabled={isVerifying}
        />
      </div>
    </div>
  );
}
