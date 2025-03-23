import axios from "axios";
import urlToFile from "@/app/signup/hooks/useChangeFile";

// 회원가입 interface
interface SignupPayload {
  requestDto: Record<string, any>;
  imageFile: File | null;
  selectedAvatar: string;
}

export const signup = async ({ requestDto, imageFile, selectedAvatar }: SignupPayload) => {
  const formData = new FormData();

  formData.append(
    "requestDto",
    new Blob([JSON.stringify(requestDto)], {
      type: "application/json",
    })
  );

  if (imageFile) {
    formData.append("profileImage", imageFile);
  } else if (!imageFile && selectedAvatar !== "") {
    const file = await urlToFile(selectedAvatar, "default-avatar.jpg");
    formData.append("profileImage", file);
  }
  // 후에 백엔드 완성되면 주석 풀 예정
  //   try {
  //     const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/members`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     return res.data;
  //   } catch (err) {
  //     console.error("회원가입 실패: ", err);
  //   }
};
