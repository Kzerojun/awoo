"use client";

import { useRouter } from "next/navigation";

interface MoungpayJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MoungpayJoinModal({ isOpen, onClose }: MoungpayJoinModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30 px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-lg font-semibold text-center text-gray-800">
          아직 멍페이에 가입 전이시군요!
        </h2>
        <p className="text-sm text-gray-500 mt-2 text-center leading-relaxed">
          중고거래를 시작하려면
          <br />
          <strong>멍페이 가입</strong>이 먼저 필요해요 🐾 <br />
        </p>
        <p className="text-xs text-gray-500 mt-2 text-center leading-relaxed">
          간단하게 가입하고 안전한 거래를 시작해보세요
        </p>
        <div className="mt-5 flex flex-col space-y-3">
          <button
            className="bg-aqua text-white py-2 rounded-md text-sm font-medium"
            onClick={() => {
              onClose();
              router.push("/my/paymentRegister");
            }}
          >
            멍페이 가입하러 가기
          </button>

          <button className="text-gray-500 text-sm underline" onClick={onClose}>
            다음에 할게요
          </button>
        </div>
      </div>
    </div>
  );
}
