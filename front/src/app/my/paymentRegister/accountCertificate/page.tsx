"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/common/ui/TopBar";
import { BellIcon } from "@heroicons/react/24/outline";
import Certificate, { CertificateRef } from "./components/Certificate";

export default function AccountCertificate() {
  const router = useRouter();
  const [maxAttempts] = useState(3); // 최대 시도 횟수
  const [attempts, setAttempts] = useState(0); // 현재 시도 횟수

  // 인증 컴포넌트 ref
  const certificateRef = useRef<CertificateRef>(null);

  // 인증번호 검증 완료 처리
  const handleCertificateComplete = (certificateNumber: string) => {
    console.log("인증번호:", certificateNumber);

    // 실제 구현에서는 API를 통해 인증번호 검증

    // 간단한 검증 예시 (테스트용)
    if (certificateNumber === "1234") {
      // 임의의 정답 인증번호
      // 인증 성공
      alert("계좌 인증이 완료되었습니다.");

      router.push("/my/paymentRegister/registerDone");
    } else {
      // 시도 횟수 증가
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      // 최대 시도 횟수 초과 시
      if (newAttempts >= maxAttempts) {
        alert("인증 시도 횟수를 초과했습니다. 처음부터 다시 시도해주세요.");
        router.push("/my/paymentRegister/accountConnect"); // 계좌 연결 페이지로 이동
        return;
      }

      // 오류 메시지 표시 및 입력폼 초기화
      alert(`인증번호가 일치하지 않습니다. (${newAttempts}/${maxAttempts})`);

      // ref를 통해 입력폼 초기화
      if (certificateRef.current) {
        certificateRef.current.resetInput();
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopBar title="멍Pay" rightAction={<BellIcon className="h-6 w-6 text-gray-500 mt-1" />} />

      <div className="pt-14 flex-1 flex flex-col">
        <Certificate ref={certificateRef} onComplete={handleCertificateComplete} />
      </div>
    </div>
  );
}
