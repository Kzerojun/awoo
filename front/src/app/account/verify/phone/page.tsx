"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CommonTopBar from "@/common/ui/CommonTopBar";
import Button from "@/common/ui/Button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setPhoneVerified } from "@/lib/slices/accountSlice";
import { requestAuthCode, verifyAuthCode } from "@/api/account/auth/phoneAuth";
import { getUserInfo } from "@/api/user/auth";
import { useSearchParams } from "next/navigation";

export default function PhoneVerifyPage() {
  const router = useRouter();
  const { name } = useAppSelector((state) => state.user);
  const [realName, setRealName] = useState<string | null>(name);
  const [phone, setPhone] = useState("");
  const [isRequested, setIsRequested] = useState(false);
  const [timer, setTimer] = useState(180); // 3분
  const [authCode, setAuthCode] = useState("");
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // "saving" or null

  // ✅ 이름 fallback 가져오기
  useEffect(() => {
    const fetchName = async () => {
      if (!name) {
        const data = await getUserInfo();
        setRealName(data.name);
      }
    };
    fetchName();
  }, [name]);

  // 전화번호 하이픈 포맷
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 8);
    const formatted = raw.replace(/(\d{4})(\d{0,4})/, (_, a, b) => (b ? `${a}-${b}` : a));
    setPhone(formatted);
  };

  // 인증 요청
  const handleRequest = async () => {
    if (phone.length < 9) return alert("번호를 정확히 입력해주세요.");
    if (!realName) return alert("이름 정보가 없습니다. 다시 로그인 해주세요.");

    try {
      await requestAuthCode(realName, `010${phone.replace(/-/g, "")}`);
      alert("인증번호가 전송되었습니다.");
      setIsRequested(true);
      setTimer(180);
    } catch (error) {
      alert("인증번호 요청 실패");
      console.error(error);
    }
  };

  // 인증번호 검증
  const handleVerify = async () => {
    if (!authCode) return alert("인증번호를 입력해주세요.");
    try {
      const { data } = await verifyAuthCode(`010${phone.replace(/-/g, "")}`, authCode);
      if (data.success) {
        localStorage.setItem("authToken", data.response.authToken);
        dispatch(setPhoneVerified(true));
        alert("인증되었습니다.");
        const redirectPath =
          type === "saving" ? "/account/verify/success/saving" : "/account/verify/success/deposit";
        router.push(redirectPath);
      } else {
        alert("인증 실패");
      }
    } catch (error) {
      alert("인증번호 검증 실패");
      console.error(error);
    }
  };

  // 타이머
  useEffect(() => {
    if (!isRequested || timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [isRequested, timer]);

  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(1, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div>
      <CommonTopBar title="본인인증" leftAction="back" rightAction="cancel" />
      <div className="pt-16 px-6 flex flex-col gap-6">
        <h2 className="text-xl font-semibold">휴대폰 본인인증을 해주세요</h2>
        <div className="border rounded-lg p-4 text-sm bg-white border-gray-300">
          <div className="font-semibold mb-2">[필수] 전체 동의</div>
          <ul className="space-y-1 text-gray-600">
            <li>• 고유식별정보 처리 동의</li>
            <li>• 개인정보 수집·이용 동의</li>
            <li>• 서비스 이용약관 동의</li>
            <li>• 통신사 이용약관 동의</li>
          </ul>
        </div>

        <div className="relative flex flex-col gap-3">
          <div className="border border-gray-300 rounded-xl flex items-center px-4 py-3 bg-white gap-4">
            <select className="text-m focus:outline-none">
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="016">016</option>
            </select>
            <input
              type="text"
              placeholder="1234 - 5678"
              value={phone}
              onChange={handlePhoneChange}
              className="text-m bg-transparent focus:outline-none flex-1"
            />
          </div>

          {isRequested && (
            <div className="border border-gray-300 rounded-xl flex items-center px-4 py-3 bg-white gap-4">
              <input
                type="text"
                placeholder="인증번호 입력"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                className="text-sm bg-transparent focus:outline-none flex-1"
              />
              {timer > 0 && (
                <span className="text-xs text-gray-500 whitespace-nowrap w-[48px] text-right">
                  {formatTime(timer)}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-16 flex justify-center">
          <Button
            text={isRequested ? "인증하기" : "요청"}
            width="long"
            onClick={isRequested ? handleVerify : handleRequest}
            disabled={phone.length < 9}
          />
        </div>
      </div>
    </div>
  );
}
