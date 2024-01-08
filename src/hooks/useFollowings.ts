import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getTotalFollowings } from "../utils/tweet";

const useFollowings = () => {
  const [numOfFollowings, setNumOfFollowings] = useState(0);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const { count } = await getTotalFollowings(currentUser?.id);
        setNumOfFollowings(count || 0);
      }
    })();
  }, [currentUser]);

  return { numOfFollowings, setNumOfFollowings };
};

export default useFollowings;
