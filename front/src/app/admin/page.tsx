"use client";
import Image from "next/image";
import awooAdmin from "../../../public/logos/AwOO_admin.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/api/admin/admin";
import Link from "next/link";

export default function Admin() {
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!adminId.trim() || !adminPassword.trim()) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // API 호출
      const response = await adminLogin({
        adminId,
        adminPassword,
      });

      // 로그인 성공 처리
      if (response.success) {
        // 관리자 역할(S 또는 M)에 따라 다른 처리를 할 수 있음
        localStorage.setItem("adminRole", response.response);

        // 관리자 페이지로 이동
        router.push("/admin/userReport");
      } else {
        // 서버에서 success가 false로 왔을 경우
        setError(response.error || "로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error("로그인 오류:", err);
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[650px] flex flex-col items-center justify-center bg-white p-4">
      {/* 로고 영역 */}
      <div className="mb-8">
        <Image src={awooAdmin} alt="AwOO 어드민 로고" width={280} height={120} />
      </div>

      {/* 로그인 폼 */}
      <form onSubmit={handleLogin} className="w-full max-w-sm">
        {/* 아이디 입력 */}
        <div className="mb-6">
          <label htmlFor="adminId" className="block text-gray-700 text-lg font-medium mb-2">
            아이디
          </label>
          <input
            id="adminId"
            type="text"
            placeholder="아이디를 입력하세요"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-8">
          <label htmlFor="adminPassword" className="block text-gray-700 text-lg font-medium mb-2">
            비밀번호
          </label>
          <input
            id="adminPassword"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </div>

        {/* 에러 메시지 */}
        {error && <div className="mb-4 text-red-500 text-sm font-medium">{error}</div>}

        {/* 로그인 버튼 - Link 제거하고 실제 submit으로 변경 */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition duration-200 disabled:opacity-70"
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
