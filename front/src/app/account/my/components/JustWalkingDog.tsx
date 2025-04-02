"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import loadingDog from "@/assets/lottie/loadingDog.json";

const LoadingDog = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <Lottie animationData={loadingDog} loop autoPlay style={{ width: 300, height: 300 }} />
    </div>
  );
};
export default LoadingDog;
