import clsx from "clsx";
import { TextareaHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  value: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  id,
  value,
  className,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={twMerge("relative h-[60px] w-full", className)}>
      {id === "username" && isActive && (
        <span className={"absolute bottom-2 ml-4 text-primary"}>@</span>
      )}

      <textarea
        id={id}
        {...rest}
        value={value}
        maxLength={160}
        className={clsx(
          `w-full rounded-md border px-4 pb-1 pt-7 leading-normal outline-[#1D9BF0] resize-none`,
          { "pl-8": id === "username" }
        )}
        rows={3}
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

      <span
        className={clsx("absolute top-2 right-2 opacity-0 text-label", {
          "opacity-100": isActive,
        })}
      >
        {value?.length} / 160
      </span>
    </div>
  );
};

export default TextArea;
