"use client";

import useLocationTracking from "../hooks/useLocationTracking";
import { useEffect, useState } from "react";
import WalkingLoading from "./WalkingLoading";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 동적 import (서버 실행 x)
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

// 시작 지점 아이콘
const startIcon = new L.Icon({
  iconUrl: "/icons/walking/house.svg",
  iconSize: [32, 32],
  iconAnchor: [12, 12],
});

// 현재 위치 아이콘
const currentLocationIcon = new L.Icon({
  iconUrl: "/icons/walking/dog.svg",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// 도착 지점 아이콘
const finishIcon = new L.Icon({
  iconUrl: "/icons/walking/flag.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapTraking = () => {
  const { positions, distance, currentPosition, startPosition } = useLocationTracking();
  const [isClient, setIsCliet] = useState<boolean>(false);

  useEffect(() => {
    setIsCliet(true);
  }, []);

  if (!startPosition || !currentPosition || !isClient) {
    return <WalkingLoading />;
  }

  return (
    <>
      <div>맵 트래킹이</div>
      <div className="h-80 w-full">
        <MapContainer center={startPosition} zoom={15} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* 현재 위치 마커 */}
          <Marker position={currentPosition} icon={currentLocationIcon}>
            <Popup>현재 위치!</Popup>
          </Marker>
          {/* 출발 지점 마커 */}
          <Marker position={startPosition} icon={startIcon}>
            <Popup>출발 지점</Popup>
          </Marker>

          {/* 도착 지점 마커 */}
          {positions.length > 5 && (
            <Marker position={positions[positions.length - 1]} icon={finishIcon}>
              <Popup>도착 지점</Popup>
            </Marker>
          )}

          {/* 이동 경로 (점선) */}
          {positions.length > 1 && (
            <Polyline positions={positions} color="green" dashArray="5, 10" />
          )}
        </MapContainer>
        <div className="rounded-lg shadow-md">이동 거리: {distance.toFixed(2)} km</div>
      </div>
    </>
  );
};

export default MapTraking;
