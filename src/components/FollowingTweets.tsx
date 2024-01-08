import { useContext, useEffect, useState } from "react";
import { Tweet } from "../types";
import { AuthContext } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import TweetItem from "./TweetItem";

const FollowingTweets = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const { data, error } = await supabase.rpc("get_following_tweets", {
          current_user_id: currentUser?.id,
        });

        if (data && !error) setTweets(data);
      }
    })();
  }, [currentUser]);

  return (
    <>
      {tweets &&
        tweets.map((tweet) => <TweetItem key={tweet.id} tweet={tweet} />)}
    </>
  );
};

export default FollowingTweets;
