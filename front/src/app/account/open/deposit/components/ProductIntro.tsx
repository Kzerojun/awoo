"use client";
import React from "react";
import Image from "next/image";

interface DescriptionItem {
  text: string;
  textAlign?: "left" | "center" | "right"; // 텍스트 정렬
  textSize?: "text-sm" | "text-base" | "text-lg" | "text-m" | "text-xm" | "text-xs"; // 텍스트 크기
  textColor?: string; // 텍스트 색상
  fontWeight?: "font-normal" | "font-medium" | "font-bold"; // 글씨 굵기
  marginTop?: string; // 추가 여백 조정
}
interface ProductIntroProps {
  iconSrc: string;
  altText: string;
  description: DescriptionItem[]; // 배열 형태로 받기
}
const ProductIntro = ({ iconSrc, altText, description }: ProductIntroProps) => {
  return (
    <div className="p-6 text-center mt-12">
      {/* 소개 문구 */}
      {description.map((item, index) => (
        <p
          key={index}
          className={`${item.textSize || "text-base"} 
                      ${item.textColor || "text-gray-600"} 
                      ${item.fontWeight || "font-normal"} 
                      text-${item.textAlign || "center"} 
                      ${item.marginTop || "mt-2"}`}
        >
          {item.text}
        </p>
      ))}
      {/* 아이콘 (SVG) */}
      <div className="flex justify-center">
        <Image src={iconSrc} alt={altText} width={250} height={250} className="rounded-lg" />
      </div>
    </div>
  );
};

export default ProductIntro;
