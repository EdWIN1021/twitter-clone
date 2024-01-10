import { useEffect, useState } from "react";
import { getTotalFollowings } from "../utils/tweet";

const useFollowings = (userId: string | undefined) => {
  const [numOfFollowings, setNumOfFollowings] = useState(0);

  useEffect(() => {
    (async () => {
      if (userId) {
        const { count } = await getTotalFollowings(userId);
        setNumOfFollowings(count || 0);
      }
    })();
  }, []);

  // useEffect(() => {
  //   const subscription = supabase
  //     .channel("tweets_db_changes")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "INSERT",
  //         schema: "public",
  //         table: "tweets",
  //         filter: "type=eq.reply",
  //       },
  //       async (payload) => {
  //         const { data } = await supabase.rpc("get_tweet", {
  //           tweetid: payload.new.id,
  //         });
  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [replies]);

  return { numOfFollowings, setNumOfFollowings };
};

export default useFollowings;
