import useUserTweets from "../hooks/useUserTweets";
import TweetItem from "./TweetItem";

const ProfilePosts = () => {
  const { tweets } = useUserTweets();
  return (
    <div>
      {tweets.map((tweet) => (
        <TweetItem key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default ProfilePosts;
