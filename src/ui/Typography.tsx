import { twMerge } from "tailwind-merge";

interface TypographyProps {
  title: string;
  variant: string;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  title,
  variant,
  className,
}) => {
  switch (variant) {
    case "h2":
      return (
        <h2 className={twMerge("text-3xl font-bold", className)}>{title}</h2>
      );
    case "p":
      return (
        <p className={twMerge("text-sm text-label", className)}>{title}</p>
      );
  }
};

export default Typography;
