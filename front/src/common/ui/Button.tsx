"use client";
import "../../app/globals.css";
import Image from "next/image";

interface ButtonProps {
  onClick?: () => void;
  text?: string;
  textSize?: "big" | "small" | "medium" | "verySmall";
  fontBold?: "bold" | "base";
  className?: string;
  type?: "button" | "submit";
  width?: "long" | "short" | "medium";
  fontColor?: string;
  backgroundColor?: string;
  img?: string;
  disabled?: boolean;
  border?: "aqua" | "green" | "none";
}

const Button = ({
  onClick,
  text,
  fontBold = "base",
  textSize = "medium",
  className = "",
  type = "button",
  width = "long",
  fontColor = "custom-white",
  backgroundColor = "aqua",
  img,
  disabled = false,
  border = "none",
}: ButtonProps) => {
  interface widthTypes {
    long: string;
    short: string;
    medium: string;
  }

  interface textSizeTypes {
    big: string;
    small: string;
    medium: string;
    verySmall: string;
  }

  interface fontBoldTypes {
    bold: string;
    base: string;
  }

  interface borderTypes {
    aqua: string;
    green: string;
    none: string;
  }

  const widthTypes: widthTypes = {
    long: "w-72",
    short: "w-24",
    medium: "w-56",
  };

  const textSizeTypes: textSizeTypes = {
    big: "text-lg",
    small: "text-sm",
    medium: "text-base",
    verySmall: "text-xs",
  };

  const fontBoldTypes: fontBoldTypes = {
    bold: "font-bold",
    base: "",
  };

  const borderTypes: borderTypes = {
    aqua: "border-1-aqua",
    green: "border-1-green",
    none: "",
  };
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`${widthTypes[width]} ${textSizeTypes[textSize]} ${fontBoldTypes[fontBold]} ${borderTypes[border]} h-10 cursor-pointer ${className} bg-${backgroundColor} text-${fontColor} rounded-lg flex justify-center items-center`}
      >
        <span>{text}</span>
        <span>{img && <Image src={img} alt="paw button" className="h-8 w-8 px-1 inline" />}</span>
      </button>
    </>
  );
};

export default Button;
