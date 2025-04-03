import { useEffect } from "react";
import { useFCMToken } from "./useFCM";

export const usePermissionObserver = () => {
  const { getAndSendToken } = useFCMToken();

  useEffect(() => {
    navigator.permissions?.query({ name: "notifications" as PermissionName }).then((status) => {
      status.onchange = () => {
        console.log("🔄 권한 변경 감지됨");
        getAndSendToken();
      };
    });
  }, []);
};
