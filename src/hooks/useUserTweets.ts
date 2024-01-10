import { useEffect, useState } from "react";
import { Tweet } from "../types";
import { supabase } from "../lib/supabase";

const useUserTweets = (user_id: string) => {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_user_tweets", {
        current_user_id: user_id,
      });

      if (data && !error) {
        setTweets(data);
      }
    })();
  }, []);

  return { tweets };
};

export default useUserTweets;
