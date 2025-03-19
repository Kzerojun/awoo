"use Client";

import { useState } from "react";
import Button from "../../../common/ui/Button";
import paw from "../../../../public/icons/white_paw.svg";
import Link from "next/link";

const LoginForm = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  // 사용자가 입력한 이메일과 비밀번호가 바뀔 때
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col items-center gap-6">
        {/* 이메일 입력 */}
        <input
          id="email"
          name="email"
          type="text"
          placeholder="이메일을 입력하세요"
          value={formData.email}
          onChange={handleChange}
          className="bg-custom-white border border-custom-gray focus:ring-2 focus:ring-light-aqua focus:outline-none rounded-md px-2 text-sm h-10 w-72 placeholder:p-2 placeholder:text-xs"
        />

        {/* 비밀번호 입력 */}
        <input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={handleChange}
          className="bg-custom-white border shadow-none border-custom-gray focus:ring-2 focus:ring-light-aqua focus:outline-none rounded-md px-2 text-sm h-10 w-72 placeholder:px-1 placeholder:text-xs"
        />

        <Button
          text="로그인"
          img={paw}
          backgroundColor="aqua"
          fontColor="custom-white"
          className="hover:bg-light-aqua"
        />
      </form>

      {/* 아이디 찾기 & 비밀번호 재설정 */}
      <div className="flex gap-2 justify-center items-center">
        <Link
          href="/login/findId"
          className="text-xs px-4 cursor-pointer hover:underline hover:underline-offset-4 hover:text-aqua transition-colors duration-200"
        >
          아이디 찾기
        </Link>
        <p className="text-sm">|</p>
        <Link
          href="/login/reset-password"
          className="text-xs px-4 cursor-pointer hover:underline hover:underline-offset-4 hover:text-aqua transition-colors duration-200"
        >
          비밀번호 재설정
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
