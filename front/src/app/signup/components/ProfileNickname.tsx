"use client";
import React, { useState, ChangeEvent } from "react";
import Button from "@/common/ui/Button";
import paw from "../../../../public/icons/white_paw.svg";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setRegisterData, clearRegisterData } from "@/lib/slices/registerSlice";
import urlToFile from "../hooks/useChangeFile";
// 회원가입 및 닉네임 중복 체크 쿼리
import { useSignup } from "@/hooks/user/useSignup";
// 로그인 쿼리
import { useLogin } from "@/hooks/user/useLogin";
// 유저 정보 쿼리
import { useUserInfo } from "@/hooks/user/useUserInfo";
import { useNicknameCheck } from "@/hooks/user/useNicknameCheck";
import { useRouter } from "next/navigation";

interface ProfileNicknameProps {
  nickname: string;
  setNickname: (v: string) => void;
  imageFile: File | null;
  selectedAvatar: string;
}

const ProfileNickname = ({
  nickname,
  setNickname,
  imageFile,
  selectedAvatar,
}: ProfileNicknameProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const registerData = useAppSelector((state) => state.register);
  const userEmail = useAppSelector((state) => state.register.email);
  const userPassword = useAppSelector((state) => state.register.password);

  const {
    mutate: signupMutate,
    isPending: isSignupPending,
    isSuccess: isSignupSuccess,
  } = useSignup();
  const {
    mutate: checkNickname,
    isPending: isNicknamePending,
    isSuccess: isNicknameSuccess,
  } = useNicknameCheck();
  const { refetch: refetchUserInfo } = useUserInfo();
  const {
    mutate: loginMutate,
    isPending: isLoginPending,
    isSuccess: isLoginSuccess,
    isError: isLoginError,
  } = useLogin(refetchUserInfo);

  const maxLength: number = 6;

  const [isDuplicateName, setIsDuplicateName] = useState<boolean>(true);
  const [duplicateError, setDuplicateError] = useState<string>("");

  // 닉네임 변경 핸들러
  const handleNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, maxLength);
    setNickname(value);
    setIsDuplicateName(false);
    setDuplicateError("");
    dispatch(
      setRegisterData({
        nickname: value,
      })
    );
  };

  // 닉네임 중복 체크
  const checkDuplicate = () => {
    checkNickname(
      { nickname },
      {
        onSuccess: (res) => {
          if (res.success === true) {
            setDuplicateError(res.response.message);
            console.log(res.response.message);
            setIsDuplicateName(false);
            setDuplicateError(res.response.message);
          } else {
            setDuplicateError(res.error.message);
            console.error(res.error.message);
            setIsDuplicateName(true);
            setDuplicateError(res.error.message);
          }
        },
        onError: () => {
          setDuplicateError("닉네임 확인 중 오류가 발생했습니다.");
          setIsDuplicateName(true);
        },
      }
    );
  };

  // 회원가입 완료 (백엔드 연결)
  const handleSubmit = async () => {
    const requestDto = {
      ...registerData,
      nickname,
    };

    signupMutate(
      {
        requestDto,
        imageFile,
        selectedAvatar,
      },
      {
        onSuccess: (res) => {
          console.log("회원가입 성공!", res);

          loginMutate(
            { email: userEmail, password: userPassword },
            {
              onSuccess: () => {
                router.replace("/home");
              },
              onError: () => {
                alert("로그인에 실패했습니다.");
                router.replace("/login");
                dispatch(clearRegisterData());
              },
            }
          );
        },
        onError: (err) => {
          console.error("회원가입 실패", err);
          router.replace("/signup");
        },
      }
    );
  };
  return (
    <div className="h-full relative flex flex-col justify-center items-center gap-y-5">
      <h1 className="absolute top-6 left-0 w-full text-center text-xl z-10">프로필 등록 (2/2)</h1>
      <div className="flex flex-col justify-center items-center mt-5 gap-y-5">
        <div className="text-lg">닉네임을 입력하세요.</div>
        {/* 닉네임 부분 */}
        <div className="flex flex-col justify-center items-center mb-20 gap-y-10">
          {/* 닉네임 입력 */}
          <div className="flex flex-col justify-centers gap-y-2">
            <div className="relative w-56">
              {/* 입력창 */}
              <input
                type="text"
                value={nickname}
                onChange={handleNickname}
                placeholder="닉네임을 입력하세요"
                maxLength={maxLength}
                className="w-full text-center border-b-2 border-b-aqua placeholder:text-center placeholder:text-sm focus:outline-none text-base"
              />
              {/* 글자수 표시 */}
              <span className="absolute right-0 top-1 text-xs text-gray-400">
                {nickname.length}/{maxLength}
              </span>
            </div>
            {
              <div className={`text-sm ${isDuplicateName ? "text-error" : "text-aqua"}`}>
                {duplicateError}
              </div>
            }
          </div>
          {/* 중복 확인 */}
          <div className="w-56 flex items-center justify-end">
            <button
              className="border border-aqua text-aqua text-sm px-4 py-1 rounded-full"
              onClick={checkDuplicate}
            >
              중복 확인
            </button>
          </div>
        </div>
        {/* 회원가입 버튼 부분 */}
        <div className="">
          <Button
            text="&nbsp;&nbsp;&nbsp;&nbsp;완료"
            img={paw}
            width="medium"
            onClick={handleSubmit}
            disabled={isSignupPending || isDuplicateName}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileNickname;
