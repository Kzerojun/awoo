"use client";
import TopBar from "@/common/ui/TopBar";
import Button from "@/common/ui/Button";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function EditPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 비밀번호 유효성 검사 관련 상태
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isMatch, setIsMatch] = useState(true);

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  // 새 비밀번호 입력 시 유효성 검사
  const handleNewPasswordChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setNewPassword(value);

    if (value.length === 0) {
      setIsValidPassword(true);
      setPasswordMessage("");
    } else if (value === currentPassword && value.length > 0) {
      setIsValidPassword(false);
      setPasswordMessage("현재 비밀번호와 다른 비밀번호를 입력해주세요.");
    } else if (!validatePassword(value)) {
      setIsValidPassword(false);
      setPasswordMessage("최소 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.");
    } else {
      setIsValidPassword(true);
      setPasswordMessage("사용 가능한 비밀번호입니다.");
    }

    // 비밀번호 확인과 일치 여부 검사
    setIsMatch(value === confirmPassword || confirmPassword === "");
  };

  // 비밀번호 확인 입력 변경 시 일치 여부 확인
  const handleConfirmPasswordChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setIsMatch(newPassword === value || value === "");
  };

  // 포커스 링 색상 결정
  const getFocusRingClass = (isValid: boolean) => {
    return isValid ? "focus:ring-teal-500" : "focus:ring-red-500";
  };

  return (
    <div className="flex flex-col w-full h-full max-w-md mx-auto bg-[#FCFCFC]">
      <TopBar title="비밀번호 변경" />

      <div className="w-full px-6 py-6">
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-4 text-center">
            비밀번호 변경 시, 안전한 비밀번호를 입력해주세요 !
          </p>

          {/* 현재 비밀번호 입력 */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">현재 비밀번호</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <LockClosedIcon className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="현재 비밀번호를 입력하세요"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeIcon className="w-5 h-5 text-teal-500" />
                ) : (
                  <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* 새 비밀번호 입력 */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">새 비밀번호</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <LockClosedIcon className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={handleNewPasswordChange}
                className={`w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${getFocusRingClass(isValidPassword)}`}
                placeholder="새 비밀번호를 입력하세요"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeIcon className="w-5 h-5 text-teal-500" />
                ) : (
                  <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
            {passwordMessage && (
              <p className={`text-xs mt-1 ${isValidPassword ? "text-teal-500" : "text-red-500"}`}>
                {passwordMessage}
              </p>
            )}
            {!passwordMessage && (
              <p className="text-xs text-gray-500 mt-1">
                8자 이상, 영문, 숫자, 특수문자를 포함해주세요
              </p>
            )}
          </div>

          {/* 새 비밀번호 확인 */}
          <div className="mb-7">
            <label className="block text-sm font-medium mb-2">새 비밀번호 확인</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <LockClosedIcon className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${getFocusRingClass(isMatch)}`}
                placeholder="새 비밀번호를 다시 입력하세요"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeIcon className="w-5 h-5 text-teal-500" />
                ) : (
                  <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
            {confirmPassword.length > 0 && (
              <p className={`text-xs mt-1 ${isMatch ? "text-teal-500" : "text-red-500"}`}>
                {isMatch ? "비밀번호가 일치합니다" : "비밀번호가 일치하지 않습니다"}
              </p>
            )}
          </div>
        </div>

        {/* 변경하기 버튼 */}
        <Button
          text="변경하기"
          backgroundColor="aqua"
          fontColor="custom-white"
          disabled={
            !currentPassword || !newPassword || !confirmPassword || !isValidPassword || !isMatch
          }
          className="w-full"
        />
      </div>
    </div>
  );
}
