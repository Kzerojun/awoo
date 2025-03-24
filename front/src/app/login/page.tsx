"use client";
import Image from "next/image";
import Button from "../../common/ui/Button";
import LoginForm from "./components/LoginForm";
import SocialLogin from "./components/SocialLogin";
import logo from "../../../public/logos/AwOO_logo.svg";
import Link from "next/link";

import React, { useEffect } from "react";

import { toast } from "react-toastify";

export default function Login() {
  const goBack = (): void => {
    window.history.back();
  };

  useEffect(() => {
    toast.info("세션이 만료되었습니다. \n 토스트 미리보기 테스트입니다 🚀", {
      className: "bg-white text-black font-medium rounded-lg shadow-md",
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-6">
      <Image src={logo} alt="로고 이미지" />
      <LoginForm />
      <SocialLogin />
      <div className="flex flex-col items-center gap-1 text-xs">
        <p>아직 회원이 아니라면?</p>
        <Link
          href="/signup"
          className="cursor-pointer hover:underline hover:underline-offset-4 hover:text-aqua transition-colors duration-200"
        >
          회원가입 하기
        </Link>
      </div>
      <Button
        text="뒤로 가기"
        backgroundColor="custom-gray"
        fontColor="custom-balck"
        onClick={goBack}
      />
    </div>
  );
}
