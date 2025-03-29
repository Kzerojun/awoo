import { error, time } from "console";
import { useEffect, useState, useRef } from "react";

const useLocationTracking = () => {
  // 트래킹
  const [positions, setPositions] = useState<[number, number][]>([]);
  const [distance, setDistance] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);
  const [startPosition, setStartPosition] = useState<[number, number] | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(true);
  const watchIdRef = useRef<number | null>(null);

  // 타이머
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      console.error("Geolocation이 지원되지 않습니다.");
      return;
    }

    // 트래킹이 중지된 상태면 다 멈추기
    // if (!isTracking) return;

    let prevPos: [number, number] | null = null;

    // 처음 위치 받아오기 (출발지점)
    if (isTracking) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const initialPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setCurrentPosition(initialPos); // 초기 위치 설정
          setStartPosition(initialPos); // 출발 지점 설정
          setPositions([initialPos]); // 지도에 표시할 위치 추가
        },
        (error) => console.error("초기 위치 불러오기 오류:", JSON.stringify(error)),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    }

    // 산책 시간 기록
    if (isTracking) {
      setStartTime(new Date());
      // 2초 후부터 경과 시간 증가 시작
      setTimeout(() => {
        timeRef.current = setInterval(() => {
          setElapsedTime((prev) => prev + 1);
        }, 1000);
      }, 2000);

      // 실시간 위치 추적 (watchPosition)
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const newPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];

          if (!prevPos) {
            setPositions([newPos]);
            prevPos = newPos;
            setCurrentPosition(newPos);
            return;
          }

          // 🌟 GPS 오차 방지 (5m 미만 이동 무시)
          const distanceMoved = getDistanceFromLatLonInKm(
            prevPos[0],
            prevPos[1],
            newPos[0],
            newPos[1]
          );
          if (distanceMoved < 0.005) return; // 5m 이하 이동 무시

          setDistance((prev) => prev + distanceMoved);
          setPositions((prev) => [...prev, newPos]);
          setCurrentPosition(newPos);
          prevPos = newPos;
        },
        (error) => console.error("위치 추적 오류:", JSON.stringify(error)),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isTracking]); // 트래킹 상태가 변경될 때마다 useEffect 실행

  // 트래킹 종료 함수
  const stopTracking = () => {
    setEndTime(new Date()); // 종료 시간 기록
    setIsTracking(false);

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (timeRef.current !== null) {
      clearInterval(timeRef.current);
      timeRef.current = null;
    }
  };

  return {
    positions,
    distance,
    currentPosition,
    startPosition,
    isTracking,
    stopTracking,
    elapsedTime,
    startTime,
    endTime,
  };
};

// Haversine 공식 (위도/경도를 기반으로 두 지점 간의 거리 계산)
const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // 지구 반지름 (km)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default useLocationTracking;
