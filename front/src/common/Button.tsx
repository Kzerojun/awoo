"use client";

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
  className,
  type = "button",
  width = "50px",
  fontColor = "white",
  backgroundColor = "#0FC9BA",
  img,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`cursor-pointer ${className} rounded-lg text-center}`}
      style={{
        backgroundColor,
        color: fontColor,
        width: width,
        height: "45px",
      }}
    >
      {text} {img && <img src={img} alt="paw button" className="h-10 w-10 inline" />}
    </button>
  );
};

export default Button;
