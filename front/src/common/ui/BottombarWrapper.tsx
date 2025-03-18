"use client";

import Bottombar from "./BottomBar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const BottombarWrapper = () => {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    setCurrentPath(pathname); // ✅ 경로 변경 시 `currentPath` 업데이트
  }, [pathname]);

  return <Bottombar currentPath={currentPath} />;
};

export default BottombarWrapper;
