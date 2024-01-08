import { useEffect, useState } from "react";
import { Tweet } from "../types";
import { supabase } from "../lib/supabase";

const useTweets = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_all_tweets");
      if (data && !error) {
        setTweets(data);
      }
    })();
  }, []);

  useEffect(() => {
    const subscription = supabase
      .channel("tweets_db_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "tweets",
          filter: "type=neq.reply",
        },
        async (payload) => {
          const { data } = await supabase.rpc("get_tweet", {
            tweetid: payload.new.id,
          });

          if (data) {
            setTweets([data[0], ...tweets]);
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [tweets]);

  return { tweets };
};

export default useTweets;
