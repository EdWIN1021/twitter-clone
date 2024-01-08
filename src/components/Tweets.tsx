import useTweets from "../hooks/useTweets";
import TweetItem from "./TweetItem";

const Tweets: React.FC = () => {
  const { tweets } = useTweets();

  return (
    <>
      {tweets &&
        tweets.map((tweet) => <TweetItem key={tweet.id} tweet={tweet} />)}
    </>
  );
};

export default Tweets;
