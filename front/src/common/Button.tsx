"use client";
import "../app/globals.css";

interface ButtonProps {
  onClick?: () => void;
  text?: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  width?: "long" | "short" | "medium";
  fontColor?: string;
  backgroundColor?: string;
  img?: string;
  disabled?: boolean;
}

const Button = ({
  onClick,
  text,
  className = "",
  type = "button",
  width = "long",
  fontColor = "custom-white",
  backgroundColor = "green",
  img,
  disabled = false,
}: ButtonProps) => {
  interface widthTypes {
    long: string;
    short: string;
    medium: string;
  }

  const widthTypes: widthTypes = {
    long: "w-56",
    short: "w-24",
    medium: "W-40",
  };
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`${widthTypes[width]} h-10 cursor-pointer ${className} bg-${backgroundColor} text-${fontColor} rounded-lg text-center}`}
      >
        {text} {img && <img src={img} alt="paw button" className="h-10 w-10 inline" />}
      </button>
      <div className="bg-custom-gray">test</div>
    </>
  );
};

export default Button;
