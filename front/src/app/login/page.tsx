"use client";
import Image from "next/image";
import Button from "../../common/ui/Button";
import LoginForm from "./components/LoginForm";
import SocialLogin from "./components/SocialLogin";
import logo from "../../../public/logos/AwOO_logo.svg";
import Link from "next/link";

import React, { useEffect } from "react";

export default function Login() {
  const goBack = (): void => {
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-white gap-6">
      <Image src={logo} alt="로고 이미지" />
      <LoginForm />
      {/* <SocialLogin /> */}
      <div className="flex flex-col items-center gap-1 text-xs">
        <p>아직 회원이 아니라면?</p>
        <Link
          href="/signup"
          className="cursor-pointer underline underline-offset-5 text-aqua transition-colors duration-200"
        >
          회원가입 하기
        </Link>
      </div>
    </div>
  );
}
