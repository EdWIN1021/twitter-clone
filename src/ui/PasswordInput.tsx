import clsx from "clsx";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

const PasswordInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  value,
  className,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const [show, toggle] = useState(false);

  useEffect(() => {
    value && setIsActive(true);
  }, [value]);

  return (
    <div className={twMerge("relative h-input w-full", className)}>
      <input
        {...rest}
        id={"password"}
        value={value}
        type={show ? "text" : "password"}
        className="w-full rounded-md border px-4 pb-1 pt-7 leading-normal outline-primary"
        onFocus={() => setIsActive(true)}
        onBlur={() => !value && setIsActive(false)}
      />
      <label
        className={clsx(
          `absolute cursor-text text-label duration-200`,
          {
            "center-y left-[5%]": !isActive,
          },
          {
            "left-[3%] top-[20%] text-xs text-primary": isActive,
          },
        )}
        htmlFor={"password"}
      >
        {"Password"}
      </label>

      <div
        className=" center-y absolute right-4 w-5 cursor-pointer"
        onClick={() => toggle((show) => !show)}
      >
        {show ? <EyeSlashIcon /> : <EyeIcon />}
      </div>
    </div>
  );
};

export default PasswordInput;
