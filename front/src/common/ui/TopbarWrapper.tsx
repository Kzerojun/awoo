"use client";

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
