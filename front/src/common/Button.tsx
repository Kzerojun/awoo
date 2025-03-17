"use client";
import "../app/globals.css";
interface ButtonProps {
  onClick?: () => void;
  text?: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  width?: string;
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
  width = "10",
  fontColor = "text-primary-orange",
  backgroundColor = "aqua",
  img,
  disabled = false,
}: ButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`w-${width} h-10 cursor-pointer ${className} ${backgroundColor} ${fontColor} rounded-lg text-center}`}
      >
        {text} {img && <img src={img} alt="paw button" className="h-10 w-10 inline" />}
      </button>
      <div className="text-5xl">test</div>
    </>
  );
};

export default Button;
