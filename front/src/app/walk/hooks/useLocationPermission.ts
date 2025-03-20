const useLocationPermission = () => {
  const requestPermission = () => {
    if (!("geolocation" in navigator)) {
      console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => console.log("위치 권한 허용됨"),
      (error) => console.error("위치 권한 거부됨:", error),
      { enableHighAccuracy: true }
    );
  };

  return { requestPermission };
};

export default useLocationPermission;
