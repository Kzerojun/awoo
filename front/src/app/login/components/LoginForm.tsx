"use Client";

import React, { useState, FormEvent, useEffect } from "react";
import Button from "../../../common/ui/Button";
import paw from "../../../../public/icons/white_paw.svg";
import Link from "next/link";
import { useLogin } from "@/hooks/user/useLogin";
import { useUserInfo } from "@/hooks/user/useUserInfo";
import { useRouter } from "next/navigation";
// FCM 토큰 저장
import { useFCMToken } from "@/hooks/alarm/useFCM";

const LoginForm = () => {
  // FCM
  const { getAndSendToken } = useFCMToken();
  const { refetch: refetchUserInfo } = useUserInfo();
  const { mutate: loginMutate, isPending, isError, isSuccess } = useLogin(refetchUserInfo);
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (isSuccess) {
      getAndSendToken(); // FCM 토큰 발급 + 서버로 전송
      router.replace("/home");
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (isError) {
      alert("로그인에 실패했습니다. 이메일 또는 전화번호를 확인하세요.");
      router.replace("/login");
    }
  }, [isError]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutate({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
        {/* 이메일 입력 */}
        <input
          id="email"
          name="email"
          type="text"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-custom-white border border-custom-gray focus:ring-2 focus:border-0 focus:ring-light-aqua focus:outline-none rounded-md px-2 text-sm h-10 w-72 placeholder:p-2 placeholder:text-xs"
        />

        {/* 비밀번호 입력 */}
        <input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-custom-white border shadow-none border-custom-gray focus:border-0 focus:ring-2 focus:ring-light-aqua focus:outline-none rounded-md px-2 text-sm h-10 w-72 placeholder:p-2 placeholder:text-xs"
        />

        {!isPending ? (
          <Button
            text="로그인"
            img={paw}
            backgroundColor="aqua"
            fontColor="custom-white"
            className="hover:bg-light-aqua"
            type="submit"
          />
        ) : (
          <Button
            text="로그인 중.."
            img={paw}
            backgroundColor="aqua"
            fontColor="custom-white"
            className="hover:bg-light-aqua"
            disabled={isPending}
          />
        )}
      </form>

      {/* 아이디 찾기 & 비밀번호 재설정 */}
      <div className="flex gap-2 justify-center items-center">
        <Link
          href="/login/findId"
          className="text-xs px-4 cursor-pointer underline underline-offset-5"
        >
          아이디 찾기
        </Link>
        <p className="text-sm">|</p>
        <Link
          href="/login/reset-password"
          className="text-xs px-4 cursor-pointer underline underline-offset-5"
        >
          비밀번호 재설정
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
