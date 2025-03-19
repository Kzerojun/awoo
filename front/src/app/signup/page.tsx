"use client";
import TopBar from "@/common/ui/TopBar";
import Image from "next/image";
import logo from "../../../public/logos/AwOO_logo.svg";
import SignupForm from "./components/SignupForm";

const SignupPage = () => {
  return (
    <>
      <TopBar title="회원가입" />
      <main className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-3rem)] gap-3">
        <Image src={logo} alt="logo" />
        <SignupForm />
      </main>
    </>
  );
};

export default SignupPage;
