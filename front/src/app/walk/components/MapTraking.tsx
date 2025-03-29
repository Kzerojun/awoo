"use client";

import useLocationTracking from "../hooks/useLocationTracking";
import React, { useEffect, useState, useRef } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import WalkingLoading from "./WalkingLoading";

const MapTraking = () => {
  const {
    positions = [],
    currentPosition,
    startPosition,
    isTracking,
    distance,
  } = useLocationTracking();
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const mapRef = useRef<kakao.maps.Map | null>(null); // 지도 사이즈 문제 해결

  useEffect(() => {
    const loadKakaoMapScript = () => {
      if (window.kakao && window.kakao.maps) {
        console.log("카카오맵 스크립트 이미 로드됨");
        setIsScriptLoaded(true);
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
        level={4}
        ref={(map) => {
          if (map) {
            mapRef.current = map;
          }
        }} // ✅ `ref` 바인딩 방식 수정
      >
        {/* 출발 위치 */}
        {isScriptLoaded && startPosition && (
          <MapMarker position={{ lat: startPosition[0], lng: startPosition[1] }}>
            <div className="text-xs bg-white p-1 rounded">출발</div>
          </MapMarker>
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

        {/* 사용자의 현재 위치를 나타내는 마커 */}
        {isScriptLoaded && currentPosition && (
          <MapMarker
            position={{ lat: currentPosition[0], lng: currentPosition[1] }}
            image={{
              src: "/icons/walking/dog.svg",
              size: { width: 50, height: 50 },
            }}
          />
        )}

        {/* 사용자가 이동한 경로를 선으로 연결 */}
        {isScriptLoaded && positions && positions?.length > 0 && (
          <Polyline
            path={positions.map((pos) => ({ lat: pos[0], lng: pos[1] }))}
            strokeWeight={5}
            strokeColor={"#9eebd1"}
            strokeOpacity={0.7}
            strokeStyle={"solid"}
          />
        )}

        {isScriptLoaded &&
          positions &&
          positions.map(
            (pos, index) =>
              index % 30 === 0 && (
                <MapMarker
                  key={index}
                  position={{ lat: pos[0], lng: pos[1] }}
                  image={{
                    src: "/icons/walking/single_paw.svg", // 🐾 발자국 아이콘으로 경로 표현
                    size: { width: 20, height: 20 },
                  }}
                />
              )
          )}

        {/* 트래킹 종료시 마지막 위치에 깃발 마커 표시 */}
        {!isTracking && currentPosition && (
          <MapMarker
            position={{ lat: currentPosition[0], lng: currentPosition[1] }}
            image={{
              src: "/icons/walking/flag.svg",
              size: { width: 30, height: 30 },
            }}
          />
        )}

        <div className="rounded-lg shadow-md">이동 거리: {distance.toFixed(2)} km</div>
      </Map>
    </div>
  );
};

export default MapTraking;
