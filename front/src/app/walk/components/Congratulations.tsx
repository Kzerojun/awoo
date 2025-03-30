"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import Congratulations from "@/assets/lottie/congratulations.json";

const CongratulationsEffect = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Lottie animationData={Congratulations} loop autoPlay style={{ width: 900, height: 900 }} />
  );
};
export default CongratulationsEffect;
