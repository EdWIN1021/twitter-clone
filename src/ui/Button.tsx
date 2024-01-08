import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ title, className, icon, ...rest }) => {
  return (
    <button
      {...rest}
      className={twMerge("w-full rounded-full text-white", className)}
    >
      {icon}
      {title}
    </button>
  );
};

export default Button;
