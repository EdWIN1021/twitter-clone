import { useContext, useEffect, useState } from "react";
import { Tweet } from "../types";
import { AuthContext } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

const useUserTweets = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const { data, error } = await supabase.rpc("get_user_tweets", {
          current_user_id: currentUser?.id,
        });

        if (data && !error) {
          setTweets(data);
        }
      }
    })();
  }, [currentUser]);

  return { tweets };
};

export default useUserTweets;
