import { Dispatch, SetStateAction, createContext } from "react";
import useFollowings from "../hooks/useFollowings";

interface FollowingContextProps {
  numOfFollowings: number;
  setNumOfFollowings: Dispatch<SetStateAction<number>>;
}

export const FollowingContext = createContext<FollowingContextProps>({
  numOfFollowings: 0,
  setNumOfFollowings: () => {},
});

const FollowingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { numOfFollowings, setNumOfFollowings } = useFollowings();

  const contextValue: FollowingContextProps = {
    numOfFollowings,
    setNumOfFollowings,
  };

  return (
    <FollowingContext.Provider value={contextValue}>
      {children}
    </FollowingContext.Provider>
  );
};

export default FollowingProvider;
