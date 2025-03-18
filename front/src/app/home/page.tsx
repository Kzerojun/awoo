"use client";

import Button from "../../common/ui/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToLogin = (): void => {
    router.push("/login");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-center">AwOO 프로젝트</h1>
      <p className="text-lg mt-2 text-red-500">프로젝트 설명을 여기에 추가하세요 아좌좌 홧팅.</p>
      <Button text="왜 안돼" backgroundColor="light-aqua" fontColor="green" />

      <Button text="로그인 하러가기" backgroundColor="aqua" fontColor="white" onClick={goToLogin} />
    </main>
  );
}
