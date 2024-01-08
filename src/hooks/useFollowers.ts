import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getTotalFollowers } from "../utils/tweet";

const useFollowers = () => {
  const [numOfFollowers, setNumOfFollowers] = useState(0);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const { count } = await getTotalFollowers(currentUser?.id);
        setNumOfFollowers(count || 0);
      }
    })();
  }, [currentUser]);

  return { numOfFollowers };
};

export default useFollowers;
