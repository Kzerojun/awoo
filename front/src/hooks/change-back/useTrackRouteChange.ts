"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { pushPath, markGoingBack } from "@/lib/slices/userActionSlice";

export const useTrackRouteChange = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const prevPathRef = useRef<string | null>(null);
  const isGoingBack = useAppSelector((state) => state.userAction.isGoingBack);
  const isGoingBackRef = useRef(false);
  const historyStack = useAppSelector((state) => state.userAction.historyStack);
  // console.log("historyStack", historyStack);

  useEffect(() => {
    isGoingBackRef.current = isGoingBack;
  }, [isGoingBack]);

  useEffect(() => {
    if (!isGoingBackRef.current && prevPathRef.current && prevPathRef.current !== pathname) {
      dispatch(pushPath(prevPathRef.current));
    }

    dispatch(markGoingBack(false));
    prevPathRef.current = pathname;
  }, [pathname, dispatch]);
};
