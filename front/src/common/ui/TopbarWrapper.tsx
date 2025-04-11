"use client";
/**
 * ✅ TopBarWrapper 컴포넌트 가이드
 * (다른 방식의 커스텀이 필요할 경우 - 규격만 참고 -> 해당 도메인에서 별도로 Topbar 제작 권장)
 *
 * 📐 상단바 공통 규격 (모바일 기준)
 * - 높이: 56px (Tailwind: h-14)
 * - 좌우 패딩: 16px (Tailwind: px-4)
 * - 배경색: #ffffff (Tailwind: bg-white)
 * - 위치: 고정 위치 (Tailwind: fixed top-0 left-0 w-full)
 * - z-index: 50 이상 (Tailwind: z-50)
 *
 * 💡 사용 시 유의사항
 * - 상단바는 fixed이므로, main 콘텐츠에는 pt-14로 여백을 줘야 겹치지 않음
 * - title이나 rightAction이 없을 경우 상단바 렌더링 생략됨
 * - 내부 콘텐츠는 TopBar에서 처리됨 (뒤로가기, 타이틀, 우측 버튼 등)
 *
 */

import TopBar from "./TopBar";

interface TopBarWrapperProps {
  title?: string;
  rightAction?: React.ReactNode;
}

const TopBarWrapper: React.FC<TopBarWrapperProps> = ({ title, rightAction }) => {
  // title 또는 rightAction이 없으면 TopBar를 렌더링하지 않음
  if (!title && !rightAction) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white">
      {/* TopBar 컨테이너에 명확한 높이와 패딩 적용 */}
      <div className="h-14 px-4 flex items-center">
        <TopBar title={title} rightAction={rightAction} />
      </div>
    </div>
  );
};

export default TopBarWrapper;
