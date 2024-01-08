import clsx from "clsx";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: "primary" | "secondary" | "tertiary";
  outline?: boolean;
  value: string;
  id: string;
  showLength?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  value,
  showLength = true,
  className,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    value && setIsActive(true);
  }, [value]);

  return (
    <div className={twMerge("relative h-[60px] w-full", className)}>
      {id === "username" && isActive && (
        <span className={"absolute bottom-2 ml-4 text-primary"}>@</span>
      )}

      <input
        id={id}
        {...rest}
        value={value}
        maxLength={50}
        className={clsx(
          `w-full rounded-md border px-4 pb-1 pt-7 leading-normal outline-[#1D9BF0]`,
          { "pl-8": id === "username" }
        )}
        onFocus={() => setIsActive(true)}
        onBlur={() => !value && setIsActive(false)}
      />
      <label
        className={clsx(
          `absolute cursor-text duration-200 text-label`,
          {
            "left-[5%] top-1/2 -translate-y-1/2 ": !isActive,
          },
          {
            "left-[3%] top-[20%] text-xs text-primary": isActive,
          }
        )}
        htmlFor={id}
      >
        {label}
      </label>

      {showLength && (
        <span
          className={clsx("absolute top-2 right-2 opacity-0 text-label", {
            "opacity-100": isActive,
          })}
        >
          {value.length} / 50
        </span>
      )}
    </div>
  );
};

export default TextInput;
