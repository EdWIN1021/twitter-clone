import { Dispatch, SetStateAction } from "react";

const Overlay: React.FC<{
  toggle?: Dispatch<SetStateAction<boolean>>;
}> = ({ toggle }) => {
  return (
    <div
      className="absolute top-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.4)]"
      onClick={() => toggle?.(false)}
    ></div>
  );
};

export default Overlay;
