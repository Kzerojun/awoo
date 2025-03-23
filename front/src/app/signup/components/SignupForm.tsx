"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store";
import { setRegisterData } from "@/lib/slices/registerSlice";

import gender from "../../../../public/icons/signup/gender.svg";
import paw from "../../../../public/icons/white_paw.svg";
import SignupPolicy from "./SignupPolicy";
import Button from "@/common/ui/Button";

const SignupForm = () => {
  const router = useRouter();

  // 스토어에 정보 저장하기 위한 dispatch 정의
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>(""); // 이름
  const [nameErr, setNameErr] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>(""); // 생년월일
  const [genderValue, setGenderValue] = useState<string>(""); // 성별
  const [phonenum, setPhonenum] = useState<string>(""); // 전화번호
  const [email, setEmail] = useState<string>(""); // 이메일
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true); // 이메일 에러
  const [emailMessage, setEmailMessage] = useState<string>(""); // 이메일 메시지
  const [isDuplicate, setIsDuplicate] = useState<boolean>(true); // 이메일 중복 체크
  const [password1, setPassword1] = useState<string>(""); // 비밀번호
  const [password2, setPassword2] = useState<string>(""); // 비밀번호 확인용
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true); // 비밀번호 유효성 검사
  const [passwordMessage, setPasswordMessage] = useState<string>(""); // 비밀번호 메시지
  const [isMatch, setIsMatch] = useState<boolean>(true); // 비밀번호 일치
  const [showPassword, setShowPassword] = useState<boolean>(false); // 보여줄까 말까

  // 약관 동의 체크
  const [privacyAgreed, setPrivacyAgreed] = useState<boolean>(false);

  // 이름 5자리 제한
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^ㄱ-ㅎ가-힣\s]/g, ""); // 한글만 입력 가능
    if (value.length > 5) {
      value = value.slice(0, 5);
      setNameErr("이름은 최대 5자리까지 입력 가능합니다.");
    } else if (value.length <= 4) {
      setNameErr("");
    } // 최대 5자리 제한

    setName(value);
  };

  // 생년월일 입력 시 자동으로 YYYY-MM-DD 형식으로 변환
  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // 숫자만 입력 가능
    if (value.length > 8) value = value.slice(0, 8); // 최대 8자리 제한

    // YYYY-MM-DD 형식
    if (value.length >= 4) value = value.slice(0, 4) + "-" + value.slice(4);
    if (value.length >= 7) value = value.slice(0, 7) + "-" + value.slice(7);

    setBirthdate(value);
  };

  // 전화번호 입력 시 자동으로 000-0000-0000 형식으로 변환
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); //숫자만 입력 가능
    if (value.length > 11) value = value.slice(0, 11); // 최대 11자리

    if (value.length >= 3) value = value.slice(0, 3) + "-" + value.slice(3);
    if (value.length >= 8) value = value.slice(0, 8) + "-" + value.slice(8);

    setPhonenum(value);
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // 이메일 변경 시
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setEmail(value);
    const isValid = validateEmail(value);
    setIsValidEmail(isValid); // 입력할 때마다 검사
    if (!isValid) {
      setEmailMessage(""); // 유요하지 않은 이메일일 경우 중복 검사 메시지 초기화
    }
  };

  // 이메일 중복 체크 - 백엔드 연결 필요
  const handleEmailCheck = () => {
    if (!isValidEmail || email.length === 0) {
      setEmailMessage("올바른 이메일을 입력하세요.");
      return;
    }

    // 백엔드 api 호출 + 결과값을 isDuplicate에 담기
    if (isDuplicate) {
      setEmailMessage("이미 사용 중인 이메일입니다.");
      setIsDuplicate(true);
    } else {
      setEmailMessage("사용 가능한 이메일입니다.");
      setIsDuplicate(false);
    }
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password: string) => {
    const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegx.test(password);
  };

  // 비밀번호 입력 시 유효성 검사
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setPassword1(value);

    if (!validatePassword(value)) {
      setIsValidPassword(false);
      setPasswordMessage("최소 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.");
    } else {
      setIsValidPassword(true);
      setPasswordMessage("사용 가능한 비밀번호입니다.");
    }

    if (value.length === 0) {
      setPassword1("");
      setPasswordMessage("");
    }

    setIsMatch(value === password2);
  };

  // 비밀번호 확인 입력 변경 시 일치 여부 확인
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setPassword2(value);
    setIsMatch(password1 === value);
  };

  const goToProfileRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !name ||
      !birthdate ||
      !genderValue ||
      !email ||
      !password1 ||
      !password2 ||
      !isValidEmail ||
      isDuplicate ||
      !isValidPassword ||
      !isMatch ||
      !privacyAgreed
    ) {
      console.log("privacyAgreed", privacyAgreed);
      console.log("birthdate", birthdate);
      console.log("phonenum", phonenum);
      alert("모든 입력값을 정확히 입력해주세요");
      return;
    }

    // 스토어에 데이터 저장하기
    dispatch(
      setRegisterData({
        name,
        birthDate: birthdate,
        gender: genderValue as "M" | "F",
        phone: phonenum,
        email,
        password: password1,
        privacyAgreed,
      })
    );

    setTimeout(() => {
      router.push("/signup/profile");
    }, 100);
  };

  return (
    <>
      <form
        className="flex flex-col justify-center items-center gap-4"
        onSubmit={goToProfileRegister}
      >
        {/* 이름 입력 */}
        <div className="flex flex-col justify-center items-start">
          <div className="flex items-center justify-start w-72 gap-4 pb-2 border-b-1 border-b-custom-gray focus-within:border-b-aqua">
            <label htmlFor="name">
              <UserCircleIcon className="w-6 h-6 text-custom-gray" />
            </label>
            <input
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={handleNameChange}
              className="text-sm placeholder:text-sm placeholder:text-opacity-50 focus:outline-none"
              required
            />
          </div>
          {nameErr && <div className="text-xs text-error pt-2">{nameErr}</div>}
        </div>

        {/* 생년월일 & 성별 */}
        <div className="flex items-center justify-center w-72 gap-x-2">
          {/* 생년월일 */}
          <div className="flex items-center justify-start gap-4 w-2/3 pb-2 border-b-1 border-b-custom-gray focus-within:border-b-aqua">
            <label htmlFor="birthdate">
              <CalendarIcon className="w-6 h-6 text-custom-gray" />
            </label>
            <input
              id="birthdate"
              type="text"
              placeholder="생년월일 8자리"
              value={birthdate}
              onChange={handleBirthdateChange}
              className="text-sm placeholder:text-sm placeholder:text-opacity-50 w-2/3 focus:outline-none"
              required
            />
          </div>
          {/* 성별 */}
          <div className="flex items-center justify-start gap-4 w-1/3 pb-2 border-b-1 border-b-custom-gray focus-within:border-b-aqua">
            <label htmlFor="gender">
              <Image src={gender} alt="성별 아이콘" className="w-6 h-6 inline" />
            </label>
            <select
              name="gender"
              id="gender"
              value={genderValue}
              onChange={(e) => setGenderValue(e.target.value)}
              className="text-sm"
              required
            >
              <option value="" disabled className="text-custom-gray">
                성별
              </option>
              <option value="M">남</option>
              <option value="F">여</option>
            </select>
          </div>
        </div>

        {/* 휴대폰 번호 입력 */}
        <div className="flex items-center justify-start w-72 gap-4 pb-2 border-b-1 border-b-custom-gray focus-within:border-b-aqua">
          <label htmlFor="phonenum">
            <DevicePhoneMobileIcon className="w-6 h-6 text-custom-gray" />
          </label>
          <input
            id="phonenum"
            type="text"
            placeholder="휴대폰 번호를 입력하세요"
            value={phonenum}
            className="placeholder:text-sm placeholder:text-opacity-50 text-sm focus:outline-none"
            onChange={handlePhoneChange}
            required
          />
        </div>

        {/* 이메일 */}
        <div className="flex flex-col ">
          <div
            className={`flex items-center justify-start w-72 gap-4 pb-2 border-b-1 border-b-custom-gray  ${!isValidEmail ? "border-b-error" : ""} focus-within:border-b-aqua`}
          >
            <label htmlFor="email">
              <EnvelopeIcon className="w-6 h-6 text-custom-gray" />
            </label>
            <input
              id="email"
              type="text"
              placeholder="이메일을 입력하세요"
              value={email}
              className="placeholder:text-sm placeholder:text-opacity-50 text-sm w-44 focus:outline-none"
              onChange={handleEmailChange}
              required
            />

            <button
              type="button"
              onClick={handleEmailCheck}
              className="text-aqua border border-aqua text-xs p-1 rounded-md hover:bg-aqua hover:text-white transition"
            >
              중복체크
            </button>
          </div>
          {/* 이메일 메시지 */}
          {emailMessage && <p className="text-error text-xs pt-2">{emailMessage}</p>}
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col">
          <div
            className={`flex items-center justify-start w-72 gap-4 pb-2 border-b-1 border-b-custom-gray focus-within:border-b-aqua ${!isValidPassword && password1.length > 0 ? "border-b-error" : ""}`}
          >
            <label htmlFor="password1">
              <LockClosedIcon className="w-6 h-6 text-custom-gray" />
            </label>
            <input
              id="password1"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              value={password1}
              className="placeholder:text-sm placeholder:text-opacity-50 text-sm focus:outline-none"
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="w-6 h-6"
            >
              {showPassword ? (
                <EyeIcon className="w-6 h-6 text-aqua inline" />
              ) : (
                <EyeSlashIcon className="w-6 h-6 text-custom-gray inline" />
              )}
            </button>
          </div>
          {passwordMessage && (
            <p className={`text-xs pt-2 ${isValidPassword ? "text-aqua" : "text-error"}`}>
              {passwordMessage}
            </p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col">
          <div
            className={`flex items-center justify-start w-72 gap-4 pb-2 border-b-1 border-b-custom-gray focus-within:border-b-aqua ${!isMatch && password2.length > 0 ? "border-b-error" : ""}`}
          >
            <label htmlFor="password2">
              <LockClosedIcon className="w-6 h-6 text-custom-gray" />
            </label>
            <input
              id="password2"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 다시 입력하세요"
              value={password2}
              className="placeholder:text-sm placeholder:text-opacity-50 text-sm focus:outline-none"
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          {/* 비밀번호 일치 여부 */}
          {!isMatch && password2.length > 0 && (
            <p className="text-xs pt-2 text-error">비밀번호가 일치하지 않습니다.</p>
          )}
        </div>
        {/* 약관 컴포넌트 부분 */}
        <SignupPolicy privacyAgreed={privacyAgreed} setPrivacyAgreed={setPrivacyAgreed} />

        {/* 회원가입 버튼 부분 */}
        <Button text="회원가입" img={paw} type="submit" />
      </form>
    </>
  );
};

export default SignupForm;
