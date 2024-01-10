import { useEffect, useState } from "react";
import { getTotalFollowers } from "../utils/tweet";

const useFollowers = (userId: string | undefined) => {
  const [numOfFollowers, setNumOfFollowers] = useState(0);

  useEffect(() => {
    (async () => {
      if (userId) {
        const { count } = await getTotalFollowers(userId);
        setNumOfFollowers(count || 0);
      }
    })();
  }, []);

  return { numOfFollowers };
};

export default useFollowers;
