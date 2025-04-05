import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  chatRoomId: number;
  usedProductId: number;
}

export default function PaymentSelectModal({ isOpen, onClose, chatRoomId, usedProductId }: Props) {
  const router = useRouter();
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end">
          {/* 백그라운드 클릭 시 닫기 */}
          <div className="absolute inset-0 bg-transparent" onClick={onClose}></div>

          {/* Bottom Sheet + Animation */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative w-full bg-white rounded-t-2xl p-6 space-y-4 shadow-md"
          >
            <div className="text-center font-semibold text-sm">송금 방식</div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="text-orange-500 text-xl">💰</div>
                <div>
                  <div className="text-sm" onClick={() => router.push(`/my/paymentSend/`)}>
                    송금하기
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="text-green-500 text-xl">💸</div>
                <div>
                  <div className="text-sm">송금요청</div>
                  <div className="text-[11px] text-gray-400">
                    멍페이나 계좌로 송금요청할 수 있어요
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="text-blue-500 text-xl">🛡️</div>
                <div>
                  <div
                    className="text-sm"
                    onClick={() =>
                      router.push(
                        `/market/safePayment?chatRoomId=${chatRoomId}&usedProductId=${usedProductId}`
                      )
                    }
                  >
                    안심결제
                  </div>
                  <div className="text-[11px] text-gray-400">
                    물품을 받기 전까지 거래 금액을 안전하게 보관해요
                  </div>
                </div>
              </div>
            </div>

            {/* 닫기 */}
            <button className="mt-4 w-full text-sm text-gray-400" onClick={onClose}>
              닫기
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
