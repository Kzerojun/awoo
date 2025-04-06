"use client";

import useLocationTracking from "../hooks/useLocationTracking";
import React, { useEffect, useState, useRef } from "react";
import { Map, MapMarker, Polyline, CustomOverlayMap } from "react-kakao-maps-sdk";
import WalkingLoading from "./WalkingLoading";
import { useAppSelector } from "@/lib/store";

interface MapTrackingProps {
  positions: [number, number][];
  currentPosition: [number, number] | null;
  startPosition: [number, number] | null;
  isTracking: boolean;
  onMapReady?: () => void;
  distance: number;
}

const MapTraking = ({
  positions,
  currentPosition,
  startPosition,
  isTracking,
  onMapReady,
  distance,
}: MapTrackingProps) => {
  // const {
  //   positions = [],
  //   currentPosition,
  //   startPosition,
  //   isTracking,
  //   distance,
  // } = useLocationTracking();

  const walkingDog = useAppSelector((state) => state.walk.currentWalkingDog);
  const profileImage = walkingDog?.profileImage ?? "/icons/waling/walkDogBasic.svg";
  const petName = walkingDog?.name;
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const mapRef = useRef<kakao.maps.Map | null>(null); // 지도 사이즈 문제 해결

  const walkDoneIcons = [
    "/icons/walking/walkingDoneIcon1.svg",
    "/icons/walking/walkingDoneIcon2.svg",
    "/icons/walking/walkingDoneIcon3.svg",
    "/icons/walking/walkingDoneIcon4.svg",
  ];

  const [randomDoneIcon, setRandomDoneIcon] = useState<string>(
    "/icons/walking/walkingDoneIcon1.svg"
  );

  useEffect(() => {
    if (!isTracking && !randomDoneIcon) {
      const randomIndex = Math.floor(Math.random() * walkDoneIcons.length);
      setRandomDoneIcon(walkDoneIcons[randomIndex]);
    }
  }, [isTracking, randomDoneIcon]);

  useEffect(() => {
    const loadKakaoMapScript = () => {
      if (window.kakao && window.kakao.maps) {
        console.log("카카오맵 스크립트 이미 로드됨");
        setIsScriptLoaded(true);
        onMapReady?.();
        return;
      }

      const script = document.createElement("script");
      // 카카오맵 API KEY 지도
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
      script.async = true;

      script.onload = () => {
        console.log("카카오맵 스크립트 로딩 완료");

        // 카카오맵이 완전히 로드된 후 `window.kakao.maps.load()`를 호출해야 함!
        window.kakao.maps.load(() => {
          console.log("window.kakao.maps 로드 완료");
          setIsScriptLoaded(true);
          onMapReady?.();
        });
      };

      script.onerror = () => {
        console.error("❌ 카카오맵 스크립트 로드 실패!");
      };

      document.head.appendChild(script);
    };

    loadKakaoMapScript();
  }, []);

  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current) return; // 지도가 로드되지 않았을 때 렌더링 방지
    setTimeout(() => {
      console.log("지도 리사이즈 실행");
      mapRef.current?.relayout();
      if (onMapReady) onMapReady(); // 부모에게 지도 로드되었다고 알림
    }, 300);
  }, [isScriptLoaded]);

  if (!isScriptLoaded) {
    return <WalkingLoading />;
  }

  return (
    <div className="w-full h-full">
      {/* 카카오맵  */}
      <Map
        center={
          currentPosition
            ? { lat: currentPosition[0], lng: currentPosition[1] }
            : { lat: 37.5665, lng: 126.978 }
        }
        style={{ width: "100%", height: "100%" }}
        level={2}
        ref={(map) => {
          if (map) {
            mapRef.current = map;
          }
        }} // `ref` 바인딩 방식 수정
      >
        {/* 출발 위치 */}
        {isScriptLoaded && startPosition && (
          <MapMarker
            position={{ lat: startPosition[0], lng: startPosition[1] }}
            image={{
              src: "/icons/walking/homeIcon.svg",
              size: { width: 60, height: 60 },
            }}
          />
        )}
        {/* 사용자가 이동한 경로에 발자국 마커 표시 */}
        {/* {isScriptLoaded &&
          positions.map((pos, index) => (
            <MapMarker
              key={index}
              position={{ lat: pos[0], lng: pos[1] }}
              image={{
                src: "/icons/walking/single_paw.svg",
                size: { width: 30, height: 30 },
              }}
            />
          ))} */}
        {/* 사용자의 현재 위치를 나타내는 마커 (원래) */}
        {/* {isScriptLoaded && currentPosition && (
          <MapMarker
            position={{ lat: currentPosition[0], lng: currentPosition[1] }}
            image={{
              src: profileImage,
              size: { width: 50, height: 50 },
            }}
          />
        )} */}
        {isTracking && isScriptLoaded && currentPosition && (
          <CustomOverlayMap
            position={{ lat: currentPosition[0], lng: currentPosition[1] }}
            yAnchor={1} // 위치 조정
          >
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <img src={profileImage} alt="강아지" className="w-full h-full object-cover" />
            </div>
          </CustomOverlayMap>
        )}

        {/* 사용자가 이동한 경로를 선으로 연결 */}
        {isScriptLoaded && positions && positions?.length > 0 && (
          <Polyline
            path={positions.map((pos) => ({ lat: pos[0], lng: pos[1] }))}
            strokeWeight={7}
            strokeColor={"#9eebd1"}
            strokeOpacity={0.7}
            strokeStyle={"solid"}
          />
        )}
        {isScriptLoaded &&
          positions &&
          positions.map(
            (pos, index) =>
              index % 10 === 0 && (
                <MapMarker
                  key={index}
                  position={{ lat: pos[0], lng: pos[1] }}
                  image={{
                    src: "/icons/walking/single_paw.svg", // 🐾 발자국 아이콘으로 경로 표현
                    size: { width: 30, height: 30 },
                  }}
                />
              )
          )}
        {/* 트래킹 종료시 마지막 위치에 깃발 마커 표시 */}
        {!isTracking && currentPosition && (
          <MapMarker
            position={{ lat: currentPosition[0], lng: currentPosition[1] }}
            image={{
              src: randomDoneIcon,
              size: { width: 80, height: 80 },
            }}
          />
        )}
        <div className="rounded-lg shadow-md">이동 거리: {distance.toFixed(2)} km</div>
      </Map>
    </div>
  );
};

export default MapTraking;
