"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import CommonTopBar from "@/common/ui/CommonTopBar";
import Image from "next/image";
import Button from "@/common/ui/Button";
import my from "../../../../../public/icons/bottombar/active/my_aqua.svg";
import editIcon from "./../../../../../public/icons/profile/edit.svg";
import { RootState } from "@/lib/store";
import { getUserInfo } from "@/api/user/auth";
import { useNicknameCheck } from "@/hooks/user/useNicknameCheck";
import { updateUserProfile } from "@/lib/slices/profileSlice";
import { setUserData } from "@/lib/slices/userSlice";

export default function Edit() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux 스토어에서 사용자 정보 가져오기
  const userState = useSelector((state: RootState) => state.user);
  const profileState = useSelector((state: RootState) => state.profile.profileUpdate);

  // 로컬 상태 관리
  const [nickname, setNickname] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nicknameMessage, setNicknameMessage] = useState<string>("");
  const [isValidNickname, setIsValidNickname] = useState<boolean>(true);
  const [isNicknameChanged, setIsNicknameChanged] = useState<boolean>(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);

  // 닉네임 중복 확인 API 호출
  const nicknameCheckMutation = useNicknameCheck();

  // 파일 입력 참조
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트 마운트 시 사용자 정보 가져오기
  useEffect(() => {
    // Redux 스토어에 닉네임이 이미 있으면 API 호출 건너뛰기
    if (userState.nickname) {
      setNickname(userState.nickname);
      setName(userState.name || "");
      setPhone(userState.phone || "");
      setImagePreview(userState.profileImage || null);
      setIsLoading(false);
    } else {
      // Redux 스토어에 닉네임이 없으면 API 호출
      const fetchUserInfo = async () => {
        try {
          setIsLoading(true);
          const userInfo = await getUserInfo();
          setNickname(userInfo.nickname);
          setName(userInfo.name);
          setPhone(userInfo.phone);
          setImagePreview(userInfo.profileImage || null);
        } catch (error) {
          console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserInfo();
    }
  }, [userState]);

  // 프로필 수정 성공 시 처리
  useEffect(() => {
    if (profileState.success) {
      // 수정된 정보를 Redux 스토어에 업데이트
      dispatch(
        setUserData({
          nickname: nickname,
          name: name,
          phone: phone,
          profileImage: imagePreview,
        })
      );

      // 프로필 페이지로 이동
      router.push("/my/profile");
    }
  }, [profileState.success, dispatch, nickname, name, phone, imagePreview, router]);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      // 토큰이 없으면 로그인 페이지로 리다이렉트
      if (!token) {
        console.log("인증 토큰이 없습니다. 로그인 페이지로 이동합니다.");
        router.push("/login");
        return;
      }

      // 토큰 만료 여부를 간단히 확인 (선택 사항)
      try {
        // JWT 토큰 디코딩 (실제 구현은 jwt-decode 등의 라이브러리 사용)
        const tokenData = JSON.parse(atob(token.split(".")[1]));
        const expirationTime = tokenData.exp * 1000; // JWT의 exp는 초 단위

        if (Date.now() >= expirationTime) {
          console.log("토큰이 만료되었습니다. 로그인 페이지로 이동합니다.");
          localStorage.removeItem("accessToken");
          router.push("/login");
          return;
        }
      } catch (error) {
        console.error("토큰 확인 중 오류 발생:", error);
      }
    }
  }, [router]);

  // 닉네임 변경 핸들러
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);

    // 닉네임이 변경되면 중복 확인 상태 초기화
    const isChanged = newNickname !== userState.nickname;
    setIsNicknameChanged(isChanged);
    if (isChanged) {
      setIsNicknameChecked(false);
    }

    // 기본 유효성 검사
    if (newNickname.trim() === "") {
      setNicknameMessage("닉네임을 입력해주세요.");
      setIsValidNickname(false);
    } else if (newNickname.length < 2) {
      setNicknameMessage("닉네임은 2자 이상이어야 합니다.");
      setIsValidNickname(false);
    } else if (newNickname.length > 10) {
      setNicknameMessage("닉네임은 10자 이하여야 합니다.");
      setIsValidNickname(false);
    } else {
      setNicknameMessage("");
      setIsValidNickname(true);
    }
  };

  // 닉네임 중복 확인
  const checkNicknameDuplicate = async () => {
    if (!isValidNickname || nickname.trim() === "") return;

    try {
      // 닉네임 중복 확인 API 호출
      const response = await nicknameCheckMutation.mutateAsync({ nickname });

      // API 응답 구조에 맞게 처리
      if (response.success) {
        // 성공 응답인 경우 (사용 가능한 닉네임)
        setNicknameMessage("사용 가능한 닉네임입니다.");
        setIsValidNickname(true);
        setIsNicknameChecked(true);
      } else {
        // response.success가 false인 경우 (이미 사용 중인 닉네임)
        setNicknameMessage(response.error?.message || "이미 사용 중인 닉네임입니다.");
        setIsValidNickname(false);
        setIsNicknameChecked(false);
      }
    } catch (error: any) {
      // 네트워크 에러 등 API 호출 자체가 실패한 경우
      console.error("닉네임 중복 확인 에러:", error);
      setNicknameMessage("닉네임 중복 확인 중 오류가 발생했습니다.");
      setIsValidNickname(false);
      setIsNicknameChecked(false);
    }
  };

  // 이미지 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setImageFile(selectedFile);

      // 이미지 미리보기 설정
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // 저장 버튼 핸들러
  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      router.push("/login");
      return;
    }

    // 닉네임이 변경된 경우 중복 확인 필요
    if (isNicknameChanged && !isNicknameChecked) {
      await checkNicknameDuplicate();
      // 중복 검사 후 유효하지 않으면 저장 취소
      if (!isValidNickname) return;
    }

    // profileSlice의 updateUserProfile 액션에 맞는 데이터 구조
    const updateData = {
      nickname: isNicknameChanged ? nickname : undefined,
      name: undefined, // 이 예제에서는 사용하지 않음
      phone: undefined, // 이 예제에서는 사용하지 않음
      imageFile: imageFile,
    };

    // 타입 캐스팅으로 타입 오류 우회
    dispatch(updateUserProfile(updateData) as any);
  };

  return (
    <div className="flex flex-col items-center w-full h-full max-w-md mx-auto px-8 py-6 bg-[#FCFCFC] pt-14">
      <CommonTopBar title="프로필 수정" />

      <div className="w-full mt-8">
        {/* 프로필 이미지 수정 영역 */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden bg-gray-100">
              {isLoading ? (
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
              ) : imagePreview ? (
                <img
                  src={imagePreview}
                  alt="프로필 이미지"
                  className="w-full h-full object-cover"
                  onError={() => setImagePreview(null)}
                />
              ) : (
                <Image
                  src={my}
                  alt="프로필 이미지"
                  width={90}
                  height={90}
                  className="object-cover"
                />
              )}
            </div>
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 p-1 rounded-full bg-white shadow-md cursor-pointer"
            >
              <Image src={editIcon} alt="편집" width={20} height={20} />
            </label>
            <input
              type="file"
              id="profile-image"
              className="hidden"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">프로필 사진 변경</p>
        </div>

        {/* 닉네임 수정 영역 - 수정된 UI */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <label className="block text-gray-700 mb-2 font-medium">닉네임</label>
            {isNicknameChanged && (
              <button
                onClick={checkNicknameDuplicate}
                className={`px-2 py-1 rounded-md text-[12px] transition-all ${
                  isValidNickname && !isNicknameChecked
                    ? "bg-teal-500 text-white hover:bg-teal-600"
                    : isNicknameChecked && isValidNickname
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
                disabled={!isValidNickname || nicknameCheckMutation.isPending}
              >
                {nicknameCheckMutation.isPending
                  ? "확인 중..."
                  : isNicknameChecked && isValidNickname
                    ? "확인 완료"
                    : "중복 확인"}
              </button>
            )}
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              value={isLoading ? "" : nickname}
              onChange={handleNicknameChange}
              className={`w-full px-3 py-3 border ${
                isValidNickname ? "border-gray-300" : "border-red-500"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
              placeholder={isLoading ? "로딩 중..." : "닉네임을 입력하세요"}
              disabled={isLoading}
            />

            <div className="flex justify-between items-center mt-2">
              <p className={`text-xs ${isValidNickname ? "text-green-500" : "text-red-500"}`}>
                {nicknameMessage || "다른 사용자에게 보여질 이름입니다."}
              </p>
            </div>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="flex justify-center mt-4">
          <Button
            text={profileState.loading ? "저장 중..." : "저장하기"}
            backgroundColor="aqua"
            fontColor="custom-white"
            type="button"
            onClick={handleSubmit}
            disabled={
              profileState.loading ||
              isLoading ||
              (!isNicknameChanged && !imageFile) ||
              (isNicknameChanged && !isNicknameChecked)
            }
          />
        </div>
      </div>
    </div>
  );
}
