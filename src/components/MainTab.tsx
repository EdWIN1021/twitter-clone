import { Dispatch, SetStateAction } from "react";

const MainTab: React.FC<{
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
}> = ({ setTab, tab }) => {
  return (
    <div className="flex items-center justify-center border-b">
      <button className=" w-full hover:bg-hover-gray" onClick={() => setTab(0)}>
        <div
          className={`inline-block h-full p-3 font-semibold text-label ${
            tab === 0 && "border-b-2 border-primary-blue font-bold text-black"
          } `}
        >
          <div className="flex h-full flex-col items-center justify-center">
            <span>For you</span>
          </div>
        </div>
      </button>

      <button
        className="group w-full  hover:bg-hover-gray"
        onClick={() => setTab(1)}
      >
        <div
          className={`inline-block h-full p-3 font-semibold text-label ${
            tab === 1 && "border-b-2 border-primary-blue font-bold text-black"
          } `}
        >
          <div className="flex h-full flex-col items-center justify-center">
            <span>Following</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default MainTab;
