"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/lib/store";
import { pushPath } from "@/lib/slices/userActionSlice";

export const useTrackRouteChange = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (prevPathRef.current && prevPathRef.current !== pathname) {
      dispatch(pushPath(prevPathRef.current));
    }
    prevPathRef.current = pathname;
  }, [pathname]);
};
