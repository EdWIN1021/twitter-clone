import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { FC, SelectHTMLAttributes, useState } from "react";
import clsx from "clsx";

interface DropDownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant: "sm" | "md" | "lg";
  type: string;
  data: string[] | number[];
}

const DropDown: FC<DropDownProps> = ({ variant, type, data, ...rest }) => {
  const sizes = {
    sm: "w-[90px]",
    md: "w-[115px]",
    lg: "w-[208px]",
  };

  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={clsx(
        `${sizes[variant]} relative h-[60px] overflow-hidden  rounded-md border `,
        {
          "border-2 border-[#1D9BF0]": isActive,
        },
      )}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <label
        htmlFor={type}
        className={clsx("absolute left-3 block pt-2 text-sm text-label", {
          "text-[#1D9BF0]": isActive,
        })}
      >
        {type}
      </label>

      <select
        {...rest}
        id={type}
        className="h-full w-full cursor-pointer appearance-none pb-2 pl-2 pr-2 pt-7 outline-none"
      >
        <option value=""></option>
        {data?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <ChevronDownIcon className="absolute right-2 top-1/2 h-[20px] w-[20px] -translate-y-1/2" />
    </div>
  );
};

export default DropDown;
