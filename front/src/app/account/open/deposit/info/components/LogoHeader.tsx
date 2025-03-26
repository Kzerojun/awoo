"use client";

import Image from "next/image";

export default function AwOOHeader() {
  return (
    <div className="bg-teal-400 rounded-[10px] py-6 px-3 flex flex-col items-center justify-center mb-6 mx-auto max-w-[320px]">
      <Image
        src="/logos/AwOO_white_logo.svg"
        alt="Awoo Logo"
        width={200}
        height={100}
        className="object-contain"
      />
      <p className="text-white text-base mt-2">아우 입출금통장</p>
    </div>
  );
}
