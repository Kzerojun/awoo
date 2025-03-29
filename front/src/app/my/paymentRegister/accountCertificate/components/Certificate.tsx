"use client";

import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { useRouter } from "next/navigation";
import NumberKeypad from "../../components/NumberKeypad";

interface CertificateProps {
  onComplete?: (certificateNumber: string) => void;
  disabled?: boolean; // 비활성화 상태 추가
}

// ref를 통해 부모 컴포넌트에서 접근할 수 있는 메소드 정의
export interface CertificateRef {
  resetInput: () => void;
}

const Certificate = forwardRef<CertificateRef, CertificateProps>(
  ({ onComplete, disabled = false }, ref) => {
    const router = useRouter();
    const [certificateNumber, setCertificateNumber] = useState("");
    const [error, setError] = useState("");

    // ref를 통해 외부에서 사용할 수 있는 메소드 노출
    useImperativeHandle(ref, () => ({
      resetInput: () => {
        setCertificateNumber("");
        setError("");
      },
    }));

    // 숫자 입력 처리
    const handleNumberInput = (num: number) => {
      if (disabled) return;

      if (certificateNumber.length < 4) {
        const newNumber = certificateNumber + num;
        setCertificateNumber(newNumber);

        // 인증번호가 모두 입력되었을 때
        if (newNumber.length === 4 && onComplete) {
          setTimeout(() => {
            onComplete(newNumber);
          }, 300); // 애니메이션 효과를 위한 지연
        }
      }
    };

    // 백스페이스 처리
    const handleBackspace = () => {
      if (disabled) return;

      if (certificateNumber.length > 0) {
        setCertificateNumber(certificateNumber.slice(0, -1));
        setError("");
      }
    };

    // 초기화 처리
    const handleClear = () => {
      if (disabled) return;

      setCertificateNumber("");
      setError("");
    };

    // 키보드 이벤트 핸들러
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (disabled) return;

        // 숫자 키 감지 (0-9)
        if (e.key >= "0" && e.key <= "9") {
          handleNumberInput(parseInt(e.key));
        }
        // 백스페이스 키 감지
        else if (e.key === "Backspace") {
          handleBackspace();
        }
        // ESC 키는 취소로 처리
        else if (e.key === "Escape") {
          handleClear();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [certificateNumber, disabled]);

    return (
      <div className="flex flex-col h-full bg-white">
        {/* 타이틀 영역 */}
        <div className="flex-1 flex flex-col p-4 pt-10">
          <div className="ml-3">
            <h2 className="text-2xl font-bold mb-5">계좌인증을 해주세요</h2>
            <p className="text-gray-500 text-sm mb-18">
              계좌에 입금된 1원의 입금자명을 확인 후<br />
              AwOO 뒤 4자리 숫자를 입력해 주세요.
            </p>
          </div>

          {/* 인증번호 입력 필드 */}
          <div className="flex justify-center space-x-4 w-full mb-8">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-16 h-16 border ${
                  // 현재 입력할 차례인 박스만 teal 색상으로 강조
                  certificateNumber.length === index && !disabled
                    ? "border-teal-500 border-2"
                    : certificateNumber.length > index
                      ? "border-gray-300" // 이미 입력된 박스
                      : "border-gray-300" // 아직 입력되지 않은 박스
                } rounded-lg flex items-center justify-center text-xl font-bold transition-colors duration-300
              ${disabled ? "opacity-70" : ""}`}
              >
                {certificateNumber.length > index ? certificateNumber[index] : ""}
              </div>
            ))}
          </div>

          {/* 에러 메시지 */}
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          {/* 처리 중 상태 표시 */}
          {disabled && <p className="text-teal-500 text-sm text-center mb-4">처리 중입니다...</p>}
        </div>

        {/* 숫자 키패드 */}
        <NumberKeypad
          onNumberPress={handleNumberInput}
          onBackspace={handleBackspace}
          onClear={handleClear}
          disabled={disabled}
        />
      </div>
    );
  }
);

// 컴포넌트 이름 설정 (디버깅용)
Certificate.displayName = "Certificate";

export default Certificate;
