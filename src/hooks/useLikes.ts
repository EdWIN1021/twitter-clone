import { useEffect, useState } from "react";
import { Tweet } from "../types";
import { supabase } from "../lib/supabase";

const useLikes = (userId: string) => {
  const [likedTweets, setLikedTweets] = useState<Tweet[] | []>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.rpc("get_user_likes", {
        current_user_id: userId,
      });

      setLikedTweets(data);
    })();
  }, []);

  return { likedTweets };
};

export default useLikes;
