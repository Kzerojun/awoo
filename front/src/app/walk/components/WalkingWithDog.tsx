"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import withDog from "@/assets/lottie/withDog.json";

const WalkingWithDog = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <Lottie animationData={withDog} loop autoPlay style={{ width: 300, height: 300 }} />;
};
export default WalkingWithDog;
