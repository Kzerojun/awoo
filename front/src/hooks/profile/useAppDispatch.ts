import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store"; // AppDispatch 타입이 정의된 경로를 적절히 수정해주세요

// Redux 타입 안전성을 위한 커스텀 훅
export const useAppDispatch = () => useDispatch<AppDispatch>();
