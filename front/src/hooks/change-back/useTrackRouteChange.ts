"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { pushPath, markGoingBack, clearHistory } from "@/lib/slices/userActionSlice";

const RESET_STACK_PATHS = ["/home", "/login", "/walk/end/check", "/my"];

const EXCLUDED_PATHS = [
  "/signup/policy",
  "/account/my/deposit/manage",
  "/account/my/saving/manage",
  "/account/my/deposit/transfer",
  "/account/my/check-password",
  "/walk/start/walking",
  "/walk/end/check",
];

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
    const prevPath = prevPathRef.current;
    const shouldReset = RESET_STACK_PATHS.includes(pathname);

    if (shouldReset) {
      dispatch(clearHistory());
    }

    const shouldPush =
      !isGoingBackRef.current &&
      prevPath &&
      prevPath !== pathname &&
      !EXCLUDED_PATHS.includes(prevPath);

    if (shouldPush) {
      dispatch(pushPath(prevPath));
    }

    dispatch(markGoingBack(false));
    prevPathRef.current = pathname;
  }, [pathname, dispatch]);
};
