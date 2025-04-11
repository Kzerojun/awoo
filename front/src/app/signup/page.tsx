"use client";
import TopBar from "@/common/ui/TopBar";
import Image from "next/image";
import logo from "../../../public/logos/AwOO_logo.svg";
import SignupForm from "./components/SignupForm";
import CommonTopBar from "@/common/ui/CommonTopBar";

const SignupPage = () => {
  return (
    <>
      <CommonTopBar title="회원가입" leftAction="back" />
      <main className="flex flex-col items-center justify-center mt-14 py-10 min-h-[calc(100vh-3.5rem)] gap-3">
        <Image src={logo} alt="logo" />
        <SignupForm />
      </main>
    </>
  );
};

export default SignupPage;
