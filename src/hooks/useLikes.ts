import { useContext, useEffect, useState } from "react";
import { Tweet } from "../types";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../contexts/AuthContext";

const useLikes = () => {
  const [likedTweets, setLikedTweets] = useState<Tweet[] | []>([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.rpc("get_user_likes", {
        current_user_id: currentUser?.id,
      });

      setLikedTweets(data);
    })();
  }, [currentUser]);

  return { likedTweets };
};

export default useLikes;
