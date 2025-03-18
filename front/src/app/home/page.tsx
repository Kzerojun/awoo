import TopBar from "@/common/ui/TopBar";
import { BellIcon } from "@heroicons/react/24/outline"; // Heroicons 아이콘 추가

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* 상단바 */}
      <TopBar title="페이지 제목" rightAction={<BellIcon className="h-6 w-6 text-gray-500" />} />

      {/* 메인 컨텐츠 - 중앙 정렬 */}
      <main className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-3rem)]">
        <div className="flex items-center space-x-2">
          <h1 className="text-4xl font-bold text-center">AwOO</h1>
        </div>
        <p className="text-gray-500 mt-2">새로운 발자국 금융 라이프</p>
      </main>
    </div>
  );
}
