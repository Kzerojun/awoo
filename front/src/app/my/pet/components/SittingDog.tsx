"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import dog from "@/assets/lottie/sittingDog.json";

const SittingDog = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <Lottie animationData={dog} loop className="w-[300px] h-[300px]" />;
};

export default SittingDog;
