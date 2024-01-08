import { HTMLAttributes } from "react";

const Logo: React.FC<HTMLAttributes<HTMLElement>> = ({ className }) => {
  return <img className={className} src="/logo.svg" alt="x-logo" />;
};

export default Logo;
