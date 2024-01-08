import { useEffect, useState } from "react";
import { Tweet } from "../types";
import TweetItem from "./TweetItem";
import { supabase } from "../lib/supabase";

const ReplyItem: React.FC<{ userReply: Tweet }> = ({ userReply }) => {
  const [tweet, setTweet] = useState<Tweet>();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.rpc("get_tweet", {
        tweetid: "0b3a67e7-6bf7-4374-a066-a01ed6e7a5b2",
      });

      if (data) {
        setTweet(data[0]);
      }
    })();
  }, [userReply]);

  return (
    <>
      {tweet && (
        <>
          <TweetItem tweet={tweet} showBar />
          <TweetItem tweet={userReply} />
        </>
      )}
    </>
  );
};

export default ReplyItem;
