import React, { useState } from "react";

const useLocationPermission = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestPermission = () => {
    if (!("geolocation" in navigator)) {
      console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
      setHasPermission(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        console.log("위치 권한 허용됨");
        setHasPermission(true);
      },
      (error) => {
        console.error("위치 권한 거부됨:", error);
        setHasPermission(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return { hasPermission, requestPermission };
};

export default useLocationPermission;
