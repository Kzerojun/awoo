"use client";

import landingLogo from "../../public/logos/AwOO_landing.svg";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0FC9BA] flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-[250px]">
        <div className="self-start text-white text-xl">새로운</div>
        <div className="self-start text-white text-xl mb-3">
          <span className="font-bold text-2xl">발자국</span> 금융 라이프
        </div>
        <Image src={landingLogo} alt=".." width={250} height={250} className="mb-10" />
      </div>
    </div>
  );
}
